process.env.BABEL_ENV = 'test'; // activa istanbul (cobertura) en .babelrc

const fs = require('fs');

// Si no hay CHROME_BIN definido, usa Chrome o Edge (Edge es Chromium)
const navegadores = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
];
if (!process.env.CHROME_BIN) {
  const binario = navegadores.find((ruta) => fs.existsSync(ruta));
  if (binario) process.env.CHROME_BIN = binario;
}

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'webpack'],

    // Dos patrones sin llaves {} (evita el error 'mtime' en Windows)
    files: [
      { pattern: 'src/**/*.spec.js', watched: false },
      { pattern: 'src/**/*.spec.jsx', watched: false },
    ],
    preprocessors: {
      'src/**/*.spec.js': ['webpack'],
      'src/**/*.spec.jsx': ['webpack'],
    },

    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      module: {
        rules: [
          { test: /\.(js|jsx)$/, exclude: /node_modules/, use: 'babel-loader' },
          { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        ],
      },
      resolve: { extensions: ['.js', '.jsx'] },
    },

    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'coverage/',
      reporters: [{ type: 'html' }, { type: 'text-summary' }],
    },

    browsers: ['ChromeHeadless'],
    singleRun: true,
  });
};