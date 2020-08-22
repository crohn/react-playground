import path from 'path';
import webpack from 'webpack';
import { createConfig } from './webpack/utils';

const context = path.resolve(__dirname);

const options = {
  HTMLTemplate: 'index.html',
  entryFilename: 'index.ts',
  outputDir: 'dist',
  sourceDir: 'src',
};

const configurationFactory: webpack.ConfigurationFactory = (_env, argv) => createConfig(context, argv.mode, options);

export default configurationFactory;
