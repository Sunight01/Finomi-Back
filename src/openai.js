import OpenAI from 'openai';
import config from './config.js';

const configuration = {
  apiKey: config.OPENAI.KEY,
}

const openai = new OpenAI(configuration);

export default openai;