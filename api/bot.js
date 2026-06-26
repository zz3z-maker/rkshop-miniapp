const SHOP_URL = "https://rkshop-miniapp.vercel.app/";
const SNAP_URL = "https://www.snapchat.com/add/rkshop33k";

async function telegram(method, payload) {
  const token = process.env.BOT_TOKEN;
  const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(payload)
  });
  return response.json();
}

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(200).send("RKShop Bot OK");

  const message = req.body.message;
  if (!message) return res.status(200).json({ok:true});

  await telegram("sendMessage", {
    chat_id: message.chat.id,
    text: "Bienvenue chez RKShop 🛍️\n\nClique sur le bouton pour ouvrir la boutique.",
    reply_markup: {
      inline_keyboard: [
        [{text:"🛍 Ouvrir RKShop", web_app:{url:SHOP_URL}}],
        [{text:"👻 Commander sur Snap", url:SNAP_URL}]
      ]
    }
  });

  return res.status(200).json({ok:true});
};
