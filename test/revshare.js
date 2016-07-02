/**
 * Test suite for RevShare.sol
 * @todo Better test coverage for different amounts of ETH
 */
contract('RevShare', function(accounts) {
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

  it("should start with an empty balance", function(done) {
    return new Promise(function (resolve, reject) {
      var balance = web3.eth.getBalance(RevShare.deployed_address).toNumber();
      assert.equal(balance, 0, "The contract address is not empty.");
      resolve();
    }).then(done).catch(done);
  });

  it("should split funds evenly", function(done) {
    var rs = RevShare.deployed();
    var owner1 = "0xf6549feb3bc3dcfc24b7b2b43aabb1b53169fb06";
		var owner2 = "0x6c21c01e97374f324f863f73112207d4122eb08b";
    var amount = web3.toWei(1, "ether");
    var owner1_balance_before = web3.eth.getBalance(owner1).toNumber();
    var owner2_balance_before = web3.eth.getBalance(owner2).toNumber();
    var diff = amount / 2;

    web3.eth.sendTransaction({from: web3.eth.coinbase, to: RevShare.deployed_address, value: amount}, function(error, result) {
      web3.eth.getTransactionReceiptMined(result).then(function(receipt) {
        assert.equal(web3.eth.getBalance(owner1).toNumber(), owner1_balance_before + diff, "Owner 1 balance is off");
        assert.equal(web3.eth.getBalance(owner2).toNumber(), owner2_balance_before + diff, "Owner 2 balance is off");
      }).then(done).catch(done);
    });
  });
});
