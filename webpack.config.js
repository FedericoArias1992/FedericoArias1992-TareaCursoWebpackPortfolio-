const path = require('path');
const HtmlWebpackPlugin =require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js', //sustituimos el main.js por [name].[contenthash].js para crear el hash cada vez que hacemos le build
    assetModuleFilename: 'assets/images/[hash][ext][query]',
    clean: true, //esto es para borrar los archivos multiples con nombre hash creados cada vez que compilamos
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@utils': path.resolve(__dirname, 'src/utils/'), //Utilizamos alias para referirnos como @utils al folder src/utils (referido al folder FUERA del dist de webpack, sino del directorio original del proyecto fuera de webpack)
      '@templates': path.resolve(__dirname, 'src/templates/'), //Utilizamos alias para referirnos como @templates al folder src/templates
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@images': path.resolve(__dirname, 'src/assets/images/'),
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css|.styl$/i, /*todos los archivos de extension .css o .styl*/
        use: [MiniCssExtractPlugin.loader,
          'css-loader',
          'stylus-loader'
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, /*La Regex para reconocer los png*/
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,  // Tipos de fuentes a incluir
        type: 'asset/resource',  // Tipo de módulo a usar (este mismo puede ser usado para archivos de imágenes)
        generator: {
          filename: "assets/fonts/[hash][ext]",  // Directorio de salida, le agregamos los hash
        },
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,			/*para hacer la insercion de los elementos*/
      template: './public/index.html',	/*p/acceder a la plantilla html	*/
      filename: './index.html'	/*p/ definir el archivo de SALIDA, por standar se usa el miso del template	*/
    }),	/*Funciona asi: agarra el template, lo agrega al compilado de main.js y crea el archivo index.html y lo pega en la carpeta dist junto con main.js*/
    new MiniCssExtractPlugin({
      filename: 'assets/[name].[contenthash].css'
    }),
    new CopyPlugin({
      patterns:[    /*creamos un arreglo y adentro un objeto con dos objetos, desde donde vamos a mover los archivos y hacia a donde los movemos*/
        {
         from: path.resolve(__dirname, "src", "assets/images"),		/*usamos path.resolve para usar el la direccion actual donde esta ubicado el webpack.config.js*/
         to: "assets/images"
        }
      ]}),
      new Dotenv(), //Esto es para leer las variables de entorno (const Dotenv = require('dotenv-webpack');)
  ],
  optimization:{
    minimize: true,
    minimizer: [
      //Instanciamos las dependencias que estamos importando
      new CssMinimizerPlugin(), //optimiza el css
      new TerserPlugin(), //optimiza los JS
    ]
  }
}