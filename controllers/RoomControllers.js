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
        
        guest = roomPool.recordset;
    } catch (e) {
        returnError(res, e, 500);
    }
     return returnSuccessResponse(res, guest, 200);
};
module.exports.getAllRooms = getAllRooms;

const createBookRoom = async function(bookRoom) {
    console.log(bookRoom);
    const pool = await poolPromise;
    let result;
    try {
        result = await pool
            .request()
            .input('BookingDate', sql.NVarChar, bookRoom.BookingDate)
            .input('GuestID', sql.Int,bookRoom.GuestID)
            .input('RoomID', sql.Int,bookRoom.RoomID)
            .input('StayDateStart', sql.NVarChar, bookRoom.StayDateStart)
            .input('StayLength', sql.Int, bookRoom.StayLength)
            .input('DailyRate', sql.Int, bookRoom.DailyRate)
            .query(
                `insert into RoomStays ([BookingDate],[GuestID],[RoomID],[StayDateStart],[StayLength],[DailyRate]) OUTPUT inserted.* values (@BookingDate,@GuestID,@RoomID,@StayDateStart,@StayLength,@DailyRate)`
                );
    } catch (e) {
        throwError(e.message);
    }
    console.log('result',result.recordset.shift());
    return result.recordset.shift();
};

module.exports.createBookRoom = createBookRoom;

createRoomStay = async function(req, res) {
    res.setHeader('ContentType', 'application/json');
    const body = req.body;
    console.log('req when create book',req.body);
    
    let err, bookRoom;
    console.log('Body',body)
    [err, bookRoom] = await executeOrThrow(createBookRoom(body));
    if (err) {
        console.log('this error');
        return returnError(res, err, 422);
    }
    console.log('res',res);
    return returnSuccessResponse(res, bookRoom, 201);
};

module.exports.createRoomStay = createRoomStay;