const { sumTokens2 } = require("../helper/unwrapLPs");
const axios = require("axios");

async function tvl(api) {
  const response = await axios.get("https://api.hyperwavefi.xyz/vaults/999")
  const vaults = response.data.data.vaults;

  const tokens = vaults.map(vault => vault.address);
  const balances = await api.multiCall({ abi: 'uint256:totalSupply', calls: tokens });

  api.addTokens(tokens, balances)
  return sumTokens2({ api })
}

module.exports = {
  hyperliquid: {
    tvl
  },
}