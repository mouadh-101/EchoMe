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
            inputs: `${prompt}`,
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
                return data[0].generated_text.trim(); // just the raw output
            }
            throw new Error("Unexpected output format");
        } catch (err) {
            console.error("Invalid JSON response from Hugging Face:", text);
            throw new Error("Invalid JSON response from Hugging Face.");
        }
    }
    

    async generateTagsTitle(transcription) {
        const prompt = `
    Based on the following transcription, generate a short, catchy **title** and 3-5 relevant **tags**,and descriobe the mood of audio.
    Return in JSON and only JSON format like:
    {
      "title": "Your Title Here",
      "tags": ["tag1", "tag2", "tag3"],
      "mood": "happy" // or "sad", "exciting", etc.
    }
    
    Transcription:
    "${transcription}"
    `;
    
        const output = await this.queryMistral(prompt);
    
        try {
            const matches = [...output.matchAll(/{[\s\S]+?}/g)];
            const lastMatch = matches[matches.length - 1];
    
            if (!lastMatch) throw new Error("No JSON found in model output.");
    
            const json = JSON.parse(lastMatch[0]);
            if (!json.title || !Array.isArray(json.tags) || !json.mood) {
                throw new Error("Missing title, mood or tags.");
            }
    
            return json; // ✅ Only return the pure data
        } catch (err) {
            console.error("JSON parsing failed. Full output:", output);
            return {
                status: "error",
                message: "Tagging failed: Invalid JSON response from Hugging Face.",
                rawOutput: output
            };
        }
    }
    
    
        

}

module.exports = new AutomaticService();
