const Web3 = require('web3')
const EthereumTx = require('ethereumjs-tx')

const web3 = new Web3(
    new Web3.providers.HttpProvider('https://rinkeby.infura.io/SMGlsePhqwYyzV2C0PCn')
)

//console.log(CreateAccount())
/*Send(
  '0xd55D1D2DF6e3dC90EF5ae84C7f1a01dcB1385900',
  'b4e205bfbca22eae09564c9c5ee74949185aceee3afacfae13c1e9eaade5961d',
  '0x7DeB861b373AE4e54F00e509855942Ce3bd1Edf7',
  '.0001'
)*/

//CheckBalance('0xd55D1D2DF6e3dC90EF5ae84C7f1a01dcB1385900')
//GetTransaction('0x2d1bac54caa992e0014aef34e2077ceb308f7d6f6efe24c1cdde510a751e7ea9')
isTransactionSuccessful('0x2d1bac54caa992e0014aef34e2077ceb308f7d6f6efe24c1cdde510a751e7ea9')

function CreateAccount() {
  var account = web3.eth.accounts.create(web3.utils.randomHex(32))
  //console.log(account)
  return {
    key: account.privateKey,
    address: account.address
  }
}

async function CheckBalance(address) {
  var balance = await web3.eth.getBalance(address)
  console.log(balance)
  return balance
}

async function GetTransaction(transactionHash) {
  try {
    var transaction = await web3.eth.getTransaction(transactionHash)
    console.log(transaction)
    return transaction
  }
  catch (err) {
    console.log(err)
  }
}

async function GetTransactionReceipt(transactionHash) {
  try {
    var transaction = await web3.eth.getTransactionReceipt(transactionHash)
    console.log(transaction)
    return transaction
  }
  catch (err) {
    console.log(err)
  }
}

async function isTransactionSuccessful(transactionHash) {
  try {
    var transaction = await web3.eth.getTransactionReceipt(transactionHash)
    console.log(transaction.status)
    return transaction
  }
  catch (err) {
    console.log(err)
  }
}

async function Send(from, key, to, amount) {
  try {
    const gasPrice = await web3.eth.getGasPrice()
    console.log('price: ' + gasPrice)
    const gasPriceHex = web3.utils.toHex(gasPrice)
    const blockNumber = await web3.eth.getBlockNumber()
    console.log('block: ' + blockNumber)
    const block = await web3.eth.getBlock(blockNumber)
    console.log('limit: ' + block.gasLimit)
    const gasLimitHex = web3.utils.toHex(block.gasLimit)

    const transactionParams = {
      from: from,
      to: to,
      value: web3.utils.toWei(amount, 'ether'),
      gasPrice: gasPriceHex, //web3.utils.toHex(21000),
      gasLimit: gasLimitHex //web3.utils.toHex(21000)
    }

    console.log(transactionParams)

    const privateKey = Buffer.from(key, 'hex')

    const transaction = new EthereumTx(transactionParams)
    transaction.sign(privateKey)

    var serializedTransaction = transaction.serialize();

    const transactionHash = await web3.eth.sendSignedTransaction('0x' + serializedTransaction.toString('hex'))
    console.log(transactionHash)
    return transactionHash
  }
  catch (err) {
    console.log(err)
  }
}
