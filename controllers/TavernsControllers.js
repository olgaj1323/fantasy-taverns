const sql = require('mssql');
const { poolPromise } = require('../data/db');

const getAll = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let tavernPool;
    let taverns;
    const pool = await poolPromise;

    try {
        tavernPool = await pool
            .request()
            .query(
                // eslint-disable-next-line quotes
                `select * from taverns`,
            );
        taverns = tavernPool.recordset;
    } catch (e) {
        returnError(res, e, 500);
    }

    return returnSuccessResponse(res, taverns, 200);
};

module.exports.getAll = getAll;

