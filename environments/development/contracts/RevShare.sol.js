// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":true,"inputs":[],"name":"creator","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"owner2","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"owner1","outputs":[{"name":"","type":"address"}],"type":"function"},{"inputs":[],"type":"constructor"}],
    binary: "606060405260008054600160a060020a0319908116331790915560018054821673f6549feb3bc3dcfc24b7b2b43aabb1b53169fb0617905560028054909116736c21c01e97374f324f863f73112207d4122eb08b179055610134806100646000396000f3606060405236156100405760e060020a600035046302d05d3f811461007357806341c0e1b51461008557806352709725146100ad57806373688914146100bf575b6100d16001546000906002340490600160a060020a03168282606082818181858883f1935050505015156100eb57610002565b61011d600054600160a060020a031681565b61013060005433600160a060020a039081169116141561013257600054600160a060020a0316ff5b61011d600254600160a060020a031681565b61011d600154600160a060020a031681565b60408051918252519081900360200190f35b600191505090565b600254604051600160a060020a0391909116908390348490039082818181858883f1935050505015156100e357610002565b600160a060020a03166060908152602090f35b005b56",
    unlinked_binary: "606060405260008054600160a060020a0319908116331790915560018054821673f6549feb3bc3dcfc24b7b2b43aabb1b53169fb0617905560028054909116736c21c01e97374f324f863f73112207d4122eb08b179055610134806100646000396000f3606060405236156100405760e060020a600035046302d05d3f811461007357806341c0e1b51461008557806352709725146100ad57806373688914146100bf575b6100d16001546000906002340490600160a060020a03168282606082818181858883f1935050505015156100eb57610002565b61011d600054600160a060020a031681565b61013060005433600160a060020a039081169116141561013257600054600160a060020a0316ff5b61011d600254600160a060020a031681565b61011d600154600160a060020a031681565b60408051918252519081900360200190f35b600191505090565b600254604051600160a060020a0391909116908390348490039082818181858883f1935050505015156100e357610002565b600160a060020a03166060908152602090f35b005b56",
    address: "0x31ed75d9408129f66d82800a5abf84e99f7607cf",
    generated_with: "2.0.8",
    contract_name: "RevShare"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("RevShare error: Please call load() first before creating new instance of this contract.");
    }

    Contract.Pudding.apply(this, arguments);
  };

  Contract.load = function(Pudding) {
    Contract.Pudding = Pudding;

    Pudding.whisk(contract_data, Contract);

    // Return itself for backwards compatibility.
    return Contract;
  }

  Contract.new = function() {
    if (Contract.Pudding == null) {
      throw new Error("RevShare error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("RevShare error: Please call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("RevShare error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.RevShare = Contract;
  }

})();
