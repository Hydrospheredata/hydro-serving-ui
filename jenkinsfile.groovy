def repository = 'hydro-serving-ui'

def buildFunction = {
  def curVersion = getVersion()
  sh "npm install"
  sh "./node_modules/.bin/ng build --prod --aot=false"
  sh "cp -r ${repository} docker"
  sh "cd docker && docker build -t hydrosphere/serving-manager-ui:${curVersion} ."
}

def postReleaseActionFunction = { props ->
  // def props = readJSON text: "${releaseInfo}"
  zip archive: true, dir: "${repository}", glob: "", zipFile: "release-${props.name}.zip"
  def releaseFile = "release-${props.name}.zip"

  uploadFilesToGithub(props.id, releaseFile, releaseFile, repository)
}

pipelineCommon(
  repository,
  false, //needSonarQualityGate,
  ["hydrosphere/serving-manager-ui"],
  {},//collectTestResults, do nothing
  buildFunction,
  buildFunction,
  buildFunction,
  postReleaseActionFunction,
  "",
  "",
  {},
  commitToCD("ui")
)
