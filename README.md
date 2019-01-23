## Intro

This is a solution to the challenge described in "The problem"
section below.

## Setup

These instructions assume you're using Mac OS.
You'll need Node and npm to run this tool.  If you 
install Node with [Homebrew](https://brew.sh/) or
[directly](https://nodejs.org) from the Node.js site,
it will also install npm.

This was tested with Node 11.4.0 and npm 6.5.0.
Earlier versions will probably work, but haven't been tested.

You can check your installed versions:
```
node --version
npm --version
```

Once you have Node installed, clone this repo and, in the root of this
project, run
```
npm install
```

## Run

After npm install, from the root of this project, run
```
npm run normalize
```

From there, follow the command prompts.  Enjoy!

## The problem: CSV normalization

Please write a tool that reads a CSV formatted file on `stdin` and
emits a normalized CSV formatted file on `stdout`. Normalized, in this
case, means:

* The entire CSV is in the UTF-8 character set.
* The Timestamp column should be formatted in ISO-8601 format.
* The Timestamp column should be assumed to be in US/Pacific time;
  please convert it to US/Eastern.
* All ZIP codes should be formatted as 5 digits. If there are less
  than 5 digits, assume 0 as the prefix.
* All name columns should be converted to uppercase. There will be
  non-English names.
* The Address column should be passed through as is, except for
  Unicode validation. Please note there are commas in the Address
  field; your CSV parsing will need to take that into account. Commas
  will only be present inside a quoted string.
* The columns `FooDuration` and `BarDuration` are in HH:MM:SS.MS
  format (where MS is milliseconds); please convert them to a floating
  point seconds format.
* The column "TotalDuration" is filled with garbage data. For each
  row, please replace the value of TotalDuration with the sum of
  FooDuration and BarDuration.
* The column "Notes" is free form text input by end-users; please do
  not perform any transformations on this column. If there are invalid
  UTF-8 characters, please replace them with the Unicode Replacement
  Character.

You can assume that the input document is in UTF-8 and that any times
that are missing timezone information are in US/Pacific. If a
character is invalid, please replace it with the Unicode Replacement
Character. If that replacement makes data invalid (for example,
because it turns a date field into something unparseable), print a
warning to `stderr` and drop the row from your output.

You can assume that the sample data we provide will contain all date
and time format variants you will need to handle.
