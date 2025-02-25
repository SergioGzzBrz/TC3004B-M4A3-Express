import { sqlConnect, sql } from '../utils/sql.js'

export const getItems = async () => {
    const pool = await sqlConnect();
    const data = await pool.request()
        .query('select * from users')
    console.log(data)
};
