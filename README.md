# filecoin-address

[![Travis CI](https://travis-ci.org/openworklabs/filecoin-address.svg?branch=primary)](https://travis-ci.org/openworklabs/filecoin-address)

This is a JS implementation of the Filecoin address type, inspired by [go-address](https://github.com/filecoin-project/go-address). It can create new address instances and encode addresses, and it takes care of decoding and validating checksums.

## Install

`yarn add @openworklabs/filecoin-address`

## Usage

```js
const { newFromString, encode } = require('@openworklabs/filecoin-address')

const address = newFromString('t1hvuzpfdycc6z6mjgbiyaiojikd6wk2vwy7muuei')
const addressProtocol = address.protocol()
const addressPayload = address.payload()
const addressString = address.str

const networkPrefix = 't'
const encoded = encode(networkPrefix, address)
```

#### Exported methods

- newAddress
- newFromString
- decode
- encode
- bigintToArray
- getChecksum
- validateChecksum
- validateAddressString
- checkAddressString

## Test

`npm install`<br/>
`npm test`

Note: test vectors can be [found here](https://github.com/filecoin-project/go-address/blob/master/address_test.go). The bytes for ID address vectors were grabbed from `maybeAddr.Bytes()` [inside the test](https://github.com/filecoin-project/go-address/blob/4d2035ed7b6f117ae4822b8be8bf17e1cbf8c12d/address_test.go#L197).

## License

This repository is dual-licensed under Apache 2.0 and MIT terms.
