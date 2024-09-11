import DB from "../database.js";

// Función para obtener los mensajes de chat de un usuario.
const getMessages = async (user_id) => {
  const query = `
    SELECT * FROM ia_chat
    WHERE user_id = $1
  `;

  const client = DB.getClient();
  const { rows } = await client.query(query, [user_id]);
  return JSON.parse(JSON.stringify(rows));
}

// Función para guardar los mensajes de chat de un usuario.
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

// Función para actualizar los mensajes de chat de un usuario.
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

// Función para eliminar los mensajes de chat de un usuario.
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