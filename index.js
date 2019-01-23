const readline = require('readline');
const io = require('./src/io');

const solicitFileName = `Enter either the (case-sensitive) name of the file in ${process.cwd()} that you'd like to process or
press Enter to normalize sample-with-broken-utf8.csv 
`;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(solicitFileName, processAnswer);

function processAnswer(fileName) {
  io.readAndParseFile(fileName);
  rl.close();
}
