const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');


module.exports = (env) => {
    const isProduction = env.production === true;
    const platflorm = env.platform;

    // Vendor packages
    const vendorPackages = [
        'lodash',
        'react-router-dom'
    ];
    const vendorCDNPackages = {
        'react': 'React',
        'react-dom': 'ReactDOM'
    };

    // Loader constants
    const urlLoaderSizeLimit = 32000; // 32kb

    return {
        entry: {
            app: './src/js/index.js',
            vendor: vendorPackages
        },
        externals: vendorCDNPackages,
        output: {
            path: path.resolve(__dirname, 'dist/static'),
            publicPath: isProduction ? 'static/' : '/',
            pathinfo: false, // No verbose comments
            filename: isProduction ? '[name].[chunkhash].js' : '[name].js',
        },
        module: {
            rules: [
                // .js
                {
                    test: /\.(js|jsx)$/,
                    use: 'babel-loader',
                    exclude: /node_modules/
                },
                // .css
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                /*modules: true, // TODO: implement CSS modules
                                localIdentName: '[chunkhash]'*/
                                importLoaders: 1
                            }
                        },
                        'postcss-loader'
                    ],
                    exclude: /node_modules/
                },
                // Images
                {
                    test: /\.(png|jpg|gif)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: urlLoaderSizeLimit,
                            name: isProduction ? 'assets/[chunkhash].[ext]' : 'assets/[name].[ext]'
                        }
                    }, //`url-loader?limit=${urlLoaderSizeLimit}&name=assets/[chunkhash].[ext]`,
                    exclude: /node_modules/
                },
                // Texts (raw files)
                {
                    test: /\.txt$/,
                    use: 'raw-loader',
                    exclude: /node_modules/
                },

            ]
        },
        plugins: [
            // UglifyJS
            new webpack.optimize.UglifyJsPlugin({}),
            // CommonsChunk
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: Infinity
            }),
            // Manifest codes // TODO: implement
            /*
            // Manifest (matches compilation file names)
            new ManifestPlugin(),
            // Chunk manifest (extract manifest to a .json)
            new ChunkManifestPlugin({
                filename: 'chunk-manifest.json',
                manifestVariable: 'webpackManifest'
            }),
            // Inline the chunk manifest in our HTML
            new AssetsPlugin({
                path: path.resolve(__dirname, 'dist/static'),
                includeManifest: 'chunk-manifest',
                prettyPrint: true
            }),
            */
            // HTML creation
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src/template.html'),
                filename: '../home.html'
            }),
        ],
        resolve: {
            modules: [
                path.resolve(__dirname, 'src'),
                'node_modules'
            ]
        },
        devServer: {
            contentBase: './src'
        },
        // devtool: 'source-map'
    };
};