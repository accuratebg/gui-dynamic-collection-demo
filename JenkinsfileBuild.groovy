@Library('groovy-lib') _
def config = [
  "app": "gui-dynamic-collection-demo",
  "src_path": "./",
  "buildId": "${env.BUILD_ID}"
]

buildDockerizedGeneric(config)
