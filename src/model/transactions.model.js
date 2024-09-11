import DB from "../database.js";

// Función para insertar una transacción en la base de datos.
const insertTransaction = async (
  user_id,
  title,
  type,
  date,
  tag,
  description,
  amount
) => {
  const query = `
  INSERT INTO transactions (user_id, title, type, date, tag, description, amount)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING *
  `;
  const client = DB.getClient();
  const { rows } = await client.query(query, [
    user_id,
    title,
    type,
    date,
    tag,
    description,
    amount,
  ]);
  return JSON.parse(JSON.stringify(rows[0]));
};

// Función para actualizar una transacción en la base de datos.
const updateTransaction = async (id, title, type, date, tag, description, amount) => {
  const query = `
    UPDATE transactions
    SET title = $1, type = $2, date = $3, tag = $4, description = $5, amount = $6
    WHERE id = $7
    RETURNING *
  `;

  const client = DB.getClient();
  const { rows } = await client.query(query, [
    title,
    type,
    date,
    tag,
    description,
    amount,
    id,
  ]);
  return JSON.parse(JSON.stringify(rows[0]));
};

// Funcion para eliminar una transacción en la base de datos.
const deleteTransaction = async (id) => {
  const query = `
    UPDATE transactions
    SET is_deleted = true
    WHERE id = $1
  `;

  const client = DB.getClient();
  const { rows } = await client.query(query, [id]);
  return JSON.parse(JSON.stringify(rows));
}

// Funcion para obtener todas las transacciones de un usuario.
const getTransactions = async (user_id) => {
  const query = `
    SELECT *
    FROM transactions
    WHERE user_id = $1 AND is_deleted = false
    ORDER BY date DESC
  `;

  const client = DB.getClient();
  const { rows } = await client.query(query, [user_id]);
  return JSON.parse(JSON.stringify(rows));
};

export default {
  insertTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactions
};
