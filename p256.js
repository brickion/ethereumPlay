var EC = require('elliptic').ec;
var ec = new EC('p256');

var key = ec.genKeyPair()
console.log(key.getPublic(true, 'hex'));
console.log(key.getPublic(false, 'hex')); // generated pubkey
console.log(key.getPrivate('hex')); // generated private key

//-------//

// #TODO DH - please work on this
function verifySig(sender, recipient, symbol, amount, nonce, signature) {
  const publicKey = sender.encode('hex')
  const key = ec.keyFromPublic(publicKey, 'hex')
  const message = sender + recipient + symbol + amount + nonce // should convert to byte array
  return key.verify(msgHash, signature)
})
// #TODO DH - please work on this
