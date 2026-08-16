terraform {
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5"
    }
  }
}

provider "local" {}

resource "local_file" "infrastructure_demo" {
  filename = "${path.module}/infrastructure-demo.txt"

  content = <<-EOT
    Weather App Infrastructure

    Frontend: React + Nginx
    Environment: Production
    Backend: Node.js + Express
    API: /api/v1
    Container orchestration: Docker Compose
  EOT
}