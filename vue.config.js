// vue.config.js
module.exports = {
    css: {
        extract: false
    },
    lintOnSave: false,
    pwa: {
        name: 'Šmírka',
        themeColor: '#F2F2F2',
        msTileColor: '#F2F2F2',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        iconPaths: {
            favicon32: '/gfx/smirka.png',
            favicon16: '/gfx/smirka.png',
            appleTouchIcon: '/gfx/smirka.png',
            maskIcon: '/gfx/smirka.png',
            msTileImage: '/gfx/smirka.png'
        },

        // configure the workbox plugin
        workboxPluginMode: 'GenerateSW',
        workboxOptions: {
            include: [/\.html$/, /\.js$/, /js\/\.js$/, /\.json$/, /gfx\/\.png$/]
        },
        manifestOptions: {
            display: "standalone",
            start_url: "/",
        }
    }
};