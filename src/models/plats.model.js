import pool from '../config/db.js';

export const create = async ({ id_categorie, nom_plat, description, prix, image_url, temps_preparation_minutes, disponible }) => {
    const sql = 'INSERT INTO plats (id_categorie, nom_plat, description, prix, image_url, temps_preparation_minutes, disponible) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const [result] = await pool.execute(sql,
        [
            id_categorie || null,
            nom_plat, 
            description || null, 
            prix || null, 
            image_url || null,
            temps_preparation_minutes || null,
            disponible !== undefined ? disponible : true
        ]
    );
    return result.insertId;
};

export const findById = async (id) => {
    const [rows] = await pool.execute(
        'SELECT * FROM plats WHERE id_plat = ?',
        [id]
    );
    return rows[0]??null;
};

export const findAll = async () => {
    const [rows] = await pool.execute(
        'SELECT id_plat, id_categorie, nom_plat, description, prix, image_url, temps_preparation_minutes, disponible, date_creation FROM plats'
    );
    return rows;
};

export const remove = async (id) => {
  const [result] = await pool.execute("DELETE FROM plats WHERE id_plat = ?", [id]);
  return result.affectedRows === 1;
};

export const update = async (id, { id_categorie, nom_plat, description, prix, image_url, temps_preparation_minutes, disponible }) => {
    const sql = 'UPDATE plats SET id_categorie = ?, nom_plat = ?, description = ?, prix = ?, image_url = ?, temps_preparation_minutes = ?, disponible = ? WHERE id_plat = ?';
    const [result] = await pool.execute(sql, [
        id_categorie || null,
        nom_plat, 
        description, 
        prix, 
        image_url, 
        temps_preparation_minutes, 
        disponible !== undefined ? disponible : true,
        id
    ]);
    return result.affectedRows === 1;
};
