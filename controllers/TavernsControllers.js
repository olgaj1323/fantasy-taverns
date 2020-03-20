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
            .input('UserId', sql.Int, req.user.Id)
            .input('Name', sql.VarChar, req.query.Search)
            .query(
                // eslint-disable-next-line quotes
                `select * from ToDos where UserId = @UserId and Name Like '%' + @Name + '%'`,
            );
        taverns = tavernPool.recordset;
    } catch (e) {
        returnError(res, e, 500);
    }

    return returnSuccessResponse(res, taverns, 200);
};

module.exports.getAll = getAll;

