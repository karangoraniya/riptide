/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    TRON_FULL_NODE: process.env.TRON_FULL_NODE,
    TRON_SOLIDITY_NODE: process.env.TRON_SOLIDITY_NODE,
    TRON_EVENT_SERVER: process.env.TRON_EVENT_SERVER,
    TRON_PRIVATE_KEY: process.env.TRON_PRIVATE_KEY,
    TRX_CONTRACT_ADDRESS: process.env.TRX_CONTRACT_ADDRESS,
    FASTAPI_URL: process.env.FASTAPI_URL,
    NFT_SMARTCONTRACT_ADDRESS: process.env.NFT_SMARTCONTRACT_ADDRESS,
    BTFS_RSA_URL: process.env.BTFS_RSA_URL,
    MINT_METHOD_NAME: process.env.MINT_METHOD_NAME,
  },
  images: {
    domains: ['cdn.discordapp.com','media.discordapp.net'],
  },
}

export default nextConfig