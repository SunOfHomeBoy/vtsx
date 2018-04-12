const webpackConfigure = require('./webpack.config')

module.exports = webpackConfigure({
        entry: {
                'vtsx': 'vtsx.tsx'
        }
})