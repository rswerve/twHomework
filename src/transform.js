const moment = require('moment-timezone');

let durations = [];

function normalize(value, id) {
  if (id.toUpperCase() === 'TIMESTAMP') {
    return convertTimestamp(value);
  }
  if (id.toUpperCase() === 'ZIP') {
    return convertZipCode(value);
  }
  if (id.toUpperCase() === 'FULLNAME') {
    return convertFullName(value);
  }
  if (id.toUpperCase() === 'FOODURATION' || id.toUpperCase() === 'BARDURATION') {
    return convertDurations(value);
  }
  if (id.toUpperCase() === 'TOTALDURATION') {
    return convertTotalDuration();
  }
  return value;
}

function convertTimestamp(time) {
  // set zone of timestamp or moment.js will assume local system zone
  const timeWithPacificTimezone = moment.tz(time, 'MM/DD/YY hh:mm:ss A', 'America/Los_Angeles');
  return moment(timeWithPacificTimezone).tz('America/New_York').toISOString(true);
}

function convertZipCode(zip) {
  const ZIP_LENGTH = 5;
  return zip.padStart(ZIP_LENGTH, '0');
}

function convertFullName(name) {
  return name.toUpperCase();
}

function convertDurations(time) {
  const valueToSeconds = moment.duration(time).asSeconds();
  durations.push(valueToSeconds);
  return valueToSeconds;
}

function convertTotalDuration() {
  const sum = durations.reduce((acc, val) => acc + val, 0);
  // reset durations before processing the next row
  durations = [];
  return sum;
}

module.exports = {
  normalize,
  convertTimestamp,
  convertZipCode,
  convertFullName,
  convertDurations,
  convertTotalDuration,
  durations,
};
