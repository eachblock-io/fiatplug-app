/** @type {import('next').NextConfig} */


const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swMinify: true,
  disable: false,
  workboxOptions: {
    disableDevLogs: true
  }
})


const nextConfig = {
    images: {
    domains: [
      'api.fiatplug.co',
      // 'staging-api.fiatplug.co',
      'upload.wikimedia.org'
    ],
  },
}

module.exports = withPWA(nextConfig);
