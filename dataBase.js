const pg = require('pg');
const fetch = require("node-fetch");

// const text = 'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *';
// const values = ['brianc', 'brian.m.carlson@gmail.com'];

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


client.connect(err => {
    if (err) throw err;
    else { console.log('client connected!') }
});


const searchUser = (id = 0, cb) => {
    const text = 'SELECT id FROM users WHERE id LIKE VALUES ($1)';
    const values = [id];
    client.query(text,values, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        client.end();
    });
}

function addUser(names, ids) {
    searchUser(ids, function (res){
        console.log(res);
    })
    // const text = `INSERT INTO users (id, name) VALUES ($1,$2)`;
    // const values = [ids,names];
    //
    //
    // client.query(text, values, (err, res) => {
    //     if (err) {
    //         console.error(err);
    //         return;
    //     }
    //     console.log('Data insert successful');
    //     client.end();
    // });
}


module.exports = {
    addUser
}



// client.query(text, values, (err, res) => {
//     if (err) {
//         console.log(err.stack)
//     } else {
//         console.log(res.rows[0])
//         // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
//     }
// })


