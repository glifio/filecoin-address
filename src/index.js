/* eslint-disable radix,prefer-const */
const varint = require('varint')
const { blake2b } = require('blakejs')
const base32Function = require('./base32')

const base32 = base32Function('abcdefghijklmnopqrstuvwxyz234567')

let newAddress
let decode
let encode
let bigintToArray
let getChecksum
let validateChecksum
let newFromString

class Address {
  constructor({ str }) {
    if (!str) throw new Error('Missing str in address')
    this.str = str
  }

  protocol = () => {
    if (this.str.length < 1) {
      return Error('No address found.')
    }
    return this.str[0]
  }

  payload = () => {
    if (this.str.length < 1) {
      return Error('No address found.')
    }
    return this.str.slice(1, this.str.length)
  }
}

bigintToArray = v => {
  // eslint-disable-next-line no-undef
  let tmp = BigInt(v).toString(16)
  if (tmp.length % 2 === 1) tmp = `0${tmp}`
  return Buffer.from(tmp, 'hex')
}

getChecksum = ingest => {
  return blake2b(ingest, null, 4)
}

validateChecksum = (ingest, expect) => {
  const digest = getChecksum(ingest)
  return Buffer.compare(Buffer.from(digest), expect)
}

newAddress = (protocol, payload) => {
  const protocolByte = new Buffer.alloc(1)
  protocolByte[0] = protocol

  return new Address({
    str: Buffer.concat([protocolByte, payload])
  })
}

decode = address => {
  const protocol = address.slice(1, 2)
  const protocolByte = new Buffer.alloc(1)
  protocolByte[0] = protocol
  const raw = address.substring(2, address.length)

  if (protocol === '0') {
    return newAddress(protocol, Buffer.from(varint.encode(parseInt(raw))))
  }

  const payloadChecksum = new Buffer.from(base32.decode(raw))
  const { length } = payloadChecksum
  const payload = payloadChecksum.slice(0, length - 4)
  const checksum = payloadChecksum.slice(length - 4, length)
  if (validateChecksum(Buffer.concat([protocolByte, payload]), checksum)) {
    throw Error("Checksums don't match")
  }

  return newAddress(protocol, payload)
}

encode = (network, address) => {
  if (!address || !address.str) throw Error('Invalid address')
  let addressString = ''
  const payload = address.payload()

  switch (address.protocol()) {
    case 0: {
      const int = varint.decode(address.payload())
      addressString = network + String(address.protocol()) + int
      break
    }
    default: {
      const protocolByte = new Buffer.alloc(1)
      protocolByte[0] = address.protocol()
      const checksum = getChecksum(Buffer.concat([protocolByte, payload]))
      const bytes = Buffer.concat([payload, Buffer.from(checksum)])
      addressString =
        String(network) + String(address.protocol()) + base32.encode(bytes)
      break
    }
  }

  return addressString
}

newFromString = address => {
  return decode(address)
}

module.exports = {
  Address,
  validateChecksum,
  bigintToArray,
  newAddress,
  decode,
  encode,
  newFromString,
  getChecksum
}
