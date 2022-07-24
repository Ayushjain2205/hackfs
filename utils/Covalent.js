const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const contractAddress = "0x8383Ce044A10eEF38f6092F29AE77aEAc4e2Ec90";

module.exports = async (app) => {
  const API_KEY = process.env.COVALENT_API_KEY;
  const chainId = 137;

  // Get all Utility NFTs by contract address
  app.getNFTTokenIdsForContract = async () => {
    const response = await axios.get(
      `https://api.covalenthq.com/v1/${chainId}/tokens/${contractAddress}/nft_token_ids/?&key=${API_KEY}`,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    console.log(response.data.data.items);
    return response.data;
  };

  // Get all Utility NFT Transactions
  app.getNFTTransactionsForContract = async (tokenId) => {
    const response = await axios.get(
      `https://api.covalenthq.com/v1/${chainId}/tokens/${contractAddress}/nft_transactions/${tokenId}/?&key=${API_KEY}`,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    console.log(response.data.data.items);
    return response.data;
  };

  // Get additional utility NFT information
  app.getNFTExternalMetadataForContract = async (tokenId) => {
    const response = await axios.get(
      `https://api.covalenthq.com/v1/${chainId}/tokens/${contractAddress}/nft_metadata/${tokenId}/?&key=${API_KEY}`,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    console.log(response.data.data.items);
    return response.data;
  };

  // Get all utility NFT info
  app.getNFTMarketGlobalView = async (chain) => {
    const response = await axios.get(
      `https://api.covalenthq.com/v1/${chain}/nft_market/?&key=${API_KEY}`,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    console.log(response);
    return response.data;
  };

  // Get previous ownership details
  app.getHistoricalDataForNFTCollection = async (chain, collectionAddress) => {
    const response = await axios.get(
      `https://api.covalenthq.com/v1/${chain}/nft_market/collection/${collectionAddress}/?&key=${API_KEY}`,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    console.log(response);
    return response.data;
  };
};
Footer;
