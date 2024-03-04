const { GoogleGenerativeAI } = require("@google/generative-ai");
const readline = require('readline');
const dotenv = require('dotenv');
dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
let model;
let chat;

function connectToGemini() {
  model = genAI.getGenerativeModel({ model: "gemini-pro"});
  chat = model.startChat({});

  askQuestion();
}

async function sendMessage(msg) {
  const result = await chat.sendMessageStream(msg);
  let text = '';
  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    console.log(chunkText);
    text += chunkText;
  }
  askQuestion();
}

function askQuestion() {
  rl.question('Please enter your prompt: ', (prompt) => {
    if (prompt === 'exit') {
      rl.close();
    } else {
      sendMessage(prompt)
    }
  });
}

connectToGemini();