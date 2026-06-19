import pool from '../db.js';

export const findPassByUsername = async (username) => {
    const query = 'SELECT password FROM users WHERE name = $1';
    const values = [username];
    const result = await pool.query(query, values);
    return result.rows[0];
};



