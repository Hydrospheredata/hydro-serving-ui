properties([
  parameters([
    choice(choices: ['patch','minor','major'], name: 'patchVersion', description: 'What needs to be bump?'),
    string(defaultValue:'', description: 'Force set newVersion or leave empty', name: 'newVersion', trim: false),
    choice(choices: ['local', 'global'], name: 'release', description: 'It\'s local release or global?'),
   ])
])

SERVICENAME = 'hydro-serving-ui'
REGISTRYURL = 'harbor.hydrosphere.io/hydro-serving'
SERVICEIMAGENAME = 'hydro-serving-ui'
GITHUBREPO  = "github.com/Hydrospheredata/hydro-serving-ui.git"

def checkoutRepo(String repo){
  git changelog: false, credentialsId: 'HydroRobot_AccessToken', poll: false, url: repo
}

def getVersion(){
    try{
        //remove only quotes
        version = sh(script: "git rev-parse HEAD", returnStdout: true ,label: "get version").trim()
        return version
    }catch(err){
        return "$err" 
    }
}

def bumpVersion(String currentVersion,String newVersion, String patch, String path){
    sh script: """cat <<EOF> ${WORKSPACE}/bumpversion.cfg
[bumpversion]
current_version = 0.0.0
commit = False
tag = False
parse = (?P<major>\\d+)\\.(?P<minor>\\d+)\\.(?P<patch>\\d+)
serialize =
    {major}.{minor}.{patch}

EOF""", label: "Set bumpversion configfile"
    if (newVersion != null && newVersion != ''){ //TODO: needs verify valid semver
        sh("echo $newVersion > version") 
    }else{
        sh("bumpversion $patch $path --config-file '${WORKSPACE}/bumpversion.cfg' --allow-dirty --verbose --current-version '$currentVersion'")   
    }
}

def buildDocker(){
    //run build command and store build tag 
    newVersion = getVersion() 
    sh script: "docker build -t hydrosphere/$SERVICEIMAGENAME:$newVersion .", label: "Run build docker task";
}

def pushDocker(String registryUrl, String dockerImage){
    //push docker image to registryUrl
    withCredentials([usernamePassword(credentialsId: 'hydro_harbor_docker_registry', passwordVariable: 'password', usernameVariable: 'username')]) {
      sh script: "docker login --username $username --password $password $registryUrl"
      sh script: "docker tag hydrosphere/$dockerImage $registryUrl/$dockerImage",label: "set tag to docker image"
      sh script: "docker push $registryUrl/$dockerImage",label: "push docker image to registry"
    }
}

def updateDockerCompose(String newVersion){
  dir('docker-compose'){
    //Change template TODO: Change composename and imagename to $SERVICENAME
    sh script: "sed \"s/.*image:.*/    image: harbor.hydrosphere.io\\/hydro-serving\\/hydro-serving-ui:$newVersion/g\" hydro-serving-ui.service.template > hydro-serving-ui.compose", label: "sed hydro-serving-ui version"
    //Merge compose into 1 file
    composeMerge = "docker-compose"
    composeService = sh label: "Get all template", returnStdout: true, script: "ls *.compose"
    list = composeService.split( "\\r?\\n" )
    for(l in list){
        composeMerge = composeMerge + " -f $l"
    }
    composeMerge = composeMerge + " config > docker-compose.yaml"
    sh script: "$composeMerge", label:"Merge compose file"
    sh script: "cp docker-compose.yaml ../docker-compose.yaml"
  }
}

def updateHelmChart(String newVersion){
  dir('helm'){
    //Change template
    sh script: "sed -i \"s/.*full:.*/  full: harbor.hydrosphere.io\\/hydro-serving\\/hydro-serving-ui:$newVersion/g\" ui/values.yaml", label: "sed hydro-serving-ui version"
    sh script: "sed -i \"s/.*harbor.hydrosphere.io\\/hydro-test\\/serving-ui:.*/  full: harbor.hydrosphere.io\\/hydro-test\\/serving-ui:$newVersion/g\" dev.yaml", label: "sed hydro-serving-ui dev stage version"

    //Refresh readme for chart
    sh script: "frigate gen ui --no-credits > ui/README.md"

    //Lint
    dir('ui'){
        sh script: "helm dep up", label: "Dependency update"
        sh script: "helm lint .", label: "Lint auto-od chart"
        sh script: "helm template -n serving --namespace hydrosphere . > test.yaml", label: "save template to file"
        sh script: "polaris audit --audit-path test.yaml -f yaml", label: "lint template by polaris"
        sh script: "polaris audit --audit-path test.yaml -f score", label: "get polaris score"
        sh script: "rm -rf test.yaml", label: "remove test.yaml"
    }

    dir('serving'){
        sh script: "helm dep up", label: "Dependency update"
        sh script: "helm lint .", label: "Lint all charts"
        sh script: "helm template -n serving --namespace hydrosphere . > test.yaml", label: "save template to file"
        sh script: "polaris audit --audit-path test.yaml -f yaml", label: "lint template by polaris"
        sh script: "polaris audit --audit-path test.yaml -f score", label: "get polaris score"
        sh script: "rm -rf test.yaml", label: "remove test.yaml"
    }
  }
}

node('hydrocentral') {
    stage('SCM'){
      checkoutRepo("https://github.com/Hydrospheredata/$SERVICENAME" + '.git')
    }
       
    stage('Test'){
      if (env.CHANGE_ID != null){
        buildDocker()
      }
    }

    stage('Release'){
      if (BRANCH_NAME == 'master' || BRANCH_NAME == 'main'){
          newVersion = getVersion()
          buildDocker()
          pushDocker(REGISTRYURL, SERVICEIMAGENAME+":$newVersion")
          //Update helm and docker-compose if release 
        if (params.release == 'local'){
          dir('release'){
            //bump only image tag
            withCredentials([usernamePassword(credentialsId: 'HydroRobot_AccessToken', passwordVariable: 'Githubpassword', usernameVariable: 'Githubusername')]) {
              git changelog: false, credentialsId: 'HydroRobot_AccessToken', url: "https://$Githubusername:$Githubpassword@github.com/Hydrospheredata/hydro-serving.git"      
              updateHelmChart("$newVersion")
              updateDockerCompose("$newVersion")
              sh script: "git commit --allow-empty -a -m 'Releasing $SERVICENAME:$newVersion'",label: "commit to git chart repo"
              sh script: "git push https://$Githubusername:$Githubpassword@github.com/Hydrospheredata/hydro-serving.git --set-upstream master",label: "push to git"
            }
          }
        }
      }
    }
}
