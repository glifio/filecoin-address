/* eslint-env mocha */
const { expect } = require('chai')
// const borc = require('borc')
const { newFromString } = require('../src/index')
const {
  IDAddresses,
  secp256k1Addresses,
  BLSAddresses,
  actorAddresses
} = require('./constants')

function typedArraysAreEqual(a, b) {
  if (a.byteLength !== b.byteLength) return false
  return a.every((val, i) => val === b[i])
}

describe('address', () => {
  describe('newFromString', () => {
    it('should create new ID addresses', async () => {
      IDAddresses.forEach(item => {
        const address = newFromString(item.string)
        expect(
          typedArraysAreEqual(
            Uint8Array.from(address.str),
            item.decodedByteArray
          )
        ).to.eql(true)
      })
    })

    it('should create new secp256k1 addresses', async () => {
      secp256k1Addresses.forEach(item => {
        const address = newFromString(item.string)
        expect(
          typedArraysAreEqual(
            Uint8Array.from(address.str),
            item.decodedByteArray
          )
        ).to.eql(true)
      })
    })

    it('should create new BLS addresses', async () => {
      BLSAddresses.forEach(item => {
        const address = newFromString(item.string)
        expect(
          typedArraysAreEqual(
            Uint8Array.from(address.str),
            item.decodedByteArray
          )
        ).to.eql(true)
      })
    })

    it('should create new Actor addresses', async () => {
      actorAddresses.forEach(item => {
        const address = newFromString(item.string)
        expect(
          typedArraysAreEqual(
            Uint8Array.from(address.str),
            item.decodedByteArray
          )
        ).to.eql(true)
      })
    })
  })
})
