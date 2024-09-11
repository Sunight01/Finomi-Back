import response from "../functions/network.js";
import Model from "../model/transactions.model.js";

// Funcion para crear una transacción en la BD.
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

// Funcion para actualizar una transacción en la BD.
const updateTransaction = async (req, res) => {
  const { id, title, type, date, tag, description, amount } = req.body;
  try {
    const data = await Model.updateTransaction(id, title, type, date, tag, description, amount);
    response.success(req, res, 201, "Transaction updated successfully", data);
  } catch (error) {
    console.log(error)
    response.error(req, res, 500, "Something went wrong", error.message);
  }
};

// Funcion para eliminar una transacción en la BD.
const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Model.deleteTransaction(id);
    response.success(req, res, 200, "Transaction deleted successfully", data);
  } catch (error) {
    console.log(error)
    response.error(req, res, 500, "Something went wrong", error.message);
  }
};

// Funcion para obtener todas las transacciones de un usuario.
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
  updateTransaction,
  deleteTransaction,
  getTransactions
};