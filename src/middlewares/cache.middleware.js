import HttpStatus from 'http-status-codes';
import client from "../config/cache"

export const getNotesFromRedis = async (req, res ,next)=> {
    const data = await client.get(req.body.userID);
    //console.log("data in redis--->",data)
    if(data){
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,        //201
            data:JSON.parse(data),
            message: 'Notes Fetched successfully from redis'
        });
    } else next(); 
}