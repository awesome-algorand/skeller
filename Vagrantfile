# -*- mode: ruby -*-
# vi: set ft=ruby :

# Number of machines
N = 3

Vagrant.configure("2") do |config|
  (1..N).each do |machine_id|
    name = machine_id == N ? "scheduler" : "compute-#{machine_id}"
    address = "192.168.56.#{20+machine_id}"

    config.vm.box = "bento/ubuntu-22.04"
    config.vm.synced_folder '.', '/vagrant', disabled: true
    config.vm.provider "virtualbox" do |v|
      v.memory = 1024
      v.cpus = 2
    end
    config.vm.define name do |machine|
      machine.vm.hostname = name
      machine.vm.network "private_network", ip: address

      if machine_id == N
        machine.vm.network "forwarded_port", guest: 8500, host: 8500
        machine.vm.network "forwarded_port", guest: 4646, host: 4646
        machine.vm.provision :ansible do |ansible|
          ansible.groups = {
            "compute" => (1..N-1).map { |id| "compute-#{id}" },
            "compute:vars" => {
              "consul_server_address" => address,
              "consul_server_port" => 8500,
              "nomad_network_interface" => "eth1",
              "template_path" => "compute"
            }
          }
          # Disable default limit to connect to all the machines
          ansible.limit = "all"
          ansible.playbook = "playbook.yaml"
          ansible.host_vars = {
            "scheduler" => {
              "template_path" => "scheduler"
            }
          }
        end
      end
    end
  end
end
