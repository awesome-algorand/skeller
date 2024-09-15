datacenter = "hud"
data_dir = "/opt/consul"
client_addr = "0.0.0.0"
ui_config{
  enabled = true
}
server = true
bind_addr = "{{ansible_eth1.ipv4.address}}"
bootstrap_expect = 1
