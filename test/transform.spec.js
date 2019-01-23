const moment = require('moment-timezone');

beforeEach(() => {
    jest.resetModules();
});

test('convertTimeStamp should treat times with indeterminate timezones as Pacific and return them as ISO-8601 Eastern', () => {
    const transform = require('../src/transform');
    const input = '2/29/16 12:11:11';
    expect(transform.convertTimestamp(input)).toEqual('2016-02-29T15:11:11.000-05:00');
});

test('convertTimeStamp should work regardless of the system timezone', () => {
    const transform = require('../src/transform');
    moment.tz.setDefault('Europe/Volgograd');
    const input = '2/29/16 12:11:11';
    expect(transform.convertTimestamp(input)).toEqual('2016-02-29T15:11:11.000-05:00');
  });

 test('convertZipCode should always return at least five digits, using zeroes to pad the start', () => {
    const transform = require('../src/transform');
    const shortZip = '234';
    const goodZip = '60601';
    const longZip = '02138-3456'
    expect(transform.convertZipCode(shortZip)).toEqual('00234');
    expect(transform.convertZipCode(goodZip)).toEqual('60601');
    expect(transform.convertZipCode(longZip)).toEqual('02138-3456');
 });

 test('convertFullName should return the name in all uppercase letters', () => {
    const transform = require('../src/transform');
    const name = 'Superman übertan';
    expect(transform.convertFullName(name)).toEqual('SUPERMAN ÜBERTAN');
 });

 test('convertDurations should convert times to seconds, and populate an array', () => {
    const transform = require('../src/transform');
    const time = '111:23:32.123';
    expect(transform.convertDurations(time)).toEqual(401012.123);
    expect(transform.durations.length).toEqual(1);
    expect(transform.durations[0]).toEqual(401012.123);
 });

 test('convertTotalDuration should return the sum of the items in the duration array', () => {
    const transform = require('../src/transform');
    const time1 = '111:23:32.123';
    const time2 = '1:23:32.123';
    transform.convertDurations(time1);
    transform.convertDurations(time2);
    expect(transform.convertTotalDuration()).toEqual(406024.24600000004);
 });