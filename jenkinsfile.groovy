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
    tagVersion = getVersion() 
    sh script: "docker build -t hydrosphere/$SERVICEIMAGENAME:$tagVersion .", label: "Run build docker task";
}

def pushDocker(String registryUrl, String dockerImage){
    //push docker image to registryUrl
    withCredentials([usernamePassword(credentialsId: 'hydrorobot_docker_creds', passwordVariable: 'password', usernameVariable: 'username')]) {
      sh script: "docker login --username ${username} --password ${password}"
      //sh script: "docker tag hydrosphere/$dockerImage $registryUrl/$dockerImage",label: "set tag to docker image"
      sh script: "docker push $registryUrl/$dockerImage",label: "push docker image to registry"
    }
}

def updateDockerCompose(String newVersion){
  dir('docker-compose'){
    //Change template TODO: Change composename and imagename to $SERVICENAME
    sh script: "sed \"s/.*image:.*/    image: hydrosphere\\/hydro-serving-ui:$newVersion/g\" hydro-serving-ui.service.template > hydro-serving-ui.compose", label: "sed hydro-serving-ui version"
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
    sh script: "sed -i \"s/.*full:.*/  full: hydrosphere\\/hydro-serving-ui:$newVersion/g\" ui/values.yaml", label: "sed hydro-serving-ui version"
    sh script: "sed -i \"s/.*serving-ui:.*/  full: hydrosphere\\//serving-ui:$newVersion/g\" dev.yaml", label: "sed hydro-serving-ui dev stage version"

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

def slackMessage(){
    withCredentials([string(credentialsId: 'slack_message_url', variable: 'slack_url')]) {
    //beautiful block
      def json = """
{
	"blocks": [
		{
			"type": "header",
			"text": {
				"type": "plain_text",
				"text": "$SERVICENAME: release - ${currentBuild.currentResult}!",
				"emoji": true
			}
		},
		{
			"type": "section",
			"block_id": "section567",
			"text": {
				"type": "mrkdwn",
				"text": "Build info:\n    Project: $JOB_NAME\n    Author: $AUTHOR\n    SHA: $newVersion"
			},
			"accessory": {
				"type": "image",
				"image_url": "https://res-5.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco/oxpejnx8k2ixo0bhfsbo",
				"alt_text": "Hydrospere loves you!"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "You can see the assembly details by clicking on the button"
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "Details",
					"emoji": true
				},
				"value": "Details",
				"url": "${env.BUILD_URL}",
				"action_id": "button-action"
			}
		}
	]
}
"""
    //Send message
        sh label:"send slack message",script:"curl -X POST \"$slack_url\" -H \"Content-type: application/json\" --data '${json}'"
    }
}


node('hydrocentral') {
    try {
      stage('SCM'){
        //Set commit author
        sh script: "git config --global user.name \"HydroRobot\"", label: "Set username"
        sh script: "git config --global user.email \"robot@hydrosphere.io\"", label: "Set user email"
        checkoutRepo("https://github.com/Hydrospheredata/$SERVICENAME" + '.git')
        AUTHOR = sh(script:"git log -1 --pretty=format:'%an'", returnStdout: true, label: "get last commit author").trim()
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
    //post if success
        slackMessage()
    } catch (e) {
    //post if failure
        currentBuild.result = 'FAILURE'
        slackMessage()
        throw e
    }
}
