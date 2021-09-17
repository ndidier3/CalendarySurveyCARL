
function databaseConnect() {
    const {Client} = require('pg');
    const client = new Client({
        user: 'nathandidier',
        password: 'Sugarplum!0',
        host: 'localhost',
        post: 5432,
        database: 'OTLFB'
    })
    return client
}

function databaseClose(client) {
    client.end();
}

function addData(client, val) {
    client.query(`INSERT INTO tlfb (day1) VALUES ${val}`)
}

function showData(client) {
    client.query("SELECT * FROM tlfb")
}

// HOW TO GET THIS DATABASE CONNECTED TO WEBSITE ENTRIES? 
// on.click or listen(something like this)... (do-> connect to database location here:)