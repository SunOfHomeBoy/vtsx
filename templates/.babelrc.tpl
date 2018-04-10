{
        "presets": [
                "es2015",
                "stage-2",
                "env"
        ],
        "plugins": [
                "babel-plugin-add-module-exports",
                "babel-plugin-transform-decorators-legacy",
                "babel-plugin-syntax-dynamic-import",
                "babel-plugin-transform-vue-jsx",
                [
                        "babel-plugin-transform-runtime",
                        {
                                "helpers": true,
                                "polyfill": true
                        }
                ],
                [
                        "component"
                ]
        ]
}