import DB from "../database.js";

const getMessages = async (user_id) => {
  const query = `
    SELECT * FROM ia_chat
    WHERE user_id = $1
  `;

  const client = DB.getClient();
  const { rows } = await client.query(query, [user_id]);
  return JSON.parse(JSON.stringify(rows));
}

const saveMessages = async (user_id, message) => {
  const query = `
  INSERT INTO ia_chat (user_id, messages)
  VALUES ($1, $2)
  RETURNING *
  `
  const client = DB.getClient();
  const { rows } = await client.query(query, [user_id, message]);
  return JSON.parse(JSON.stringify(rows[0]));
}

const updateMessage = async (user_id, message) => {
  const query = `
  UPDATE ia_chat
  SET messages = $1
  WHERE user_id = $2
  RETURNING *
  `;

  const client = DB.getClient();
  const { rows } = await client.query(query, [message, user_id]);
  return JSON.parse(JSON.stringify(rows[0]));
}

const deleteMessages = async (user_id) => {
  const query = `
  DELETE FROM ia_chat
  WHERE user_id = $1;
  `;

  const client = DB.getClient();
  const { rows } = await client.query(query, [user_id]);
  return JSON.parse(JSON.stringify(rows));
}

export default {
  updateMessage,
  saveMessages,
  getMessages,
  deleteMessages
}