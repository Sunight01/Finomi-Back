import response from "../functions/network.js";
import Model from "../model/chat.model.js";
import openai from "../openai.js";
import config from "../config.js";

const sendMessage = async (req, res) => {
  const { message } = req.body;

  try {
    const data = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{
        role: "system",
        content: config.OPENAI.PROMPT
      }, {role: "user", content: message}],
      temperature: 0.7,
      max_tokens: 100,
    });
    response.success(req, res, 200, "Message sent successfully", data.choices[0]);
  } catch (error) {
    console.log(error)
    response.error(req, res, 500, "Something went wrong", error.message);
  }
}

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

export default {
  getMessages,
  sendMessage,
  updateMessages,
  saveMessages
};