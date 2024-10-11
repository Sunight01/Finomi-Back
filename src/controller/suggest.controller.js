import response from "../functions/network.js";
import Model from "../model/suggest.model.js";

const insertSuggest = async (req, res) => {
  const { user_id, title, description } = req.body;
  try {
    const data = await Model.insertSuggest(user_id, title, description);
    response.success(req, res, 200, "Suggestion inserted succesfully", data);
  } catch (error) {
    response.error(req, res, 400, error);
  }
};

const getSuggest = async (req, res) => {
  const { user_id } = req.params;
  try {
    const data = await Model.getSuggest(user_id);
    response.success(req, res, 200, "Suggestions retrieved succesfully", data);
  } catch (error) {
    response.error(req, res, 400, error);
  }
};

const getAllSuggest = async (req, res) => {
  try {
    const data = await Model.getAllSuggest();
    response.success(
      req,
      res,
      200,
      "All suggestions retrieved succesfully",
      data
    );
  } catch (error) {
    response.error(req, res, 400, error);
  }
};

const deleteSuggest = async (req, res) => {
  const { user_id, id } = req.params;
  try {
    const data = await Model.deleteSuggest(user_id, id);
    response.success(req, res, 200, "Suggestion deleted succesfully", data);
  } catch (error) {
    response.error(req, res, 400, error);
  }
};

const updateSuggest = async (req, res) => {
  const { user_id, id, response: resp, state } = req.body;
  console.log(user_id, id, resp, state);
  try {
    const data = await Model.updateSuggest(id, user_id, resp, state);
    response.success(req, res, 200, "Suggestion updated succesfully", data);
  } catch (error) {
    console.log(error);
    response.error(req, res, 400, error);
  }
};

export default {
  insertSuggest,
  getSuggest,
  getAllSuggest,
  deleteSuggest,
  updateSuggest
};
