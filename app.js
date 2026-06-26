const tg = window.Telegram?.WebApp;

if (tg) {
  tg.ready();
  tg.expand();
  tg.setHeaderColor("#090806");
  tg.setBackgroundColor("#090806");
}

const SNAP_URL = "https://www.snapchat.com/add/rkshop33k";

const products = [
  {
    id: "chatgpt",
    name: "ChatGPT Go",
    className: "chatgpt",
    icon: "AI",
    image: "chatgpt.png",
    subtitle: "IA premium • Productivité",
    plans: [{ label: "3 mois", price: "7,50€" }],
    features: ["Accès IA premium", "Réponses rapides", "Compte privé", "Livraison rapide"]
  },
  {
    id: "spotify",
    name: "Spotify Premium",
    className: "spotify",
    icon: "♬",
    image: "spotify.png",
    subtitle: "Musique sans limites",
    plans: [
      { label: "1 mois", price: "Prix sur demande" },
      { label: "3 mois", price: "2,50€" },
      { label: "12 mois", price: "Prix sur demande" }
    ],
    features: ["Sans publicité", "Téléchargement illimité", "Écoute hors ligne", "Sauts illimités"]
  },
  {
    id: "dazn",
    name: "DAZN",
    className: "dazn",
    icon: "DAZN",
    image: "dazn.png",
    subtitle: "Sport en direct",
    plans: [{ label: "12 mois", price: "4€" }],
    features: ["Football", "Boxe", "NBA", "MotoGP", "Accès sport complet"]
  },
  {
    id: "crunchyroll",
    name: "Crunchyroll",
    className: "crunchyroll",
    icon: "C",
    image: "crunchyroll.png",
    subtitle: "Anime premium",
    plans: [{ label: "12 mois", price: "2,50€" }],
    features: ["Catalogue anime", "HD / Full HD", "Sans publicité", "Accès rapide"]
  },
  {
    id: "disney",
    name: "Disney+",
    className: "disney",
    icon: "D+",
    image: "",
    subtitle: "Disney • Marvel • Pixar",
    plans: [{ label: "12 mois", price: "Prix sur demande" }],
    features: ["Disney", "Marvel", "Star Wars", "Pixar", "Films & séries"]
  },
  {
    id: "youtube",
    name: "YouTube Premium",
    className: "youtube",
    icon: "▶",
    image: "",
    subtitle: "Sans publicité",
    plans: [{ label: "1 mois", price: "Prix sur demande" }],
    features: ["Sans publicité", "Lecture arrière-plan", "YouTube Music", "Téléchargement"]
  },
  {
    id: "prime",
    name: "Prime Video",
    className: "prime",
    icon: "PV",
    image: "",
    subtitle: "Films & séries",
    plans: [{ label: "12 mois", price: "Prix sur demande" }],
    features: ["Prime Video", "Qualité HD", "Multi-appareils", "Livraison rapide"]
  }
];

const categoryGrid = document.getElementById("categoryGrid");

function buildCategories() {
  categoryGrid.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = `category ${product.className}`;
    card.onclick = () => openProduct(product.id);

    card.innerHTML = `
      <div class="category-logo-text">${product.icon}</div>
      <div>
        <h3>${product.name}</h3>
        <p>${product.subtitle}</p>
        <small>${product.plans.map(plan => `${plan.label} • ${plan.price}`).join("<br>")}</small>
      </div>
    `;

    categoryGrid.appendChild(card);
  });
}

function openProduct(id) {
  const product = products.find(item => item.id === id);
  const productHero = document.getElementById("productHero");

  const imageBlock = product.image
    ? `<img class="product-poster" src="${product.image}" alt="${product.name}">`
    : "";

  productHero.innerHTML = `
    ${imageBlock}

    <div class="product-content ${product.className}">
      <h2>${product.name}</h2>
      <p>${product.subtitle}</p>

      <h3>Offres disponibles</h3>

      ${product.plans.map(plan => `
        <div class="plan">
          <div>
            <strong>${plan.label}</strong>
            <p>${plan.price}</p>
          </div>
          <button class="buy-btn" onclick="orderProduct('${product.id}', '${plan.label}', '${plan.price}')">
            Commander
          </button>
        </div>
      `).join("")}

      <h3>Inclus</h3>

      <div class="features">
        ${product.features.map(feature => `<div class="feature">✅ ${feature}</div>`).join("")}
      </div>
    </div>
  `;

  showPage("product");
}

function orderProduct(productId, plan, price) {
  const product = products.find(item => item.id === productId);

  const order = {
    product: product.name,
    plan,
    price
  };

  localStorage.setItem("rkshop_last_order", JSON.stringify(order));

  const lastOrder = document.getElementById("lastOrder");
  if (lastOrder) {
    lastOrder.textContent = `${product.name} - ${plan} - ${price}`;
  }

  if (tg) {
    tg.showAlert(`Commande : ${product.name} - ${plan}`);
  }

  window.open(SNAP_URL, "_blank");
}

function showPage(pageId, button = null) {
  document.querySelectorAll(".page").forEach(page => page.classList.remove("active"));
  document.getElementById(pageId).classList.add("active");

  document.querySelectorAll(".nav").forEach(nav => nav.classList.remove("active"));
  if (button) button.classList.add("active");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showHome() {
  showPage("home", document.querySelector(".nav"));
}

function scrollToCategories() {
  document.getElementById("categories").scrollIntoView({ behavior: "smooth" });
}

function openSupport() {
  window.open(SNAP_URL, "_blank");
}

function openSnap() {
  window.open(SNAP_URL, "_blank");
}

function openTelegram() {
  window.open(SNAP_URL, "_blank");
}

buildCategories();

