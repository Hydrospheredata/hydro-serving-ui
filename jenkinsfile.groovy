properties([
  parameters([
    choice(choices: ['patch','minor','major'], name: 'patchVersion', description: 'What needs to be bump?'),
    string(defaultValue:'', description: 'Force set newVersion or leave empty', name: 'newVersion', trim: false),
    choice(choices: ['local', 'global'], name: 'release', description: 'It\'s local release or global?'),
   ])
])

SERVICENAME = 'hydro-serving-ui'
TESTCMD = 'sbt --batch test'
REGISTRYURL = 'harbor.hydrosphere.io/hydro-serving'
SERVICEIMAGENAME = 'hydro-serving-ui'

def checkoutRepo(String repo){
  git changelog: false, credentialsId: 'HydroRobot_AccessToken', poll: false, url: repo
}

def getVersion(){
    try{
        //remove only quotes
        version = sh(script: "cat \"version\" | sed 's/\\\"/\\\\\"/g'", returnStdout: true ,label: "get version").trim()
        return version
    }catch(e){
        return "file " + stage + "/version not found" 
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

//Команды для запуска тестов (каждой репе своя?)
def runTest(){
  sh script: "$TESTCMD", label: "Run test task"
}

//Релиз сервисов, создаем коммиты и теги в гите
def releaseService(String xVersion, String yVersion){
  withCredentials([usernamePassword(credentialsId: 'HydroRobot_AccessToken', passwordVariable: 'password', usernameVariable: 'username')]) {
        //Set global git
      sh script: "git config --global user.name \"$username\"",label: "Set global username git"
      sh script: "git config --global user.email \"$username@provectus.com\"",label: "Set global email git"
      sh script: "git diff", label: "show diff"
      sh script: "git add .", label: "add all file to commit"
      sh script: "git commit -m 'Bump to $yVersion'", label: "commit to git"
      sh script: "git push --set-upstream origin master", label: "push all file to git"
      sh script: "git tag -a $yVersion -m 'Bump $xVersion to $yVersion version'",label: "set git tag"
      sh script: "git push --set-upstream origin master --tags",label: "push tag and create release"
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
    sh script: "sed \"s/.*image:.*/    image: $REGISTRYURL\\/hydro-serving-ui:$newVersion/g\" hydro-serving-ui.service.template > hydro-serving-ui.compose", label: "sed hydro-serving-ui version"
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
    //Bump hydroservingversion
    sh script: "echo $hydroServingVersion > ../version"
    bumpVersion(hydroServingVersion, "", 'patch', '../version')
    newhydroServingVersion = sh(returnStdout: true, script: "cat ../version").trim()
    //Change template
    sh script: "sed -i \"s/.*full:.*/  full: $REGISTRYURL\\/hydro-serving-ui:$newVersion/g\" ui/values.yaml", label: "sed hydro-manager version"

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

    sh script: "helm package --dependency-update --version $newhydroServingVersion serving", label: "Pack serving chart"
    def releaseFile = "serving-${newhydroServingVersion}.tgz"
    def sha = sh(script: "shasum -a 256 -b ${releaseFile} | awk '{ print \$1 }'", returnStdout: true).trim()
    def sedCommand = "'s/[0-9]+\\.[0-9]+\\.[0-9]+\\/serving-[0-9]+\\.[0-9]+\\.[0-9]+\\.tgz/${newhydroServingVersion}\\/serving-${newhydroServingVersion}.tgz/g'"
    sh script: "sed -i 'README.md' -E -e ${sedCommand} README.md" //TODO: Need use frigate for update readme
    sh script: "./add_version.sh $newhydroServingVersion ${sha}"
  }
}

node('hydrocentral') {
    stage('SCM'){
      checkoutRepo("https://github.com/Hydrospheredata/$SERVICENAME" + '.git')
      withCredentials([usernamePassword(credentialsId: 'HydroRobot_AccessToken', passwordVariable: 'Githubpassword', usernameVariable: 'Githubusername')]) {
        //Get Hydro-serving version
        hydroServingVersion = sh(script: "git ls-remote --tags --sort='v:refname' --refs 'https://$Githubusername:$Githubpassword@github.com/Hydrospheredata/hydro-serving.git' | sed \"s/.*\\///\" | grep -v \"[a-z]\" | tail -n1", returnStdout: true, label: "get global hydrosphere version").trim()
      }
    }

    stage('Test'){
      if (env.CHANGE_ID != null){
        //runTest()
        buildDocker()
      }
    }

    stage('Release'){
      if (BRANCH_NAME == 'master' || BRANCH_NAME == 'main'){
          oldVersion = getVersion()
          bumpVersion(getVersion(),params.newVersion,params.patchVersion,'version')
          newVersion = getVersion()
          buildDocker()
          pushDocker(REGISTRYURL, SERVICEIMAGENAME+":$newVersion")
          //Create commit and tags for hydro-serving-ui
          releaseService(oldVersion, newVersion)
          //Update helm and docker-compose if release 
        if (params.release == 'local'){
          dir('release'){
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