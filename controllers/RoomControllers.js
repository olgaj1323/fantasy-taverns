const sql = require('mssql');
const { poolPromise } = require('../data/db');


const getGuests = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let guestPool;
    let guest;
    const pool = await poolPromise;
    try {
        guestPool = await pool
            .request()
            .query(
                // eslint-disable-next-line quotes
                `select * from Guests`,
            );
        console.log(guestPool.recordset);
        guest = guestPool.recordset;
    } catch (e) {
        returnError(res, e, 500);
    }
     return returnSuccessResponse(res, guest, 200);
};
module.exports.getGuests = getGuests;

const getAllRooms = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let roomPool;
    let guest;
    const room = await poolPromise;
    try {
        roomPool = await room
            .request()
            .query(
                // eslint-disable-next-line quotes
                `select * from Rooms`,
            );
        console.log(roomPool.recordset);
        guest = roomPool.recordset;
    } catch (e) {
        returnError(res, e, 500);
    }
     return returnSuccessResponse(res, guest, 200);
};
module.exports.getAllRooms = getAllRooms;