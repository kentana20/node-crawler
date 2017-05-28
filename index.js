/* eslint-disable no-console */
'use strict';

const cli = require('cheerio-httpcli');
const db = require('./lib/db');

const url = 'http://www.skysports.com/premier-league-news';

cli.fetch(url, {initialCollectionKey: 1}, (error, $, res) => {
    if (error || res.statusCode != 200) {
        console.log('Error:' + error.message);
        return;
    }
    let target = [];
    let id, title, head, url;

    // Get News Data
    // console.log('block: ' + $('a[class=news-list__figure]').parent().attr('data-id'));
    $('a[class=news-list__headline-link]').each((idx) => {
        console.log(`idx: ${idx}`);
        id = $('a[class=news-list__figure]').eq(idx).parent().attr('data-id');
        title = $('h4[class=news-list__headline]').eq(idx).text();
        head = $('p[class=news-list__snippet]').eq(idx).text();
        url = $('h4[class=news-list__headline]').eq(idx).find('a').attr('href');

        target[idx] = [
            id.trim(),
            title.trim(),
            head.trim(),
            url.trim()
        ];
        console.log(`idx: ${idx} --- ${JSON.stringify(target[idx])}`);

        // DB Insert
        db.query(target[idx], (err, res) => {
            if (err) {
                console.log(`error: ${err.message}`);
                return;
                // logger.error(`messageId: ${messageId} fail. error: ${err.stack}`);
                // reject(err);
            }

            // logger.info(`messageId ${messageId} registed.`);
            // resolve();
            // setTimeout(resolve(), 1000);
            console.log(`${idx} inserted.`);
        });
    });
});
