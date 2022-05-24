@Library('groovy-lib') _
def config = [
  "app": "gui-dynamic-collection-demo",       // Application name
  "namespace": "shared-services",           // Application namespace
  "helm_path": "k8s"          // Path to helm directory (./k8s/ by default)
]

deployDockerizedCentralRepo(config)
