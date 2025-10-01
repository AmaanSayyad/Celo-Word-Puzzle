export  default  {
    
    contractAddress: "0x5E6658ac6cBC9b0109C28BED00bC4Af0F0A3f1CD",
    abi : [
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "score",
            "type": "uint256"
          }
        ],
        "name": "NewUserAdded",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "newScore",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "oldScore",
            "type": "uint256"
          }
        ],
        "name": "ScoreUpdated",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "getAllScoresDescending",
        "outputs": [
          {
            "components": [
              {
                "internalType": "address",
                "name": "user",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "score",
                "type": "uint256"
              }
            ],
            "internalType": "struct UserScoreManager.UserScore[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getMyScore",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_user",
            "type": "address"
          }
        ],
        "name": "getScore",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_limit",
            "type": "uint256"
          }
        ],
        "name": "getTopScores",
        "outputs": [
          {
            "components": [
              {
                "internalType": "address",
                "name": "user",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "score",
                "type": "uint256"
              }
            ],
            "internalType": "struct UserScoreManager.UserScore[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getTotalUsers",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_user",
            "type": "address"
          }
        ],
        "name": "getUserRank",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_user",
            "type": "address"
          }
        ],
        "name": "hasScore",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_score",
            "type": "uint256"
          }
        ],
        "name": "setScore",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]
        
    

}