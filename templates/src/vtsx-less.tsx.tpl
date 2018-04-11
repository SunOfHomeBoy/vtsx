/// <reference path="vtsx.d.tsx" />
import Vue from 'vue'
import VueRouter from 'vue-router'
import initBrowsers from 'init-browsers'
import { settings, routes, theme } from './config'
import './styles/stylesheets.less'

export default function vtsxMain() {
        Vue.config.devtools = settings.debug
        Vue.use(VueRouter)

        let router = new VueRouter({ routes, mode: settings.history ? 'history' : 'hash' })
        router.beforeEach(({ path, meta }, from, next) => {
                next()
        })

        initBrowsers(Object.assign(theme, {}))
        new Vue({ router }).$mount('#' + settings.appID)
}

if (typeof (process.env.production) !== 'undefined') {
        vtsxMain()
}