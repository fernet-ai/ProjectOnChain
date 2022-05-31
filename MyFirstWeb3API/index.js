var express = require('express');
const abi = require('./abi.json');
require('dotenv').config()

var app = express();

const Web3 = require('web3');
const web3 = new Web3('https://ropsten.infura.io/v3/'+ process.env.INFURA_KEY); // Id project preso da infura


//Qui ho inserito la chiave privata del mio wallet :)
const MyprivateKey = process.env.MY_PRIVATE_KEY
AccountSender = web3.eth.accounts.privateKeyToAccount(MyprivateKey);
const addressFrom = AccountSender.address;

// Contratto esercizio1
/**
Dopo aver fatto il deploy sulla testnet,
bisogna verificare il contratto in modo che altri utenti possano
interagire con il contratto!
- in questo modo si ottiene l'ABI sul proprio contratto

**/
const myContractAddress = process.env.MY_CONTRACT_ADDRESS;
// interfaccia smart contract [The Contract Application Binary Interface (ABI)]
const myAbi = abi;
const myContract = new web3.eth.Contract(myAbi, myContractAddress);



app.get('/', function(req, res){
    res.send("My first web3 project!1!!! Il mio indirizzo(msg.sender): " + addressFrom)
});


app.get('/getValue', function(req, res) {
  myContract.methods.getValue().call({from: addressFrom}).then((result) => {
     res.send("Il mio valore e' "+result);
  });
});



/** write**/
// qui chiamo sendSignedTransaction() anziché call() perché sto alterando lo stato del contratto
// e quindi delegare il pagmaneto della fee
// e bisogna anche prima firmarla

app.get('/write/:num', function(req, res) {

  var Tx = require('ethereumjs-tx').Transaction;


  web3.eth.getTransactionCount(addressFrom).then(_nonce =>{

    web3.eth.getGasPrice().then(gas_price => {
      // Preparo la transazione
      const rawTx = {
        nonce: _nonce,
        from: addressFrom,
        to: myContractAddress,
        data: myContract.methods.write(req.params.num).encodeABI(),
        gasPrice: gas_price,
        gasLimit: 30000,
        value: "0"
      };

      console.log(rawTx);

      web3.eth.accounts.signTransaction(rawTx,MyprivateKey, function(signTransactionErr, signedTx) {

            if(signTransactionErr){
              console.log(signTransactionErr);
            }

            web3.eth.sendSignedTransaction(signedTx.rawTransaction, (err, hash) => {
                if (err) {
                    console.log(err);
                }else{
                  console.log(hash);
                  res.send("Sto scrivendo sulla blockchain il valore "+ req.params.num);
                }
            });

        });
    });
  });

});




app.listen(3000);
