const path = require('path');
const { NODE_ENV, FILE_NAME, TARGET } = process.env;

module.exports = {
    mode: NODE_ENV || 'development',
    entry: [
        './src/index.js',
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: `${FILE_NAME}.${TARGET}${NODE_ENV === 'production' ? '.min' : ''}.js`,
        libraryTarget: TARGET,
    },
};