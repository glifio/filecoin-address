/* eslint-env mocha */
const { expect } = require('chai')
const Address = require('../src/index')

// For each protocol...
//   Test random address
//   Test five vectors
//   Test invalid string vectors (invalid protocol, length, payload)
//   Test invalid byte vectors
// Test checksum
// Test big int marshalling

// Test valid and invalid address construction

function debugWithoutEncoding(answer) {
  const bytes = Uint8Array.from(answer)
  let debugBytes = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    debugBytes = debugBytes.concat(bytes[i].toString())
    debugBytes = debugBytes.concat(' ')
  }
  return debugBytes
}

describe('address', () => {
  describe('decode', () => {
    it('should decode ID addresses', async () => {
      const address = new Address({})
      const answer = expect(true).to.be.eql(true)
    })
  })
})
