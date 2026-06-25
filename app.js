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
    plans: [
      { label: "12 mois", price: "Prix sur demande" }
    ],
    features: ["Accès premium", "Films & séries", "Multi-appareils", "Livraison rapide"]
  },
  {
    id: "dazn",
    name: "DAZN",
    icon: "DAZN",
    accent: "#ffffff",
    subtitle: "Sport en direct",
    plans: [
      { label: "12 mois", price: "Prix sur demande" }
    ],
    features: ["Football", "Boxe", "NBA", "MotoGP", "Accès sport complet"]
  },
  {
    id: "disney",
    name: "Disney+",
    icon: "D+",
    accent: "#1f80e0",
    subtitle: "Disney • Marvel • Pixar",
    plans: [
      { label: "12 mois", price: "Prix sur demande" }
    ],
    features: ["Disney", "Marvel", "Star Wars", "Pixar", "Films & séries"]
  },
  {
    id: "prime",
    name: "Prime Video",
    icon: "PV",
    accent: "#00a8e1",
    subtitle: "Films & séries",
    plans: [
      { label: "12 mois", price: "Prix sur demande" }
    ],
    features: ["Prime Video", "Qualité HD", "Multi-appareils", "Livraison rapide"]
  },
  {
    id: "youtube",
    name: "YouTube Premium",
    icon: "▶",
    accent: "#ff0000",
    subtitle: "Sans publicité",
    plans: [
      { label: "1 mois", price: "Prix sur demande" }
    ],
    features: ["Sans pubs", "Lecture arrière-plan", "YouTube Music", "Téléchargement"]
  },
  {
    id: "spotify",
    name: "Spotify",
    icon: "♬",
    accent: "#1db954",
    subtitle: "Premium • Musique illimitée",
    plans: [
      { label: "1 mois", price: "Prix sur demande" },
      { label: "3 mois", price: "Prix sur demande" },
      { label: "12 mois", price: "Prix sur demande" }
    ],
    features: ["Sans publicité", "Téléchargement illimité", "Écoute hors ligne", "Sauts illimités"]
  },
  {
    id: "crunchyroll",
    name: "Crunchyroll",
    icon: "C",
    accent: "#f47521",
    subtitle: "Anime • Manga • Streaming",
    plans: [
      { label: "12 mois", price: "Prix sur demande" }
    ],
    features: ["Catalogue anime", "HD / Full HD", "Sans publicité", "Accès rapide"]
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
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");

  document.querySelectorAll(".nav").forEach(nav => {
    nav.classList.remove("active");
  });

  if (btn) {
    btn.classList.add("active");
  }
}

function showHome() {
  showPage("home", document.querySelector(".nav"));
}

function openProduct(id) {
  const product = products.find(item => item.id === id);
  const container = document.getElementById("productHero");

  container.style.setProperty("--accent", product.accent);

  container.innerHTML = `
    <div class="product-head">
      <h2>${product.name}</h2>
      <p>${product.subtitle}</p>
    </div>

    <div class="product-body">
      <h3>Offres disponibles</h3>

      <div class="plans">
        ${product.plans.map(plan => `
          <button class="plan-btn" onclick="selectPlan('${product.id}', '${plan.label}', '${plan.price}')">
            <strong>${plan.label}</strong>
            <span>${plan.price}</span>
          </button>
        `).join("")}
      </div>

      <h3>Inclus</h3>

      <div class="features">
        ${product.features.map(feature => `
          <div class="feature">✅ ${feature}</div>
        `).join("")}
      </div>
    </div>
  `;

  showPage("product");
}

function selectPlan(productId, label, price) {
  const product = products.find(item => item.id === productId);

  const payload = {
    action: "order",
    product: product.name,
    duration: label,
    price: price
  };

  if (tg) {
    tg.sendData(JSON.stringify(payload));
    tg.showAlert(`Commande envoyée : ${product.name} - ${label}`);
  } else {
    alert(`Commande : ${product.name}\nDurée : ${label}\nPrix : ${price}`);
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
