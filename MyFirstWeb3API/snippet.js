
web3.eth.getTransaction(transaction)
    .then((res)=>{
        if(res.to==contractAddress && res.from!=acc.address){
            //let gasPrice=1000000000+parseInt(res.gasPrice);
            //100% slippage, must be optimized
            let data=exchangeContract.methods.swapExactETHForTokens(0,["0x27a67cc1e66327f8596C927BeE2569c0dd84e027","0x9bb34608B976355Ffb5554Ea1C08ee23a54C8Cfe"],frontrunnerAddress,45678965745789).encodeABI();
                    var gasLimit = 3000000;
                    const addressFrom = acc.address;
                    web3.eth.getTransactionCount(acc.address).then(noncen => {
                                var rawTransaction = {
                                    from: addressFrom,
                                    to: contractAddress,
                                    value: web3.utils.toHex(web3.utils.toWei("0.5", "ether")),
                                    nonce: noncen,
                                    "gasPrice": gasPrice,
                                    "gasLimit": web3.utils.toHex(gasLimit),
                                    data: data

                                };
                                web3.eth.accounts.signTransaction(rawTransaction,pk, function(signTransactionErr, signedTx) {


                                web3.eth.sendSignedTransaction(signedTx.rawTransaction, (err, hash) => {
                                    if (err) {
                                        console.log(err);
                                    }
