import Groq from "groq-sdk";

export default async function handler(req, res) {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: "user", content: req.body.prompt }],
        model: "llama3-8b-8192",
    });

    const responseText = chatCompletion.choices[0]?.message?.content || "No response from GroqCloud.";
    res.status(200).send(responseText);
}
