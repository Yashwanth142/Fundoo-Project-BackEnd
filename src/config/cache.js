import { createClient } from 'redis';
import logger from './logger';

const client = createClient();

export const redisConn = async ()=>{
    try{
        await client.connect();
        logger.info('Connected to redis.');
    } catch(e){
        logger.info('Failed to connected redis.');
    }  
}
export default client;