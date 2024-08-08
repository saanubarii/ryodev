const { GoogleGenerativeAI } = require("@google/generative-ai");

export default async function handler(req, res) {
    const genAI = new GoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = req.body.prompt;
    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();

    res.status(200).send(responseText);
}
