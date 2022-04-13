/** @type {import('next').NextConfig} */

const Dotenv = require("dotenv-webpack");

const nextConfig = {
  reactStrictMode: true,
  webpack: config => {
    config.plugins = config.plugins || []
    config.plugins = [
      ...config.plugins,
      // Read the .env file
      new Dotenv({
        path: __dirname+'.env',
        systemvars: true
      })
    ]
    return config
  }
}

module.exports = nextConfig
