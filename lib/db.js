const pg = require('pg');

const config = {
    user: process.env.PN_DB_USER_NAME,
    database: process.env.PN_DB_DATABASE_NAME,
    password: process.env.PN_DB_PASSWORD,
    host: process.env.PN_DB_HOST_NAME,
    port: process.env.PN_DB_PORT
};

let insertQuery = `
INSERT INTO premier_news.news (
  id, title, head, url, created_at, updated_at
) VALUES (
  $1, $2, $3, $4, current_timestamp, current_timestamp
)
ON CONFLICT ON CONSTRAINT news_pkey
DO UPDATE SET
  title=$2,
  head=$3,
  url=$4,
  updated_at=current_timestamp
`

const pool = new pg.Pool(config);
pool.on('error', (err) => {
    // ToDo: log
    console.error('idle client error', err.message, err.stack);
});

module.exports.connect = (callback) => {
    return pool.connect(callback);
};

module.exports.query = (values, callback) => {
    // ToDo: log
    return pool.query(insertQuery, values, callback);
};
