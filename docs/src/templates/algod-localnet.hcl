job "algod-localnet" {
  group "servers" {
    network {
      port "algod" {
        to = 8080
      }
      port "kmd" {
        to = 4160
      }
    }
    service {
      provider = "consul"
      port     = "algod"
      check {
        type     = "http"
        path     = "/health"
        interval = "5s"
        timeout  = "1s"
      }
    }

    task "web" {
      driver = "docker"
      env = {
        START_KMD = 1
        KMD_TOKEN = aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        TOKEN = aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        ADMIN_TOKEN = aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        GOSSIP_PORT = 10000

      }
      config {
        image   = "algorand/algod:latest"
        ports   = ["algod", "kmd"]
        mounts = [
          {
            type = "bind"
            source = "local"
            target = "/etc/algorand"
            readonly = false
          }
        ]
      }
      template {
        data        = <<-EOF
                      {
                        "Version": 12,
                        "GossipFanout": 1,
                        "EndpointAddress": "0.0.0.0:8080",
                        "DNSBootstrapID": "",
                        "IncomingConnectionsLimit": 0,
                        "Archival": true,
                        "isIndexerActive": false,
                        "EnableDeveloperAPI": true
                      }
                      EOF
        destination = "local/config.json"
      }
      template {
        data        = <<-EOF
                      {
                        "Genesis": {
                          "NetworkName": "followermodenet",
                          "RewardsPoolBalance": 0,
                          "FirstPartKeyRound": 0,
                          "LastPartKeyRound": NUM_ROUNDS,
                          "Wallets": [
                            {
                              "Name": "Wallet1",
                              "Stake": 40,
                              "Online": true
                            },
                            {
                              "Name": "Wallet2",
                              "Stake": 40,
                              "Online": true
                            },
                            {
                              "Name": "Wallet3",
                              "Stake": 20,
                              "Online": true
                            }
                          ],
                          "DevMode": true
                        },
                        "Nodes": [
                          {
                            "Name": "data",
                            "IsRelay": true,
                            "Wallets": [
                              {
                                "Name": "Wallet1",
                                "ParticipationOnly": false
                              },
                              {
                                "Name": "Wallet2",
                                "ParticipationOnly": false
                              },
                              {
                                "Name": "Wallet3",
                                "ParticipationOnly": false
                              }
                            ]
                          },
                          {
                            "Name": "follower",
                            "IsRelay": false,
                            "ConfigJSONOverride":
                            "{\"EnableFollowMode\":true,\"EndpointAddress\":\"0.0.0.0:8081\",\"MaxAcctLookback\":64,\"CatchupParallelBlocks\":64,\"CatchupBlockValidateMode\":3}"
                          }
                        ]
                      }
                      EOF
        destination = "local/template.json"
      }
      # Specify the maximum resources required to run the task
      resources {
        cpu    = 50
        memory = 128
      }
    }
  }
}
