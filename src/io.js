const Papa = require('papaparse');
const fsp = require('fs').promises;
const moment = require('moment-timezone');
const transform = require('../src/transform');

const UTF8_ENCODING = 'utf8';
const results = [];

const papaConfig = {
  header: true,
  encoding: UTF8_ENCODING,
  step: processNormalizedRow,
  complete: onComplete,
  error: onError,
  skipEmptyLine: true,
  transform: transform.normalize,
};

function readAndParseFile(fileName) {
  const pathToFile = fileName ? `./${fileName}` : './sample-with-broken-utf8.csv';
  fsp.readFile(pathToFile, UTF8_ENCODING)
    .then((data) => {
      console.info(`Processing ${pathToFile}`);
      Papa.parse(data, papaConfig);
    })
    .catch((error) => {
      console.error(`There was a problem opening ${pathToFile}: ${error}`);
    });
}

function processNormalizedRow(row) {
  const error = row.errors[0];
  if (error) {
    console.error(`Row ${error.row} was dropped due to: ${error.message}`);
  } else {
    results.push(row.data[0]);
  }
}

function onComplete() {
  const dataToExport = Papa.unparse(results);
  const outputFolder = `${process.cwd()}/output`;
  const outputFileName = `Normalized_${moment().format('YYYY.MM.D_hh.mm.ssa')}.csv`;
  const outputPath = `${outputFolder}/${outputFileName}`;
  fsp.writeFile(outputPath, dataToExport, UTF8_ENCODING)
    .then(() => {
      console.info(`SUCCESS: ${outputFileName} generated in ${process.cwd()}/output.`);
    })
    .catch((error) => {
      console.error(`Failed to write csv file with error: ${error}`);
    });
}

function onError(error) {
  console.error(`PapaParse error: ${error}`);
}

module.exports = { readAndParseFile };
