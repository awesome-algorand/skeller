datacenter = "hud"
data_dir  = "/opt/nomad/data"
bind_addr = "0.0.0.0"
client {
  enabled = true
  network_interface = "{{nomad_network_interface}}"
}
