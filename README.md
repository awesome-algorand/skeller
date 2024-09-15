# <img src="docs/public/skelly-64.png" width="32" alt="Skelly Logo"> Skeller
> Skeller is a skeleton project for deploying services on a Consul/Nomad cluster.

## Requirements

- Vagrant
- Ansible

## Get Started

Clone the project

```bash
git clone https://github.com/awesome-algorand/skeller
```

Spin up the Vagrant cluster

```bash
vagrant up
```

View the services in your browser

- [http://localhost:8500](http://localhost:8500) - Consul
- [http://localhost:4646](http://localhost:4646) - Nomad

Deploy a job using the admin url: [http://localhost:4646/ui/jobs/run](http://localhost:4646/ui/jobs/run)

```hcl
job "lets-go" {
  datacenters = ["*"]
  group "servers" {
    count = 1
    network {
      port "www" {
        to = 8001
      }
    }
    service {
      provider = "consul"
      port     = "www"
    }
    task "web" {
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
                        <li>Currently running on port: {{env "NOMAD_PORT_www"}}</li>
                      </ul>
                      EOF
        destination = "local/index.html"
      }
      resources {
        cpu    = 50
        memory = 64
      }
    }
  }
}
```

### Production [WIP]

### Orchestrator Cluster

The orchestrator is a Consul/Nomad cluster that will be used to manage the services.


#### Compute Cluster

The compute cluster is a group of machines that will be used to run the services.
These services should be distributed across regions and availability zones.

> [!NOTE]
> It is up to the user to provision the machines and provide the ssh configurations for ansible

Create an inventory file

```yaml
# inventory.yaml
compute:
  hosts:
    us:
      ansible_host: ubuntu@ns1017691.ip-15-204-198.us
      ansible_user: ubuntu
    eu:
      ansible_host: ubuntu@ns31597298.ip-146-59-111.eu
      ansible_user: ubuntu
```

Provision a machine

```bash
ansible-playbook -i inventory.yaml playbook.yaml 
```

## TODO:

- [ ] Production Deployment
- [ ] Marketing Jazz
- [ ] Terraform Plans


