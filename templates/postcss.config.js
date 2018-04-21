module.exports = {
        sourceMap: true,
        plugins: {
                'postcss-import': {},
                'postcss-cssnext': {
                        browsers: [
                                'defaults',
                                '> 0.5%',
                                'last 2 versions',
                                'Firefox ESR',
                                'ie >= 10',
                                'iOS >= 8',
                                'Android >= 4'
                        ]
                }
        }
}