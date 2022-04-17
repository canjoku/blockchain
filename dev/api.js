const express = require('express')
const app = express()
const Blockchain = require('./blockchain')
// const uuid = require('uuid')

// const nodeAddress = uuid().split('-').join('')

const bodyParser = require ('body-parser')

const port =  3000
const ethereum = new Blockchain()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/blockchain', (req, res) => {
    res.send(ethereum)
})

app.post('/transaction', (req, res) => {
    ethereum.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient)
    res.send(`
        the amount received is : ${req.body.amount}
        the sender is : ${req.body.sender}
        the recipient is : ${req.body.recipient}
    `)
})


app.post('/mine', (req, res) => {
    const lastBlock = ethereum.getLastBlock()
    const previousBlockHash = lastBlock['hash']
    const currentblockData = {
        transactions : ethereum.pendingTransactions,
        index: lastBlock['index'] + 1
    }

    const nonce = ethereum.proofOfWork(previousBlockHash, currentblockData)
    const blockHash = ethereum.hashBlock(previousBlockHash, currentblockData, nonce)
    const newBlock = ethereum.createNewBlock(nonce, blockHash, previousBlockHash)

    ethereum.createNewTransaction(12.5, "00", "nodeAddress")
    res.json({
        "note" : "New Block mined succesfully",
        block: newBlock
    })
})

app.listen(3000, () => {
    console.log('listening on port: ' + port)
})


