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

function killContract(){
  var selectBox = document.getElementById('select-box');
  var selectedAddr = selectBox.options[selectBox.selectedIndex].text;
  web3.eth.sendTransaction({from: selectedAddr}, function(error, result){
    if(error) {
      console.log(error);
      setStatus(error);
    } else{
      RevShare.deployed().kill;
      transactionReceipt(result);
    }
  });
}

function killSwitch(){
  if(document.getElementById('killbutton').disabled){
    document.getElementById('killbutton').disabled = false;
  }else {
    document.getElementById('killbutton').disabled = true;
  }
}

function refreshBalances() {
  document.getElementById("c_balance").innerHTML = web3.fromWei(web3.eth.getBalance(RevShare.deployed_address), "ether").toFixed(5);
  document.getElementById("a_balance").innerHTML = web3.fromWei(web3.eth.getBalance(document.getElementById("a_address").innerHTML), "ether").toFixed(5);
  document.getElementById("b_balance").innerHTML = web3.fromWei(web3.eth.getBalance(document.getElementById("b_address").innerHTML), "ether").toFixed(5);
  document.getElementById("cb_balance").innerHTML = web3.fromWei(web3.eth.getBalance(web3.eth.coinbase), "ether").toFixed(5)+ " ETH";
};

function transactionDetails(details) {
  var tableData = "<tr><td>" + details.trans + "</td><td>" + details.gas + "</td><td>" + details.block + "</td></tr>";
  document.getElementById("transaction-table").innerHTML += tableData;
};

function send(addr) {
  var rs = RevShare.deployed();

  var sendToAddress;

  switch(addr) {
      case "both":
          sendToAddress = RevShare.deployed_address;
          break;
      case "a":
          sendToAddress = document.getElementById("a_address").innerHTML;
          break;
      case "b":
          sendToAddress = document.getElementById("b_address").innerHTML;
          break;
      default:
          console.log("Error with the send-to address");
  }

  var amount = web3.toWei(parseFloat(document.getElementById("amount").value), "ether");

  setStatus("Initiating transaction... (please wait)");

  web3.eth.sendTransaction({from: web3.eth.coinbase, to: sendToAddress, value: amount}, function(error, result) {
    if(error) {
      console.log(error);
      setStatus(error);
    }
    else {
      transactionReceipt(result);
      // web3.eth.getTransactionReceiptMined(result).then(function(receipt) {
      //   var details = {
      //     trans: receipt.transactionHash,
      //     gas: receipt.gasUsed,
      //     block: receipt.blockNumber
      //   }
      //   console.log(details);
      //   setStatus("Transaction complete!");
      //   refreshBalances();
      //   transactionDetails(details);
      // }).catch(function(e) {
      //   console.log(e);
      //   setStatus(e);
      // });
    }
  });
};

function transactionReceipt(result){
  console.log(result);
  web3.eth.getTransactionReceiptMined(result).then(function(receipt) {
    var details = {
      trans: receipt.transactionHash,
      gas: receipt.gasUsed,
      block: receipt.blockNumber
    }
    console.log(details);
    setStatus("Transaction complete!");
    refreshBalances();
    transactionDetails(details);
  }).catch(function(e) {
    console.log(e);
    setStatus(e);
  });

}

window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    console.log(web3.eth.coinbase);
    console.log(accs);

    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    for (var i = 0; i < accs.length; i++) {
      document.getElementById("select-box").innerHTML += '<option>' + accs[i] + '</option>'
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
