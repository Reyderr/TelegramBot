const pg = require('pg');
const {searchVideo} = require("./search");

const client = new pg.Client(JSON.parse(process.env.DB_CONFIG));

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

function updateUserData(id, order, duration, limiter){
    searchUser(id, function (res) {
        if (res.rowCount === 0) {
            console.log("User is not existed")
            return false;
        }
        var query = `UPDATE users SET `;
        if (order != null){
            query = query + `ordered = '${order}' `;
        }
        if (duration != null){
            query = query + `duration = '${duration}' `;
        }
        if (limiter != null){
            query = query + `limiter = ${limiter} `;
        }
        query = query + `WHERE id = ${id}`;
        console.log(query);
        client.query(query, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Data insert successful');
        });
    });
}

function addUser(names, ids) {

    searchUser(ids, function (res){
        if (res.rowCount > 0){
            console.log("User is already existed")
            return false;
        } else {
            const text = `INSERT INTO users  VALUES('${ids}', '${names}', 'date', 'medium', 1)`;

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

function createLinks(id, text, cb){

       return  searchUser(id, function (res){
        if (res.rowCount > 1 || res.rowCount === 0)
        console.error('User error in DB');
        else{
            const user =  res.rows[0];
            searchVideo(text, user.ordered, user.duration, user.limiter, function (res){
                cb(res);
            });
        }
    });
}

client.connect(err => {
    if (err) throw err;
    else { console.log('client connected!') }
});

module.exports = {
    addUser,
    updateUserData,
    createLinks
}
