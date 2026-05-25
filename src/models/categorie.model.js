import pool from '../config/db.js';
export const create = async ({ nom_categorie }) => {
    const sql = 'INSERT INTO categories (nom_categorie) VALUES (?)';
    const [result] = await pool.execute(sql, [nom_categorie]);
    return result.insertId;
};

export const findById = async (id) => {
    const [rows] = await pool.execute(
        'SELECT * FROM categories WHERE id_categorie = ?',
        [id]
    );
    return rows[0]??null;
};

export const findAll = async () => {
    const [rows] = await pool.execute(
        'SELECT id_categorie, nom_categorie FROM categories'
    );
    return rows;
};

export const remove = async (id) => {
  const [result] = await pool.execute("DELETE FROM categories WHERE id_categorie = ?", [id]);
  return result.affectedRows === 1;
};

export const update = async (id, { nom_categorie }) => {
    const sql = 'UPDATE categories SET nom_categorie = ? WHERE id_categorie = ?';
    const [result] = await pool.execute(sql, [nom_categorie, id]);
    return result.affectedRows === 1;
};  