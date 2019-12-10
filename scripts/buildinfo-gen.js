const child_process = require("child_process")
const util = require("util")
const fs = require("fs")

let promisedExec = util.promisify(child_process.exec)

async function getHead() {
  let gitCommitProc = await promisedExec("git rev-parse HEAD")
  return gitCommitProc.stdout.trim()
}

async function getTags(commit) {
  let tags = await promisedExec("git describe --tags " + commit)
  return tags.stdout.trim();
}

async function getBranch() {
  let gitBranchProc = await promisedExec("git rev-parse --abbrev-ref HEAD")
  return gitBranchProc.stdout.trim()
}

async function parseGitInfo() {
  let commit = await getHead()
  return {
    "gitHeadCommit": commit,
    "gitCurrentBranch": await getBranch(),
    "gitCurrentTags": await getTags(commit)
  }
}

async function parseRuntime() {
  let nodeVersionProc = await promisedExec("node -v")
  return {
    "nodeVersion": nodeVersionProc.stdout.trim()
  }
}

function parseProject() {
  let projectRaw = fs.readFileSync("package.json")
  let projectObj = JSON.parse(projectRaw)
  return {
    "name": projectObj.name,
    "version": projectObj.version
  }
}

async function generateBuildInfo() {
  let gitInfo = await parseGitInfo()
  let runtimeInfo = await parseRuntime()
  let projectInfo = parseProject()
  return {...gitInfo, ...projectInfo, ...runtimeInfo}
}

generateBuildInfo()
  .then((data) => console.log(data));