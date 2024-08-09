const express = require('express');
const fileUpload = require('express-fileupload');
const fetch = require('node-fetch');
const { Groq } = require('groq');

const app = express();
app.use(express.json());
app.use(fileUpload());

const geminiApiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=const mySecret = process.env['GEMINI_API_KEY']';
const groq = new Groq({ api_key: process.env.GROQ_API_KEY });

app.post('/upload', async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const file = req.files.image;
    const imageData = file.data.toString('base64');

    // Call Gemini API
    const geminiResponse = await fetch(geminiApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            prompt: "Roast this artwork",
            image: imageData,
        })
    }).then(res => res.json());

    // Call Groq API
    const groqResponse = await groq.chat.completions.create({
        messages: [
            {
                "role": "user",
                "content": "Roast this artwork",
            }
        ],
        model: "llama3-8b-8192",
    });

    const geminiRoast = geminiResponse?.choices?.[0]?.message?.content || "No roasting response available from Gemini.";
    const groqRoast = groqResponse?.choices?.[0]?.message?.content || "No roasting response available from Groq.";

    // Send combined response back to the client
    res.json({
        geminiRoast,
        groqRoast
    });
});

const port = 3001;
app.listen(process.env.PORT || port, () => {
    console.log(`Web app listening on port ${port}`);
});