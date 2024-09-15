datacenter = "hud"
data_dir = "/opt/consul"
retry_join = ["{{consul_server_address}}:{{consul_server_port}}"]
bind_addr = "{{ansible_eth1.ipv4.address}}"

