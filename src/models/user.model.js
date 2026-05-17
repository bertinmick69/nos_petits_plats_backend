import pool from '../config/db.js';


export const create = async ({email, mot_de_passe, nom, adresse, telephone, role, date_inscription}) => {
    const sql = 'INSERT INTO users (email, mot_de_passe, nom, adresse, telephone, role, date_inscription) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const [result] = await pool.execute(sql,
        [
            email, 
            mot_de_passe, 
            nom || null, 
            adresse || null, 
            telephone || null, 
            role || 'client', 
            date_inscription || null
        ]
    );
    return result.insertId;
};

export const findByEmail = async (email) => {
    const [rows] = await pool.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
    );
    return rows[0];
};


export const findById = async (id) => {
    const [rows] = await pool.execute(
        'SELECT * FROM users WHERE id_users = ?',
        [id]
    );
    return rows[0]??null;
};

