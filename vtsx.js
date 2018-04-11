"use strict";
exports.__esModule = true;
// Copyright 2017 The HongJiang Library Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 支持Typescript和JSX的Vue腳手架
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-04 $$
var fs = require("fs");
var path = require("path");
var version = '1.0.0';
var tplPath = path.join(__dirname, 'templates');
if (process.argv.length <= 2) {
    var shell = path.basename(process.argv[1]);
    console.log(shell + " build a vue-app that support the typescript and jsx grammar");
    console.log("Version: " + version);
    console.log("Syntsx: " + shell + " name");
    process.exit(0);
}
if (/^[a-zA-Z][a-zA-Z0-9]{0,}$/.test(process.argv[2]) === false) {
    console.log('Name must be alphabetic and numeric and the first character is the letter');
    process.exit(0);
}
var nameLowercase = process.argv[2];
var nameUppercase = nameLowercase.replace(/^[a-zA-Z]/, function (str) { return str.toUpperCase(); });
var distPath = path.resolve('.');
var toLowercase = function (str) { return str.replace(/vtsx/g, nameLowercase); };
var toUppercase = function (str) { return str.replace(/vtsx/g, nameUppercase); };
for (var _i = 0, _a = ['src', 'src/assets', 'src/components', 'src/config', 'src/styles', 'src/typings', 'src/views']; _i < _a.length; _i++) {
    var element = _a[_i];
    var bufPath = path.join(distPath, element);
    if (fs.existsSync(bufPath) === false) {
        fs.mkdirSync(bufPath, 493);
    }
}
Array.apply(void 0, [
    '.babelrc',
    'postcss.config.js',
    'tsconfig.json',
    'tslint.json',
    'webpack.config.js',
    'src/index.html',
    'src/components/index.tsx',
    'src/config/index.tsx',
    'src/config/settings.tsx',
    'src/config/theme.tsx',
    'src/styles/stylesheets.scss',
    'src/styles/variables.scss',
    'src/typings/jsx.d.tsx',
    'src/typings/vue-shims.d.tsx',
    { name: 'package.json', dist: 'package.json', fn: toLowercase },
    { name: 'webpack.dev.js', dist: 'webpack.dev.js', fn: toLowercase },
    { name: 'src/vtsx.d.tsx', dist: "src/" + nameLowercase + ".d.tsx", fn: function (str) { return str; } },
    { name: 'src/vtsx.tsx', dist: "src/" + nameLowercase + ".tsx", fn: toLowercase },
    { name: 'src/config/routes.tsx', dist: 'src/config/routes.tsx', fn: toUppercase },
    { name: 'src/views/Vtsx.tsx', dist: "src/views/" + nameUppercase + ".tsx", fn: toUppercase }
]).forEach(function (element) {
    if (typeof (element) === 'string') {
        element = { name: element, dist: element, fn: function (str) { return str; } };
    }
    var buffers = fs.readFileSync(path.join(tplPath, element.name) + '.tpl').toString();
    fs.writeFileSync(path.join(distPath, element.dist), element.fn(buffers));
});
