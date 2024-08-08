import express from 'express';
import multer from 'multer';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static('public'));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/gemini', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const imageData = req.file.buffer.toString('base64');
        const prompt = `Roast this artwork: [data gambar base64: ${imageData}]`;

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        res.send(response.text());

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/groqcloud', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const imageData = req.file.buffer.toString('base64');
        const prompt = `Roast this artwork: [data gambar base64: ${imageData}]`;

        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'llama3-8b-8192',
        });
        res.send(chatCompletion.choices[0]?.message?.content || '');

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


