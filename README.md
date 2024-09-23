## Merkle tree

### Objective: 

A group of users is eligible for rewards in a certain token type. Each user is allocated a different amount and the distribution information is in the backend. 
The goal is to store the total reward in a smart contract called Distributor and allow user to withdraw his reward portion from this contract. 
Normally the distribution size is very big hence it is infeasible to port and save this information directly on-chain. 
To make sure that each user can only withdraw the amount he is assigned to we use a technique called Merkle tree where all the distribution information is encoded into the Merkle root.

#### Disclaimer: 
`During the process one needs to explicitly implement the function that returns the Merkle proof for each user with a small description of how the proof is formed and verified on-chain.`

### Given:
- Testnet: Rinkeby
- Token contract: `0x9A9F8BC7A560FAE25ad4263fD84476436F4Ce1eA` 
- Distributor contract: `0x60d4663A0874cAa6CF7504f8c93e8cac9A60A83a` 
- Initial distribution for each user index, address, private key, amount, where index denotes the placement in the merkle tree. 
- Test Ether on address `0x5179935322Ca6F098cba068d9bd4c83Bcbc58798`, private key `9802c6c2b68926ae518c8f7da60ae64fa4b2b46cc006964b8df83115947993dd`
### What is expected from this sample project:
- Research about Merkle trees
- Research about smart contracts and how to get basic information from them 
- Write code to make merkle tree and get proofs for it 
- Research and deploy 
- Research how to make transactions on ethereum testnet 
- Write code to make transactions on testnet to claim rewards 
- Preferably in Node JS/TS or Go

### Need deep explanation? Plz contact me via email...