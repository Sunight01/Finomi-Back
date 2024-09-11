import OpenAI from 'openai';
import config from './config.js';

// Configuración de la API de OpenAI.
const configuration = {
  apiKey: config.OPENAI.KEY,
}

// Instancia de la clase OpenAI.
const openai = new OpenAI(configuration);

export default openai;