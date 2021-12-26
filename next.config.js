/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx']
}

module.exports = withPWA({
  pwa: {
    dest: 'public',
    disable: !isProd
  }
})
