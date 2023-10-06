export function getChainName(id) {
  console.log("id", typeof id, id);
  switch (id) {
    case 1: {
      return "(ETH Mainnet)";
    }

    case 5: {
      return "(Goerli Testnet)";
    }

    case 59140: {
      return "(Linea Goerli Testnet)";
    }

    case 11155111: {
      return "(Spolia Testnet)";
    }

    default:
      return "";
  }
}
