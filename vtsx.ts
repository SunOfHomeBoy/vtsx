// Copyright 2017 The HongJiang Library Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 支持Typescript和JSX的Vue腳手架
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-04 $$
import * as fs from 'fs'
import * as path from 'path'

export function main() {
        const version: string = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json')).toString()).version
        const tplPath: string = path.join(__dirname, 'templates')

        if (process.argv.length <= 2) {
                let shell = path.basename(process.argv[1])
                console.log(`${shell} build a vue-app that support the typescript and jsx grammar`)
                console.log(`Version: ${version}`)
                console.log(`Syntsx: ${shell} name [--less|--sass]`)
                process.exit(0)
        }

        if (/^[a-zA-Z][a-zA-Z0-9]{0,}$/.test(process.argv[2]) === false) {
                console.log('Name must be alphabetic and numeric and the first character is the letter')
                process.exit(0)
        }

        const nameLowercase: string = process.argv[2]
        const nameUppercase: string = nameLowercase.replace(/^[a-zA-Z]/, (str: string) => str.toUpperCase())
        const optStylesheet: string = String(process.argv[3] || '--less').toLowerCase()
        const distPath: string = path.resolve('.')

        const toLowercase = (str: string): string => str.replace(/vtsx/g, nameLowercase)
        const toUppercase = (str: string): string => str.replace(/vtsx/g, nameUppercase)

        for (let element of ['src', 'src/assets', 'src/components', 'src/config', 'src/styles', 'src/typings', 'src/views']) {
                let bufPath = path.join(distPath, element)

                if (fs.existsSync(bufPath) === false) {
                        fs.mkdirSync(bufPath, 0o755)
                }
        }

        Array(...[
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
                optStylesheet === '--sass'
                        ? 'src/styles/stylesheets.scss'
                        : 'src/styles/stylesheets.less',
                optStylesheet === '--sass'
                        ? 'src/styles/variable.scss'
                        : 'src/styles/variable.less',
                //'src/typings/jsx.d.tsx',
                //'src/typings/vue-shims.d.tsx',
                optStylesheet === '--sass'
                        ? { name: 'package-sass.json', dist: 'package.json', fn: str => str.replace(/NAME/g, nameLowercase) }
                        : { name: 'package-less.json', dist: 'package.json', fn: str => str.replace(/NAME/g, nameLowercase) },
                { name: 'webpack.dev.js', dist: 'webpack.dev.js', fn: toLowercase },
                { name: 'src/vtsx.d.tsx', dist: `src/${nameLowercase}.d.tsx`, fn: str => str.replace('../../', '../') },
                optStylesheet === '--sass'
                        ? { name: 'src/vtsx-sass.tsx', dist: `src/${nameLowercase}.tsx`, fn: toLowercase }
                        : { name: 'src/vtsx-less.tsx', dist: `src/${nameLowercase}.tsx`, fn: toLowercase },
                { name: 'src/config/routes.tsx', dist: 'src/config/routes.tsx', fn: toUppercase },
                { name: 'src/views/Vtsx.tsx', dist: `src/views/${nameUppercase}.tsx`, fn: toUppercase }
        ]).forEach((element: any) => {
                if (typeof (element) === 'string') {
                        element = { name: element, dist: element, fn: str => str }
                }

                let buffers = fs.readFileSync(path.join(tplPath, element.name)).toString()
                fs.writeFileSync(path.join(distPath, element.dist), element.fn(buffers))
        })
}
