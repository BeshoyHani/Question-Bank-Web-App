import pkg from 'pg';
import dotenv from 'dotenv';
const { Pool } = pkg;

dotenv.config();

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_TEST_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_PORT,
    ENV,
} = process.env;


const Client = () =>{
    if(ENV === 'prod'){
        return new Pool({
            host: POSTGRES_HOST,
            port: parseInt(POSTGRES_PORT),
            database: POSTGRES_DB,
            user: POSTGRES_USER,
            password: POSTGRES_PASSWORD,
        });
    }

    else{
        return new Pool({
            host: POSTGRES_HOST,
            port: parseInt(POSTGRES_PORT),
            database: POSTGRES_TEST_DB,
            user: POSTGRES_USER,
            password: POSTGRES_PASSWORD,
        });
    }

}

export default Client();