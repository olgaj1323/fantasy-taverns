const sql = require('mssql');
const { poolPromise } = require('../data/db');

// Get all Taverns
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

const getTavern = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let tavernPool;
    let tavern;
    //console.log(req.user.ID)
    const pool = await poolPromise;
    try {
        tavernPool = await pool
            .request()
            .input('UserID', sql.Int, req.user.ID)
            .query(
                // eslint-disable-next-line quotes
                `select t.ID, t.TavernName from Users u join Taverns t on t.ID= u.TavernID where u.ID = @UserID`,
            );
        tavern = tavernPool.recordset.shift();;
    } catch (e) {
        returnError(res, e, 500);
    }
    //console.log('TAVERN',tavern);
     return returnSuccessResponse(res, tavern, 200);
};
module.exports.getTavern = getTavern;

// Get all rooms
const getRoom = async function(req, res) {
    console.log('user',req.user);
    res.setHeader('Content-Type', 'application/json');
    let roomPool;
    let Rooms;
    const pool = await poolPromise;
    //console.log('tavernid', req.user.TavernID);
    //console.log('search', req.query.Search);
    try {
        
        roomPool = await pool
            .request()
            .input('Id', sql.Int, req.user.TavernID)
            .input('roomName', sql.VarChar, req.query.Search)
            .query(`select * from rooms where TavernID=@Id and RoomName like '%'+ @roomName +'%'`,);
        Rooms = roomPool.recordset;
        //console.log(Rooms);
    } catch (e) {
        returnError(res, e, 500);
    }
    //console.log(Rooms);
    return returnSuccessResponse(res, Rooms, 200);
};
module.exports.getRoom = getRoom;

const createRoom = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let roomPool;
    let room  = req.body;
    console.log('roomn Name:',req.body);
    console.log('req.taver',req.query.tavernid);
    if (!room.roomName) {
        return returnError(res, 'Please enter a Name', 422);
    }

    const pool = await poolPromise;
    try {
        console.log('roomn Name:',room.roomName);
        roomPool = await pool
            .request()
            .input('RoomName', sql.VarChar, room.roomName)
            .input('TavernID', sql.Int, req.user.TavernID)
            .input('RoomStatus', sql.Int, 0)
            .input('DailyRate', sql.Int, room.DailyRate)
            .query(
                // eslint-disable-next-line quotes
                `insert into Rooms (RoomName, RoomStatus, TavernID, DailyRate) output inserted.* values (@RoomName,@RoomStatus, @TavernID,@DailyRate)`,
            );
        room = roomPool.recordset.shift();
    } catch (e) {
        returnError(res, e, 500);
    }

    return returnSuccessResponse(res, room, 201);
};
module.exports.createRoom = createRoom;

