module.exports = async (req, res) => {
  const token = process.env.BOT_TOKEN;
  const webhookUrl = "https://rkshop-miniapp.vercel.app/api/bot";

  const response = await fetch(`https://api.telegram.org/bot${token}/setWebhook`, {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({url:webhookUrl})
  });

  const data = await response.json();
  return res.status(200).json({ok:true, webhookUrl, telegram:data});
};
