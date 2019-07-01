const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlPlugin = require("html-webpack-plugin")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

const path = require("path")

module.exports = (env, argv) => {
    const mode = argv.mode || "development"
    const production = argv.mode === "production"

    var config = {
        context: __dirname,
        entry: "./apps/index.jsx",
        output: {
            filename: production ? "[name].[chunkhash:8].js" : "[name].js",
            path: path.resolve(__dirname, "dist", mode),
            publicPath: "/"
        },
        devServer: {
            compress: true,
            contentBase: path.resolve(__dirname, "dist", mode),
            publicPath: "/",
            hot: true,
            inline: true,
            overlay: {
                errors: true,
                warnings: true
            },
            port: 9200,
            proxy: {},
            writeToDisk: true
        },
        devtool: production ? false : "eval-source-map",
        resolve: {
            alias: {
                Apps: path.resolve(__dirname, "apps"),
                Components: path.resolve(__dirname, "components"), 
                Styles: path.resolve(__dirname, "styles"), 
                Util: path.resolve(__dirname, "util")
            },
            extensions: [".jsx", ".js", ".json", "scss", "css", "*"]
        },
        target: "web",
        module: {
            rules: [{
                test: /\.jsx?$/,
                loader: "babel-loader",
                options: {babelrc: false, cacheDirectory: true, presets: ["@babel/react"]}
            }, 
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    production ? MiniCssExtractPlugin.loader : "style-loader", 
                    {
                        loader: "css-loader", 
                        options: {
                            localsConvention: "camelCase",
                            importLoaders: 1, 
                            modules: true
                        }
                    }, 
                    {
                        loader: "sass-loader", 
                        options: {sourceMap: true}
                    }
                ]
            }, 
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {loader: "url-loader", options: {limit: 8192}},
                    {loader: "file-loader", options: {limit: 8192}}
                ]
            }]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({filename: production ? "[name].[hash:8].css" : "[name].css"}),
            new HtmlPlugin({
                title: "test-react-webpack",
                filename: "index.html",
                template: "./templates/index.html"
            })
        ],
        optimization: {
            minimizer: [
                // new UglifyJsPlugin({cache: true, parallel: true}),
                new OptimizeCSSAssetsPlugin({})
            ],
            splitChunks: {
                chunks: "all",
                name: "bundle"
            }
        },
        stats: {
            children: false
        }
    }


    // Object.keys(config.entry).map((chunk) => {
    //     config.plugins.push(new HtmlPlugin({
    //         chunks: ["bundle", chunk],
    //         filename: path.join("..", `${chunk}.html`),
    //         // favicon: "./assets/favicon.ico",
    //         template: "./templates/index.html"
    //     }))
    // })

    return config
}

