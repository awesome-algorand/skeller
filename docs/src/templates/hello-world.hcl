job "hello-world" {
  group "servers" {
    network {
      port "www" {
        to = 8001
      }
      port "algod" {
        to = 4001
      }
      port "kmd" {
        to = 4002
      }
    }
    service {
      provider = "consul"
      port     = "www"
      check {
        type     = "http"
        path     = "/"
        interval = "5s"
        timeout  = "1s"
      }
    }
    task "web" {
      # This particular task starts a simple web server within a Docker container
      driver = "docker"

      config {
        image   = "busybox:1"
        command = "httpd"
        args    = ["-v", "-f", "-p", "${NOMAD_PORT_www}", "-h", "/local"]
        ports   = ["www"]
      }

      template {
        data        = <<-EOF
                      <h1>Hello, Nomad!</h1>
                      <ul>
                        <li>Task: {{env "NOMAD_TASK_NAME"}}</li>
                        <li>Group: {{env "NOMAD_GROUP_NAME"}}</li>
                        <li>Job: {{env "NOMAD_JOB_NAME"}}</li>
                        <li>Metadata value for foo: {{env "NOMAD_META_foo"}}</li>
                        <li>Currently running on port: {{env "NOMAD_PORT_www"}}</li>
                      </ul>
                      EOF
        destination = "local/index.html"
      }

      # Specify the maximum resources required to run the task
      resources {
        cpu    = 50
        memory = 64
      }
    }
  }
}
