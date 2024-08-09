const config = {
    gemini: {
        apiUrl: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBYPW4SJOlMyg_rWmdzm7ziw_0rL8W22Lc",
        model: "gemini-1.5-flash-latest",
        apiKey: process.env.GEMINI_API_KEY || "GEMINI_API_KEY_PLACEHOLDER"
    },
    groq: {
        apiUrl: "",  // Isi jika kamu memiliki URL API untuk Groq, jika tidak, kosongkan
        model: "llama3-8b-8192",
        apiKey: process.env.GROQ_API_KEY || "GROQ_API_KEY_PLACEHOLDER"
    },
    server: {
        port: process.env.PORT || 3001
    }
};

module.exports = config;