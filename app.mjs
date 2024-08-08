const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const axios = require('axios');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/gemini', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const image = req.body.image;
        
        const response = await axios.post('https://gemini.api.url', {
            prompt: prompt,
            image: image,
            apiKey: process.env.GEMINI_API_KEY
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get a response from Gemini API' });
    }
});

app.post('/api/groqcloud', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const image = req.body.image;

        const response = await axios.post('https://groqcloud.api.url', {
            prompt: prompt,
            image: image,
            apiKey: process.env.GROQ_API_KEY
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get a response from GroqCloud API' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
