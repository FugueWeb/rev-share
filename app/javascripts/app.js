var accounts;
var account;
var balance;

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function setAddress() {
  document.getElementById("c_address").innerHTML = RevShare.deployed_address;
  document.getElementById("qr").innerHTML = "<img src=\"https://chart.googleapis.com/chart?cht=qr&chs=350&chl=ether:"+ RevShare.deployed_address +"\" height=\"250\" />";
}

function refreshBalances() {
  document.getElementById("c_balance").innerHTML = web3.fromWei(web3.eth.getBalance(RevShare.deployed_address), "ether");
  document.getElementById("a_balance").innerHTML = web3.fromWei(web3.eth.getBalance(document.getElementById("a_address").innerHTML), "ether");
  document.getElementById("b_balance").innerHTML = web3.fromWei(web3.eth.getBalance(document.getElementById("b_address").innerHTML), "ether");
  document.getElementById("cb_balance").innerHTML = web3.fromWei(web3.eth.getBalance(web3.eth.coinbase), "ether")+ " ETH";
};

function send() {
  var rs = RevShare.deployed();

  var amount = web3.toWei(parseFloat(document.getElementById("amount").value), "ether");

  setStatus("Initiating transaction... (please wait)");

  web3.eth.sendTransaction({from: web3.eth.coinbase, to: RevShare.deployed_address, value: amount}, function(error, result) {
    if(error) {
      console.log(error);
      setStatus(error);
    }
    else {
      web3.eth.getTransactionReceiptMined(result).then(function(receipt) {
        setStatus("Transaction complete!");
        refreshBalances();
      }).catch(function(e) {
        console.log(e);
        setStatus(e);
      });
    }
  });
};

window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];

    setAddress();
    refreshBalances();
  });

  web3.eth.getTransactionReceiptMined = function (txnHash, interval) {
    var transactionReceiptAsync;
    interval |= 500;
    transactionReceiptAsync = function(txnHash, resolve, reject) {
        try {
            var receipt = web3.eth.getTransactionReceipt(txnHash);
            if (receipt == null) {
                setTimeout(function () {
                    transactionReceiptAsync(txnHash, resolve, reject);
                }, interval);
            } else {
                resolve(receipt);
            }
        } catch(e) {
            reject(e);
        }
    };

    return new Promise(function (resolve, reject) {
        transactionReceiptAsync(txnHash, resolve, reject);
    });
  };
}
