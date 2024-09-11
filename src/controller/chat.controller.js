import response from "../functions/network.js";
import Model from "../model/chat.model.js";
import openai from "../openai.js";
import config from "../config.js";

// Funcion para enviar un mensaje a OpenAI.
const sendMessage = async (req, res) => {
  const { message } = req.body;

  try {
    const data = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{
        role: "system",
        content: config.OPENAI.PROMPT
      }, ...message],
      temperature: 0.7
    });
    response.success(req, res, 200, "Message sent successfully", data.choices[0]);
  } catch (error) {
    console.log(error)
    response.error(req, res, 500, "Something went wrong", error.message);
  }
}

// Funcion para obtener los mensajes de chat de un usuario.
const getMessages = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Model.getMessages(id);
    response.success(req, res, 200, "Messages retrieved successfully", data);
  } catch (error) {
    console.log(error)
    response.error(req, res, 500, "Something went wrong", error.message);
  }
}

// Funcion para actualizar los mensajes de chat de un usuario.
const updateMessages = async (req, res) => {
  const { id } = req.params;
  const { messages } = req.body
  try {
    const data = await Model.updateMessage(id, messages);
    response.success(req, res, 200, "Messages updated successfully", data);
  } catch (error) {
    console.log(error)
    response.error(req, res, 500, "Something went wrong", error.message);
  }
}

// Funcion para guardar los mensajes de chat de un usuario.
const saveMessages = async (req, res) => {
  const { id } = req.params;
  const { messages } = req.body
  try {
    const data = await Model.saveMessages(id, messages);
    response.success(req, res, 200, "Messages saved successfully", data);
  } catch (error) {
    console.log(error)
    response.error(req, res, 500, "Something went wrong", error.message);
  }
}

// Funcion para eliminar los mensajes de chat de un usuario.
const deleteMessages = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Model.deleteMessages(id);
    response.success(req, res, 200, "Messages deleted successfully", data);
  } catch (error) {
    console.log(error)
    response.error(req, res, 500, "Something went wrong", error.message);
  }
}

export default {
  getMessages,
  sendMessage,
  updateMessages,
  saveMessages,
  deleteMessages
};