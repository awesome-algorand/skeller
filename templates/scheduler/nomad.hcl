datacenter = "hud"
data_dir  = "/opt/nomad/data"
bind_addr = "0.0.0.0"
server {
  enabled          = true
  bootstrap_expect = 1
}
advertise {
  http = "{{ansible_eth1.ipv4.address}}"
  rpc  = "{{ansible_eth1.ipv4.address}}"
  serf = "{{ansible_eth1.ipv4.address}}"
}
