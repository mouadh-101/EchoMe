require('dotenv').config();
const fetch = require('node-fetch');

class AutomaticService {
    constructor() {
        this.hfApiKey = process.env.HUGGINGFACE_API_KEY;
        this.baseUrl = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3";
        this.headers = {
            'Authorization': `Bearer ${this.hfApiKey}`,
            'Content-Type': 'application/json'
        };
    }

    async queryMistral(prompt, temperature = 0.7, max_tokens = 256) {
        const payload = {
            inputs: `<s>[INST] ${prompt} [/INST]`,
            parameters: {
                temperature,
                max_new_tokens: max_tokens
            }
        };

        const res = await fetch(this.baseUrl, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(payload)
        });

        const text = await res.text();

        try {
            const data = JSON.parse(text);
            if (Array.isArray(data) && data[0]?.generated_text) {
                return data[0].generated_text.trim();
            }
            throw new Error("Unexpected output format");
        } catch (err) {
            console.error("Invalid JSON response:", text);
            throw new Error("Invalid JSON response from Hugging Face.");
        }
    }

    async generateTagsTitle(transcription) {
        const prompt = `
    Based on the following transcription, generate a short, catchy **title** and 3-5 relevant **tags**.
    Return in JSON and only JSON format like:
    {
      "title": "Your Title Here",
      "tags": ["tag1", "tag2", "tag3"]
    }
    
    Transcription:
    "${transcription}"
    `;
    
        const output = await this.queryMistral(prompt);
    
        try {
            const match = output.match(/{[\s\S]+}/);
            if (!match) throw new Error("No JSON found in model output.");
    
            const json = JSON.parse(match[0]);
            if (!json.title || !Array.isArray(json.tags)) {
                throw new Error("Missing title or tags.");
            }
    
            return {
                status: "success",
                data: json
            };
        } catch (err) {
            console.error("JSON parsing failed. Full output:", output);
            return {
                status: "error",
                message: "Tagging failed: Invalid JSON response from Hugging Face.",
                rawOutput: output
            };
        }
    }
    //  json problems will be fixed later 
    

}

module.exports = new AutomaticService();
