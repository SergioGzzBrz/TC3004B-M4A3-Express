import { sqlConnect, sql } from '../utils/sql.js'

export const getItems = async (req, res) => {
    const pool = await sqlConnect();
    const data = await pool.request()
        .query('select * from items')
    console.log(data)
    res.json(data.recordset)
};

export const getItem = async (req, res) => {
    const pool = await sqlConnect();
    const data = await pool.request()
    .input('id', sql.Int, req.params.id)
    .query(`SELECT * from items WHERE id = @id`)
    console.log(data)
    res.json(data.recordset)
};

export const postItem = async (req, res) => {
    const pool = await sqlConnect();
    const data = await pool
    .request()
    .input('name', sql.VarChar, req.body.name)
    .input('price', sql.Int, req.body.price)
    .query(`INSERT INTO items (name, price) VALUES (@name, @price)`)
    
    console.log(data)
    res.status(200).json({ successful: true })
};


export const putItem = async (req, res) => {
    const pool = await sqlConnect();
    const data = await pool
    .request()
    .input('id', sql.Int, req.params.id)
    .input('name', sql.VarChar, req.body.name)
    .input('price', sql.Int, req.body.price)
    .query(`UPDATE items SET name = @name, price = @price WHERE id = @id`)
    
    console.log(data)
    res.status(200).json({ successful: true })
};

export const deleteItem = async (req, res) => {
    const pool = await sqlConnect();
    const data = await pool
    .request()
    .input('id', sql.Int, req.params.id)
    .query(`DELETE FROM items WHERE id = @id`)
    
    console.log(data)
    res.status(200).json({ successful: true })
};

