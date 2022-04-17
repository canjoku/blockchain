const sha256 = require('sha256')
function Blockchain() {
    this.chain = [];
    this.pendingTransactions = [];
    this.createNewBlock(100, '000000000000000000', 0)
}

Blockchain.prototype.createNewBlock = function (nonce, hash, previousBlockHash) {
    const newBlock = {
        index: this.chain.length +1, 
        timestamp: Date.now(),
        nonce, 
        hash,
        transactions: this.pendingTransactions,
        previousBlockHash
    }

    this.chain.push(newBlock);
    this.pendingTransactions = [];

    return newBlock;
    
}

Blockchain.prototype.createNewTransaction = function (amount, sender, recipient) {
    const transaction = {
        amount, sender, recipient
    }

    this.pendingTransactions.push(transaction);
    return transaction
}

Blockchain.prototype.getLastBlock = function () {
    return this.chain[this.chain.length -1]
}

Blockchain.prototype.hashBlock = function (previousBlockHash, currentblockData, nonce ) {
    const dataAsString = previousBlockHash + nonce.toString() +JSON.stringify(currentblockData);
    const hash = sha256(dataAsString);
    return hash
}

Blockchain.prototype.proofOfWork = function (previousBlockHash, currentblockData) {
    let nonce = 0;
    let hash = this.hashBlock(previousBlockHash, currentblockData, nonce);
    while (hash.substring(0,4) !== '0000') {
        nonce ++;
        hash = this.hashBlock(previousBlockHash, currentblockData, nonce)
    }
    return nonce
}





// const ethereum = new Blockchain();


// ethereum.createNewTransaction(2345, '23bghr56377', '298xryrth686'  );
// ethereum.createNewTransaction(2348, '23bghr5xxxx7', '298xhn3686' );


// ethereum.createNewBlock(16, "6573563rrrrpli45243");


// ethereum.createNewTransaction(23, '23bghr56377', '298xhn3686');
// ethereum.createNewTransaction(34, '23bghr56377', '298xhnqqqq86');
// ethereum.createNewTransaction(22, '23bghr56377', '298xhn3686',);


// ethereum.createNewBlock(12, "65735635345243");
// ethereum.createNewBlock(13, "6573dhtwre5345243");
// ethereum.createNewBlock(14, "65tehnhy5635345243" );

// ethereum.createNewTransaction(43, '23bghr56377', '298xhn3686');
// ethereum.createNewTransaction(33, '23bghr56377', '298xhn3686',);

// ethereum.createNewBlock(1, "87dhnhdytehrgurh")

// ethereum.createNewTransaction(45, '23bghr56377', '298xhn3686' );

// console.log(ethereum)




module.exports = Blockchain;