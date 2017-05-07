/* eslint-disable no-console */
'use strict';

const request = require('request');
const cheerio = require('cheerio');

let uri = 'http://www.google.co.jp/';

request({uri: uri}, (error, res, body) => {
    if (!error && res.statusCode == 200) {
        let $ = cheerio.load(body);
        console.log(res.request.href);
        console.log($('title').text());
    } else {
        console.log('Error:' + error.code);
    }
});
