import DB from "../database.js";

const insertSuggest = async (user_id, title, description) => {
  const query = `
    INSERT INTO suggests (user_id, title, description)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const client = DB.getClient();
  const { rows } = await client.query(query, [user_id, title, description]);
  return JSON.parse(JSON.stringify(rows[0]));
};

const getSuggest = async (user_id) => {
  const query = `
    SELECT *
    FROM suggests
    WHERE user_id = $1 AND is_deleted = false
    ORDER BY
      date DESC;
  `;
  const client = DB.getClient();
  const { rows } = await client.query(query, [user_id]);
  return JSON.parse(JSON.stringify(rows));
};

const getAllSuggest = async () => {
  const query = `
    SELECT
      *
    FROM
      suggests
    WHERE
      is_deleted = false
    ORDER BY
      date ASC;
  `;
  const client = DB.getClient();
  const { rows } = await client.query(query);
  return JSON.parse(JSON.stringify(rows));
};

const deleteSuggest = async (user_id, id) => {
  const query = `
    UPDATE suggests
    SET is_deleted = true
    WHERE user_id = $1 AND id = $2
  `;
  const client = DB.getClient();
  const { rows } = await client.query(query, [user_id, id]);
  return JSON.parse(JSON.stringify(rows));
};

const updateSuggest = async (id, user_id, response, state) => {
  const query = `
    UPDATE suggests
    SET is_deleted = false, response = $1, state = $2
    WHERE user_id = $3 AND id = $4
  `;
  const client = DB.getClient();
  const { rows } = await client.query(query, [response, state, user_id, id]);
  return JSON.parse(JSON.stringify(rows));
};

export default {
  insertSuggest,
  getSuggest,
  getAllSuggest,
  deleteSuggest,
  updateSuggest,
};
