const OpenAIModule = require('openai');
const Configuration = OpenAIModule.Configuration;
const OpenAIApi = OpenAIModule.OpenAIApi;

// @link https://beta.openai.com/docs/models/gpt-3
const MODELS = {
  davinci: "text-davinci-003",  // 4,000 tokens
  curie: "text-curie-001",      // 2,048 tokens
  babbage: "text-babbage-001",  // 2,048 tokens
  ada: "text-ada-001",          // 2,048 tokens
  "gpt4": "gpt-4",              // 8,192 tokens
  "gpt4.32k": "gpt-4-32k",      // 32,768 tokens
  "gpt3.5-turbo": "gpt-3.5-turbo"
}

const TEMPERATURE_VALUES = {
  "min": 0.0,
  "mid": 0.5,
  "max": 1.0
}

const DEFAULT_CONFIG = {
  model: MODELS.davinci,
  temperature: 0,
  max_tokens: 2000
}

class OpenAIDatasource {
    confguration;
    OpenAIApi;
    openai;

    constructor(OPENAI_API_KEY) {
        this.configuration = new Configuration({
            apiKey: OPENAI_API_KEY
        });
        this.OpenAIApi = OpenAIApi;
        this.openai = new this.OpenAIApi(this.configuration);
    }

    async ask (prompt, config = {}) {
        console.log('ask received prompt: ' + prompt);

        const completionConfig = {
            prompt: prompt,
            model: config.model || DEFAULT_CONFIG.model,
            temperature: config.temperature || DEFAULT_CONFIG.temperature,
            max_tokens: config.max_tokens || DEFAULT_CONFIG.max_tokens
          };
    
        try {
          const completion = await this.openai.createCompletion(completionConfig);
          const textResponse = completion.data.choices[0].text;
          // console.log(textResponse);
          return textResponse;
    
        } catch(error) {
          // Consider adjusting the error handling logic for your use case
          if (error.response) {
            console.error(error.response.status, error.response.data);
    
            if (error.response.status === 503) {
              console.warn('API 503 OVERLOAD ERROR, retrying ...');
              return await this.ask(prompt, completionConfig);
            }
            return `error happened: ${error.response.status} ${JSON.stringify(error.response.data)}`
          } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            return 'An error occurred during your request.'
          }
        }
      }
}

OpenAIDatasource.MODELS = MODELS;

module.exports = OpenAIDatasource;