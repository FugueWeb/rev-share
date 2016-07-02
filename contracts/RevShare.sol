/**
 * Simple revenue sharing contract.
 * Receives Ether payments and divides that payment amongst the owners.
 * @title RevShare
 * @author Paul Szczesny
 */

contract RevShare {
	address public creator;
	address public owner1;
	address public owner2;


	function RevShare() {
		creator = msg.sender;
		owner1 = 0xf6549feb3bc3dcfc24b7b2b43aabb1b53169fb06;
		owner2 = 0x6c21c01e97374f324f863f73112207d4122eb08b;
	}

	function () returns (bool success) {
		uint amount = this.balance;
		// If uneven number, subtract 1
		if ( amount % 2 != 0  ) amount--;
		uint toSend = amount/2;

		if(!owner1.send(toSend)) return false;
		if(!owner2.send(toSend)) {
			throw;
			return true;
		}
	}

	function kill() {
    if (msg.sender == creator) suicide(creator); // Kill contract
  }
}
