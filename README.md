# RevShare
Fork of code from [Distributed Systems](https://github.com/dsystems-io). Simple revenue sharing dApp. Splits incoming ether between the owners of the contract.

Newly added functionality:
* send individual transaction to two seperate accounts
* table showing transaction hash, gas usage, and block number
* kill contract button (under development)

## Dependencies
* [Node.js & npm](https://nodejs.org)
* [Truffle](https://github.com/ConsenSys/truffle)
* [Geth](https://github.com/ethereum/go-ethereum/wiki/geth) or [testrpc](https://github.com/ethereumjs/testrpc)

## Run
*  `truffle build`
*  `truffle serve`

## Preview
![alt text](https://raw.githubusercontent.com/FugueWeb/rev-share/master/app/images/preview.png "App Preview")

## Todo
* Dynamically pass owners instead of hardcoding
* Better test coverage
* Flexible ownership stuctures with configurable percentages
* Select different account
* On-the-fly account unlocking
* Responsive QR - refresh when account receives tx
* Kill switch

## License
[MIT](https://github.com/dsystems-io/rev-share/blob/master/LICENSE)
