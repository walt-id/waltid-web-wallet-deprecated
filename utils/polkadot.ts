const { decodeAddress, encodeAddress } = require("@polkadot/keyring");
const { hexToU8a, isHex } = require("@polkadot/util");

const isValidPolkadotAddress = (address: String) => {
  try {
    encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address));

    return true;
  } catch (error) {
    return false;
  }
};

export default isValidPolkadotAddress;
