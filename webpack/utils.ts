import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';

type ConfigOptions = {
  HTMLTemplate: string;
  entryFilename: string;
  outputDir: string;
  sourceDir: string;
};

type Mode = webpack.Configuration['mode'];
type Rules = webpack.Module['rules'];

const devServer = (mode: Mode) => {
  if (mode === 'production') return undefined;

  return {
    headers: {
      AccessControlAllowOrigin: '*',
    },
  };
};

const plugins = (context: string, { HTMLTemplate, outputDir, sourceDir }: ConfigOptions): webpack.Plugin[] => [
  new ForkTsCheckerWebpackPlugin({
    eslint: {
      files: path.join(context, sourceDir, '**/*.{ts,tsx,js,jsx}'),
    },
    typescript: {
      diagnosticOptions: {
        semantic: true,
        syntactic: true,
      },
    },
  }),
  new HTMLWebpackPlugin({
    template: path.join(context, HTMLTemplate),
    file: path.join(context, outputDir, HTMLTemplate),
  }),
];

const rules = (mode: Mode): Rules => {
  const rules: Rules = [
    {
      test: /\.tsx$/,
      exclude: /node_modules/,
      use: { loader: 'babel-loader' },
    },
    {
      test: /\.html$/,
      use: { loader: 'html-loader' },
    },
  ];

  if (mode === 'development') {
    rules.push({
      test: /\.js$/,
      enforce: 'pre',
      use: ['source-map-loader'],
    });
  }

  return rules;
};

export const createConfig = (context: string, mode: Mode, options: ConfigOptions): webpack.Configuration => ({
  devServer: devServer(mode),

  devtool: mode === 'production' ? false : 'source-map',

  entry: {
    index: path.join(context, options.entryFilename),
  },

  module: {
    rules: rules(mode),
  },

  output: {
    filename: mode === 'production' ? '[name].[hash].js' : '[name].js',
    path: path.join(context, options.outputDir),
  },

  plugins: plugins(context, options),

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
});
