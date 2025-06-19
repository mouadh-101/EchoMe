require('dotenv').config();
const fetch = require('node-fetch');

class AutomaticService {
    constructor() {
        this.geminiApiKey = process.env.GEMINI_API_KEY;
        this.geminiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
    }

    async queryGemini(prompt, temperature = 0.7, max_tokens = 256) {
        const payload = {
            contents: [{
                parts: [{
                    text: prompt
                }]
            }],
            generationConfig: {
                temperature,
                maxOutputTokens: max_tokens
            }
        };

        const res = await fetch(`${this.geminiUrl}?key=${this.geminiApiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (!data.candidates || !data.candidates[0]?.content?.parts[0]?.text) {
            throw new Error("Unexpected response format from Gemini");
        }

        return data.candidates[0].content.parts[0].text.trim(); // raw output
    }

    async generateTagsTitle(transcription) {
        const prompt = `
Based on the following transcription, generate a short, catchy **title** and 3-5 relevant **tags**, describe the mood of audio, then summarize it.
Return in JSON and only JSON format like:
{
  "title": "Your Title Here",
  "tags": ["tag1", "tag2", "tag3"],
  "mood": "happy" // or "sad", "exciting", etc.
  "summary": "A brief summary of the audio content."
}

Transcription:
"${transcription}"
`;

        const output = await this.queryGemini(prompt);

        try {
            const matches = [...output.matchAll(/{[\s\S]+?}/g)];
            const lastMatch = matches[matches.length - 1];

            if (!lastMatch) throw new Error("No JSON found in model output.");

            const json = JSON.parse(lastMatch[0]);
            if (!json.title || !Array.isArray(json.tags) || !json.mood || !json.summary) {
                throw new Error("Missing title, mood, summary or tags.");
            }

            return json; // ✅ Only return the pure data
        } catch (err) {
            console.error("JSON parsing failed. Full output:", output);
            return {
                status: "error",
                message: "Tagging failed: Invalid JSON response from Gemini.",
                rawOutput: output
            };
        }
    }
    async generateTodoList(transcription) {
        const prompt = `
Based on the following transcription, generate a Todo list.
Return in JSON and only JSON format like:
{
  "TodoList":[
    "your first todo item",
    "your second todo item",
    "your third todo item"
  ]
}

Transcription:
"${transcription}"
`;

        const output = await this.queryGemini(prompt);

        try {
            const matches = [...output.matchAll(/{[\s\S]+?}/g)];
            const lastMatch = matches[matches.length - 1];

            if (!lastMatch) throw new Error("No JSON found in model output.");

            const json = JSON.parse(lastMatch[0]);
            if (!Array.isArray(json.TodoList)) {
                throw new Error("Missing title, mood, summary or tags.");
            }

            return json; 
        } catch (err) {
            console.error("JSON parsing failed. Full output:", output);
            return {
                status: "error",
                message: "Tagging failed: Invalid JSON response from Gemini.",
                rawOutput: output
            };
        }
    }
}

module.exports = new AutomaticService();