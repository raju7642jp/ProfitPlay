import express from "express";
import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Directly using your bot token
const BOT_TOKEN = "8306120206:AAHc_DHKpKPfVenrxQBcESSFhl7nLcrw_wA";
const WEB_APP_URL = process.env.WEB_APP_URL;
const EXTERNAL_URL = process.env.EXTERNAL_URL;

const bot = new TelegramBot(BOT_TOKEN, { polling: false });

// Set webhook (optional but needed if you want Telegram to send updates)
if (EXTERNAL_URL) {
  const WEBHOOK_URL = `${EXTERNAL_URL}/tg-webhook/${BOT_TOKEN}`;
  bot.setWebHook(WEBHOOK_URL)
    .then(() => console.log("✅ Telegram webhook set:", WEBHOOK_URL))
    .catch(err => console.error("❌ Webhook error:", err));
}

// Telegram webhook endpoint
app.post(`/tg-webhook/${BOT_TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Example route
app.get("/", (req, res) => {
  res.send("✅ ProfitPlay backend running fine!");
});

app.listen(10000, () => {
  console.log("Server running on port 10000");
});