function walletAddressFormat(address) {
  if (address)
    return `${address.slice(0, 5)}...${address.slice(
      address.length - 4,
      address.length
    )}`;
  else return "";
}

export default walletAddressFormat;
