import DB from "../database.js";

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

const getTransactions = async (user_id) => {
  const query = `
    SELECT * FROM transactions
    WHERE user_id = $1
  `;

  const client = DB.getClient();
  const { rows } = await client.query(query, [user_id]);
  return JSON.parse(JSON.stringify(rows));
};

export default {
  insertTransaction,
  getTransactions
};
