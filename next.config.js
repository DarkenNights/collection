/** @type {import('next').NextConfig} */
const path = require('path')
module.exports = {
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    images: {
        domains: ['popuniversecollection.s3.eu-west-3.amazonaws.com'],
    },
}
