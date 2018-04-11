{
        "name": "vtsx",
        "version": "1.0.0",
        "description": "",
        "keywords": [],
        "private": true,
        "author": "",
        "license": "Apache-2.0",
        "repository": {
                "type": "git",
                "url": "git+https://"
        },
        "scripts": {
                "dev": "./node_modules/.bin/clear && ./node_modules/.bin/cross-env NODE_ENV=development ./node_modules/.bin/webpack-dev-server --mode development --config webpack.dev.js",
                "build": "./node_modules/.bin/clear && ./node_modules/.bin/rimraf ./dist && ./node_modules/.bin/cross-env NODE_ENV=production ./node_modules/.bin/webpack --mode production --config webpack.dev.js"
        },
        "dependencies": {
                "@types/axios": "^0.14.0",
                "@types/node": "^7.0.60",
                "@types/vue": "^2.0.0",
                "@types/vue-router": "^2.0.0",
                "vue": "^2.5.16",
                "vue-router": "^3.0.1",
                "axios": "^0.18.0",
                "init-browsers": "^1.2.6"
        },
        "devDependencies": {
                "clear-cli": "^1.0.1",
                "cross-env": "^5.1.4",
                "autoprefixer": "^8.1.0",
                "autoprefixer-loader": "^3.2.0",
                "awesome-typescript-loader": "^4.0.1",
                "babel-core": "^6.26.0",
                "babel-helper-vue-jsx-merge-props": "^2.0.3",
                "babel-loader": "^7.1.4",
                "babel-plugin-add-module-exports": "^0.2.1",
                "babel-plugin-component": "^1.1.0",
                "babel-plugin-import": "^1.6.5",
                "babel-plugin-syntax-jsx": "^6.18.0",
                "babel-plugin-syntax-dynamic-import": "^6.18.0",
                "babel-plugin-transform-vue-jsx": "^3.7.0",
                "babel-plugin-transform-decorators-legacy": "^1.3.4",
                "babel-plugin-transform-object-assign": "^6.22.0",
                "babel-plugin-transform-runtime": "^6.22.0",
                "babel-polyfill": "^6.26.0",
                "babel-preset-env": "^1.6.1",
                "babel-preset-es2015": "^6.24.1",
                "babel-preset-react": "^6.24.1",
                "babel-preset-stage-0": "^6.24.1",
                "babel-preset-stage-2": "^6.24.1",
                "babel-runtime": "^6.26.0",
                "case-sensitive-paths-webpack-plugin": "^2.1.1",
                "copy-webpack-plugin": "^4.5.0",
                "css-loader": "^0.28.10",
                "extract-text-webpack-plugin": "^4.0.0-beta.0",
                "file-loader": "^1.1.11",
                "html-minifier": "^3.5.10",
                "html-minifier-loader": "^1.4.0",
                "html-webpack-plugin": "^3.0.6",
                "json-loader": "^0.5.7",
                "less": "^3.0.1",
                "less-loader": "^4.0.6",
                "less-plugin-npm-import": "^2.1.0",
                "map-json-webpack-plugin": "^1.2.0",
                "postcss": "^6.0.19",
                "postcss-cssnext": "^3.1.0",
                "postcss-import": "^11.1.0",
                "postcss-loader": "^2.1.1",
                "sass-loader": "^6.0.7",
                "node-sass": "^4.7.2",
                "rimraf": "^2.6.2",
                "source-map": "^0.7.2",
                "source-map-loader": "^0.2.3",
                "style-loader": "^0.20.2",
                "svg-sprite-loader": "^3.6.2",
                "ts-loader": "^4.0.1",
                "tslint": "^5.9.1",
                "tslint-loader": "^3.6.0",
                "typescript": "^2.7.2",
                "uglifyjs-webpack-plugin": "^1.2.2",
                "url-loader": "^1.0.1",
                "vue-class-component": "^6.2.0",
                "vue-loader": "^14.1.1",
                "vue-property-decorator": "^6.0.0",
                "vue-template-compiler": "^2.5.13",
                "vue-tsx-support": "^1.2.0",
                "webpack": "^4.1.0",
                "webpack-cli": "^2.0.10",
                "webpack-config-utils": "^2.3.0",
                "webpack-dev-server": "^3.1.0",
                "webpack-node-externals": "^1.6.0",
                "webpack-visualizer-plugin": "^0.1.11"
        }
}