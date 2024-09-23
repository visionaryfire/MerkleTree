const { MerkleTree } = require('merkletreejs');
const userdata = require("./userdata.json");
const keccak256 = require('keccak256');
const { ethers } = require('ethers');

const abi = 
    [{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"},{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes32[]","name":"merkleProof","type":"bytes32[]"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token_","type":"address"},{"internalType":"bytes32","name":"merkleRoot_","type":"bytes32"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"index","type":"uint256"},{"indexed":false,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claimed","type":"event"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"isClaimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"merkleRoot","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}];
const contractAddress = '0x863b6410ae48e4065Ff893e0e1cf0B11C7e2647b';
const provider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/8feb81519d854be19720aac80929cacd","rinkeby");

let _merkletree;

/*
Construct a Merkle Tree from given user data
*/

function createMerkleTree(data) {
    const leaves = data.map(v => {
        let encoded = ethers.utils.solidityKeccak256(["uint256", "address", "uint256"], [v.index, v.address, v.amount.hex]);
        return encoded;
    });
    const tree = new MerkleTree(leaves, keccak256, { sort: true });
    return tree;
}

/*
Get Merkle Proof from user data including index, address and amount
*/

function getMerkleProof(index, address, amount) {
    let leaf = ethers.utils.solidityKeccak256(["uint256", "address", "uint256"], [index, address, amount]);
    return _merkletree.getHexProof(leaf);
}

/*
Claim withdraw
*/

async function withdraw(index, account, amount) {
    let privateKey = '';
    userdata.privateKeys.forEach((v) => {
        if(v.index == index) privateKey = v.privateKey;
    })
    if(privateKey == '') return;

    let wallet = new ethers.Wallet(privateKey, provider);
    let contract = new ethers.Contract(contractAddress, abi, wallet);

    let proof = getMerkleProof(index, account, amount);

    console.log("################### index ###################", index);
    console.log("################### account ################### ", account);
    console.log("################### amount ################### ", amount);
    console.log("################### merkle proof ################### ", proof);

    var isClainedTx = contract.isClaimed(index);
    isClainedTx.then(function(transaction){
        console.log(" ################### Call isClaimed() and get the result ################### ",transaction);
    }); 

    var claimTx = contract.claim(index, account, amount, proof);
    claimTx.then(function(transaction){
      console.log(transaction);
    }); 

}

_merkletree = createMerkleTree(userdata.distribution);
console.log(" ###################   Merkle Root  ################### ", _merkletree.getHexRoot());

withdraw(0, userdata.distribution[0].address, userdata.distribution[0].amount.hex);