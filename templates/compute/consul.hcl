datacenter = "hud"
data_dir = "/opt/consul"
client_addr = "0.0.0.0"
retry_join = ["{{consul_server_address}}"]
bind_addr = "{{ansible_eth1.ipv4.address}}"

