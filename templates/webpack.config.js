const fs = require('fs')
const os = require('os')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const Visualizer = require('webpack-visualizer-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const { getIfUtils, removeEmpty } = require('webpack-config-utils')
const { ifProduction, ifNotProduction } = getIfUtils(process.env.NODE_ENV || 'development')

module.exports = function (webpackConfig) {
        const outDir = webpackConfig.outDir || __dirname
        const distDir = path.join(outDir, webpackConfig.distDir || 'dist')

        const jsFileName = webpackConfig.chunkhash
                ? 'js/[name].[chunkhash].js'
                : 'js/[name].min.js'
        const cssFileName = webpackConfig.chunkhash
                ? 'css/[name].[chunkhash].css'
                : 'css/[name].min.css'
        const cfgFonts = webpackConfig.chunkhash
                ? '&outputPath=fonts/&publicPath=../fonts'
                : '&outputPath=fonts/&publicPath=../fonts&name=[name].[ext]'
        const cfgTheme = typeof (webpackConfig.theme) === 'object'
                ? webpackConfig.theme
                : {}
        const clsHash = webpackConfig.clsHash
                ? '&modules&localIdentName=[local]___[hash:base64:5]'
                : ''
        var cfgThemeSass = []
        for (var key in cfgTheme) { cfgThemeSass.push('$' + `${key}:${cfgTheme[key]};`) }

        if (typeof (webpackConfig.entry) === 'string') {
                webpackConfig.entry = {
                        main: webpackConfig.entry
                }
        }
        for (var field in webpackConfig.entry) {
                webpackConfig.entry[field] = path.resolve(path.join((webpackConfig.rootDir || 'src'), webpackConfig.entry[field]))
        }

        var resolveModules = [path.join(outDir, 'node_modules')]
        resolveModules.push(...(webpackConfig.modules || []))

        return {
                entry: webpackConfig.entry || {},
                output: {
                        path: distDir,
                        filename: jsFileName,
                        chunkFilename: jsFileName
                },
                resolve: {
                        modules: resolveModules,
                        extensions: [
                                '.js',
                                '.jsx',
                                '.ts',
                                '.tsx',
                                '.vue',
                                '.css',
                                '.less',
                                '.scss',
                                '.html',
                                '.json'
                        ],
                        alias: {
                                'vue$': 'vue/dist/vue.common.js'
                        }
                },
                externals: webpackConfig.externals || {},
                module: {
                        noParse: [/moment.js/],
                        rules: [
                                {
                                        test: /\.vue$/,
                                        loader: 'vue-loader'
                                },
                                {
                                        test: /\.tsx?$/,
                                        exclude: /node_modules/,
                                        use: [
                                                'babel-loader',
                                                {
                                                        loader: 'ts-loader',
                                                        options: {
                                                                appendTsSuffixTo: [/\.vue$/]
                                                        }
                                                }
                                        ]
                                },
                                {
                                        test: /\.js$/,
                                        loader: 'babel-loader?presets=es2015',
                                        exclude: /node_modules/
                                },
                                {
                                        test: /\.jsx$/,
                                        loader: 'babel-loader'
                                },
                                {
                                        test: function (file) {
                                                return /\.css$/.test(file) && !/\.module\.css$/.test(file)
                                        },
                                        loader: ExtractTextPlugin.extract([
                                                'css-loader?sourceMap&-restructuring&-autoprefixer',
                                                'postcss-loader'
                                        ])
                                },
                                {
                                        test: /\.module\.css$/,
                                        loader: ExtractTextPlugin.extract([
                                                'css-loader?sourceMap&-restructuring&modules&localIdentName=[local]___[hash:base6' +
                                                '4:5]&-autoprefixer',
                                                'postcss-loader'
                                        ])
                                },
                                {
                                        test: /\.less$/,
                                        loader: ExtractTextPlugin.extract([
                                                `css-loader?sourceMap&-restructuring&modules${clsHash}&-autoprefixer`,
                                                'postcss-loader',
                                                `less-loader?{'modifyVars':${JSON.stringify(cfgTheme)}}`
                                        ])
                                },
                                {
                                        test: /\.scss$/,
                                        loader: ExtractTextPlugin.extract([
                                                `css-loader?sourceMap&-restructuring${clsHash}&-autoprefixer`,
                                                'postcss-loader',
                                                `sass-loader?{'data':'${cfgThemeSass.join('')}'}`
                                        ])
                                },
                                {
                                        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                                        loader: `url-loader?limit=10000&minetype=application/font-woff${cfgFonts}`
                                },
                                {
                                        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                                        loader: `url-loader?limit=10000&minetype=application/font-woff${cfgFonts}`
                                },
                                {
                                        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                                        loader: `url-loader?limit=10000&minetype=application/octet-stream${cfgFonts}`
                                },
                                {
                                        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                                        loader: `url-loader?limit=10000&minetype=application/application/vnd.ms-fontobject${cfgFonts}`
                                },
                                {
                                        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                                        loader: `url-loader?limit=10000&minetype=image/svg+xml${cfgFonts}`
                                },
                                {
                                        test: function (file) {
                                                return /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i.test(file) && !/QRCode\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i.test(file)
                                        },
                                        loader: 'url-loader?limit=10000'
                                },
                                {
                                        test: /QRCode\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
                                        loader: 'url-loader?limit=100000'
                                },
                                {
                                        test: /\.json$/,
                                        loader: 'json-loader?limit=100000'
                                }
                        ]
                },
                optimization: {
                        splitChunks: webpackConfig.bundle ? {
                                cacheGroups: {
                                        commons: {
                                                test: /[\\/]node_modules[\\/]/,
                                                name: 'bundle',
                                                chunks: "all"
                                        }
                                }
                        } : {}
                },
                plugins: removeEmpty([
                        new HtmlWebpackPlugin({
                                template: (webpackConfig.rootDir || 'src') + '/' + (webpackConfig.html || 'index.html'),
                                filename: webpackConfig.html || 'index.html',
                                minify: {
                                        html5: true,
                                        collapseWhitespace: true
                                }
                        }),
                        new webpack.LoaderOptionsPlugin({
                                minimize: process.env.NODE_ENV === 'production',
                                debug: process.env.NODE_ENV !== 'production',
                                options: {
                                        'html-minify-loader': {}
                                }
                        }),
                        new webpack.DefinePlugin({
                                'process.env': {
                                        'production': (process.env.NODE_ENV === 'production')
                                }
                        }),
                        new ExtractTextPlugin({ filename: cssFileName, disable: false, allChunks: true }),
                        new CaseSensitivePathsPlugin(),
                        new CopyWebpackPlugin([{
                                from: (webpackConfig.rootDir || 'src') + '/assets',
                                to: distDir
                        }]),
                        ifProduction(new Visualizer()),
                        ifProduction(new webpack.optimize.OccurrenceOrderPlugin(false)),
                        ifProduction(new UglifyJSPlugin({
                                uglifyOptions: {
                                        compress: {
                                                warnings: false,
                                                conditionals: true,
                                                unused: true,
                                                comparisons: true,
                                                sequences: true,
                                                dead_code: true,
                                                evaluate: true,
                                                if_return: true,
                                                join_vars: true
                                        },
                                        output: {
                                                comments: false
                                        }
                                }
                        }))
                ]),
                devServer: {
                        contentBase: distDir,
                        host: '0.0.0.0',
                        port: 8000,
                        compress: true
                }
        }
}