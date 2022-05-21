const pg = require('pg');

const config = {
    host: 'ec2-52-86-115-245.compute-1.amazonaws.com',
    // Do not hard code your username and password.
    // Consider using Node environment variables.
    user: 'hheqxlyrvsbnfl',
    password: '44e4dbfc8371613c6f84d4fed16babdfd37b8b48ed43d1d76ccd7bed16ae2e22',
    database: 'd6ahfju2sipc4q',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
};

const client = new pg.Client(config);


// const client = new Client({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnauthorized: false
//     }
// });

const searchUser = (ids, cb) => {

    const text = `SELECT * FROM users WHERE id::text LIKE '${ids}' `;

    client.query(text, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        cb(res);
    });
}

function addUser(names, ids) {

    searchUser(ids, function (res){
        if (res.rowCount > 0){
            console.log("User is already existed")

            return false;
        } else {

            const text = `INSERT INTO users  VALUES('${ids}', '${names}', 'date', 'medium')`;
            client.query(text, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('Data insert successful');

            });
        }
    });
}

client.connect(err => {
    if (err) throw err;
    else { console.log('client connected!') }
});

module.exports = {
    addUser
}
