# filecoin-address

[![Travis CI](https://travis-ci.org/openworklabs/filecoin-address.svg?branch=primary)](https://travis-ci.org/openworklabs/filecoin-address)

This is a JS implementation of the Filecoin address type, inspired by [go-address](https://github.com/filecoin-project/go-address). It can create new address instances and encode addresses, and it takes care of decoding and validating checksums. 

## Install

`yarn add @openworklabs/filecoin-address`

## Usage

```js
const { newFromString, encode } = require('@openworklabs/filecoin-address')

const address = newFromString('t1hvuzpfdycc6z6mjgbiyaiojikd6wk2vwy7muuei')

const decoded = address.str

const networkPrefix = 't'
const encoded = encode(networkPrefix, address)
```

## Test

`yarn install`<br/>
`yarn test`

## License

This repository is dual-licensed under Apache 2.0 and MIT terms.
