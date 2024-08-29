import response from "../functions/network.js";
import Model from "../model/transactions.model.js";

const createTransaction = async (req, res) => {
  const { user_id, title, type, date, tag, description, amount } = req.body;
  try {
    const data = await Model.insertTransaction(user_id, title, type, date, tag, description, amount);
    console.log(data)
    response.success(req, res, 200, "Transaction created successfully", data);
  } catch (error) {
    console.log(error)
    response.error(req, res, 500, "Something went wrong", error.message);
  }

};

const getTransactions = async (req, res) => {
  const {id} = req.params;
  try {
    const data = await Model.getTransactions(id);
    response.success(req, res, 200, "Transactions retrieved successfully", data);
  } catch (error) {
    console.log(error)
    response.error(req, res, 500, "Something went wrong", error.message);
  }
}

export default {
  createTransaction,
  getTransactions
};