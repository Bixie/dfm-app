const ZipWebpackPlugin = require('zip-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

const vueConfig = {
    publicPath: isProduction ? '/media/mod_dfm_app' : '/dfm-app',
    outputDir: isProduction ? 'mod_dfm_app' : 'dist',
    assetsDir: isProduction ? 'assets' : './',
    indexPath: isProduction ? 'tmpl/default.php' : 'index.html',
    devServer: {
        proxy: {
            'index.php': {
                target: 'http://www.enterergodics-test.com',
                changeOrigin: true,
                pathRewrite: {
                },
            },
        },
    },
    css: {
        sourceMap: true,
    },
};

//set custom page to compile to Joomla Module
if (isProduction) {
    vueConfig.pages = {
        index: {
            entry: 'src/main.js',
            template: 'module/tmpl/default.ejs',
            filename: 'tmpl/default.php',
            title: 'Module template',
            inject: false,
            appMountId: 'app',
        },
    };
    vueConfig.chainWebpack = config => {
        if (isProduction) {
            //copy module bootstrapping
            config.plugin('copy').tap(args => {
                args[0].patterns[0].from = 'module';
                args[0].patterns[0].globOptions = {ignore: ['tmpl/default.ejs',],};
                return args;
            });
            //copy images
            config.plugin('copy-images').use(CopyWebpackPlugin, [{
                patterns: [{
                    from: 'public/images',
                    to: 'assets/images',
                },],
            },]);
            //create zip
            config.plugin('zip-module').use(ZipWebpackPlugin, [{
                path: '../dist',
                filename: 'mod_dfm_app.zip',
                pathPrefix: 'mod_dfm_app',
            },]);
        }
    }
}

module.exports = vueConfig;
