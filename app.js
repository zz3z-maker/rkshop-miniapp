const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
  tg.setHeaderColor("#090806");
  tg.setBackgroundColor("#090806");
}

const products = [
  {
    id: "netflix",
    name: "Netflix",
    icon: "N",
    accent: "#e50914",
    subtitle: "Premium • Films & séries",
    price: "4€",
    period: "à vie",
    features: ["Accès complet", "Qualité premium", "Profils multiples", "Livraison rapide"]
  },
  {
    id: "spotify",
    name: "Spotify",
    icon: "♬",
    accent: "#1db954",
    subtitle: "Premium • Musique illimitée",
    price: "2,50€",
    period: "3 mois",
    features: ["Sans publicité", "Téléchargement illimité", "Écoute hors ligne", "Sauts de pistes illimités"]
  },
  {
    id: "crunchyroll",
    name: "Crunchyroll",
    icon: "C",
    accent: "#f47521",
    subtitle: "Anime • Méga fan",
    price: "2,50€",
    period: "à vie",
    features: ["Catalogue complet", "Sans publicité", "HD / Full HD", "Sorties prioritaires"]
  },
  {
    id: "dazn",
    name: "DAZN",
    icon: "DAZN",
    accent: "#ffffff",
    subtitle: "Sport en direct",
    price: "4€",
    period: "3 mois",
    features: ["Football", "Boxe", "NBA", "MotoGP"]
  },
  {
    id: "disney",
    name: "Disney+",
    icon: "D+",
    accent: "#1f80e0",
    subtitle: "Films • séries • famille",
    price: "3€",
    period: "3 mois",
    features: ["Marvel", "Star Wars", "Pixar", "Disney Originals"]
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: "▶",
    accent: "#ff0000",
    subtitle: "Premium",
    price: "3€",
    period: "3 mois",
    features: ["Sans pubs", "Lecture arrière-plan", "YouTube Music", "Téléchargement"]
  },
  {
    id: "prime",
    name: "Prime Video",
    icon: "PV",
    accent: "#00a8e1",
    subtitle: "Films & séries",
    price: "3€",
    period: "3 mois",
    features: ["Prime Video", "Qualité HD", "Multi-appareils", "Livraison rapide"]
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    icon: "AI",
    accent: "#10a37f",
    subtitle: "IA • Productivité",
    price: "7,50€",
    period: "3 mois",
    features: ["Accès GPT", "Réponses rapides", "Compte privé", "Support"]
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: "♪",
    accent: "#00f2ea",
    subtitle: "Services digitaux",
    price: "Sur demande",
    period: "",
    features: ["Service rapide", "Support", "Commande personnalisée"]
  },
  {
    id: "steam",
    name: "Steam",
    icon: "S",
    accent: "#66c0f4",
    subtitle: "Gaming",
    price: "Sur demande",
    period: "",
    features: ["Cartes", "Comptes", "Services gaming"]
  },
  {
    id: "roblox",
    name: "Roblox",
    icon: "◆",
    accent: "#ffffff",
    subtitle: "Gaming",
    price: "Sur demande",
    period: "",
    features: ["Robux", "Comptes", "Services"]
  },
  {
    id: "fortnite",
    name: "Fortnite",
    icon: "F",
    accent: "#7d4cff",
    subtitle: "Gaming",
    price: "Sur demande",
    period: "",
    features: ["V-Bucks", "Comptes", "Services"]
  }
];

const grid = document.getElementById("categoryGrid");

products.forEach(product => {
  const card = document.createElement("div");
  card.className = "category";
  card.style.setProperty("--accent", product.accent);
  card.onclick = () => openProduct(product.id);

  card.innerHTML = `
    <div class="category-content">
      <span class="icon">${product.icon}</span>
      <span class="name">${product.name}</span>
      <span class="small">${product.subtitle}</span>
    </div>
  `;

  grid.appendChild(card);
});

function showPage(id, btn) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  document.querySelectorAll(".nav").forEach(n => n.classList.remove("active"));
  if (btn) btn.classList.add("active");
}

function showHome() {
  showPage("home", document.querySelector(".nav"));
}

function openProduct(id) {
  const product = products.find(p => p.id === id);
  const container = document.getElementById("productHero");
  container.style.setProperty("--accent", product.accent);

  container.innerHTML = `
    <div class="product-head">
      <h2>${product.name}</h2>
      <p>${product.subtitle}</p>
      <div class="price">${product.price}</div>
      <b>${product.period}</b>
    </div>

    <div class="product-body">
      <h3>Inclus</h3>
      <div class="features">
        ${product.features.map(f => `<div class="feature">✅ ${f}</div>`).join("")}
      </div>

      <button class="order-btn" onclick="orderProduct('${product.id}')">
        Commander ${product.name}
      </button>
    </div>
  `;

  showPage("product");
}

function orderProduct(id) {
  const product = products.find(p => p.id === id);
  const payload = {
    action: "order",
    product: product.name,
    price: product.price,
    period: product.period
  };

  if (tg) {
    tg.sendData(JSON.stringify(payload));
    tg.showAlert(`Commande envoyée : ${product.name}`);
  } else {
    alert(`Commande : ${product.name}\nPrix : ${product.price}`);
  }
}

function openSupport() {
  window.open("https://t.me/TON_USERNAME", "_blank");
}

function openSnap() {
  window.open("https://www.snapchat.com/add/rkshop33k", "_blank");
}

function openTelegram() {
  window.open("https://t.me/TON_USERNAME", "_blank");
}
