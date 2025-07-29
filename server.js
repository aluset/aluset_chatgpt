const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const { ChatGPTAPI } = require("chatgpt");

const api = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  const response = await api.sendMessage(userMessage);
  res.json({ reply: response.text });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
