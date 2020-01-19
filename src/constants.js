const generateProtocol = protocol => {
  const protocolByte = new Buffer.alloc(1)

  switch (protocol) {
    case '0': {
      protocolByte[0] = 0
      break
    }
    case '1': {
      protocolByte[0] = 1
      break
    }
    case '2': {
      protocolByte[0] = 2
      break
    }
    case '3': {
      protocolByte[0] = 3
      break
    }
    default: {
      throw Error('Invalid protocol')
    }
  }

  return protocolByte
}

const ID = generateProtocol('0')
const SECP256K1 = generateProtocol('1')
const Actor = generateProtocol('2')
const BLS = generateProtocol('3')

module.exports = {
  ID,
  SECP256K1,
  Actor,
  BLS
}
