import { sqlConnect, sql } from '../utils/sql.js'

export const login = async (req, res) => {
    let isLogin = false
    const pool = await sqlConnect();
    const data = await pool
        .request()
        .input('username', sql.VarChar, req.body.username)
        .query('SELECT * FROM users WHERE username = @username')
    
    isLogin = (data.recordset[0]?.password === req.body.password) 
    res.status(200).json({result: isLogin})
};