import DB from "../database.js";

const insertUser = async (username, email, password) => {
  const query = `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const client = DB.getClient();
  const { rows } = await client.query(query, [username, email, password]);
  return JSON.parse(JSON.stringify(rows[0]));
};

const getUser = async (email) => {
  const query = `
    SELECT *
    FROM users
    WHERE email = $1
  `;
  const client = DB.getClient();
  const { rows } = await client.query(query, [email]);
  return JSON.parse(JSON.stringify(rows[0]));
};

const updateUser = async (id, username, email) => {
  const query = `
    UPDATE users
    SET username = $1, email = $2
    WHERE user_id = $3
  `;

  const client = DB.getClient();
  const { rows } = await client.query(query, [username, email, id]);
  return JSON.parse(JSON.stringify(rows));
};

const lastLogin = async (email) => {
  const query = `
    UPDATE users
    SET last_login = NOW()
    WHERE email = $1;
  `;
  const client = DB.getClient();
  const { rows } = await client.query(query, [email]);
  return JSON.parse(JSON.stringify(rows[0]));
};

export default {
  insertUser,
  getUser,
  updateUser,
  lastLogin,
};
