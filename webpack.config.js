const path=require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports = {
    mode: 'development',
    entry: {
        index :'./src/index.js',
        //photographer :'./src/photographer.js',
    },
    output :{
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css', 
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                //exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                    presets: ['@babel/preset-env']
                    }
                },
                test: /\.s[ac]ss$/i, // Sass files
                use: [
                    {
                        loader : MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "../sass/",
                        }, // Extrayez le CSS dans un fichier séparé
                    },
                    'css-loader', // Charge les fichiers CSS dans le JavaScript
                    {
                        loader: 'postcss-loader',
                        options: {
                          postcssOptions: {
                            plugins: [
                              "autoprefixer",
                            ]
                          },
                        }
                    },
                    'sass-loader', // Compile Sass en CSS
                ],
            },
        ],
    },
    
}