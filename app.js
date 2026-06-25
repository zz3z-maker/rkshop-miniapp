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
    className: "netflix",
    icon: "N",
    subtitle: "Films & séries",
    plans: ["12 mois"]
  },
  {
    id: "spotify",
    name: "Spotify",
    className: "spotify",
    icon: "♬",
    subtitle: "Musique premium",
    plans: ["1 mois", "3 mois", "12 mois"]
  },
  {
    id: "disney",
    name: "Disney+",
    className: "disney",
    icon: "D+",
    subtitle: "Disney • Marvel • Pixar",
    plans: ["12 mois"]
  },
  {
    id: "prime",
    name: "Prime Video",
    className: "prime",
    icon: "PV",
    subtitle: "Films & séries",
    plans: ["12 mois"]
  },
  {
    id: "youtube",
    name: "YouTube Premium",
    className: "youtube",
    icon: "▶",
    subtitle: "Sans publicité",
    plans: ["1 mois"]
  },
  {
    id: "crunchyroll",
    name: "Crunchyroll",
    className: "crunchyroll",
    icon: "C",
    subtitle: "Anime premium",
    plans: ["12 mois"]
  },
  {
    id: "dazn",
    name: "DAZN",
    className: "dazn",
    icon: "DAZN",
    subtitle: "Sport live",
    plans: ["12 mois"]
  }
];

const categoryGrid = document.getElementById("categoryGrid");

products.forEach(product => {
  const card = document.createElement("div");
  card.className = `category ${product.className}`;
  card.onclick = () => openProduct(product.id);

  card.innerHTML = `
    <div class="category-logo-text">${product.icon}</div>
    <div>
      <h3>${product.name}</h3>
      <p>${product.subtitle}</p>
    </div>
  `;

  categoryGrid.appendChild(card);
});

function openProduct(id) {
  const product = products.find(item => item.id === id);
  const productHero = document.getElementById("productHero");

  productHero.innerHTML = `
    <h2>${product.name}</h2>
    <p>${product.subtitle}</p>

    ${product.plans.map(plan => `
      <div class="plan">
        <div>
          <strong>${plan}</strong>
          <p>Prix sur demande</p>
        </div>
        <button class="buy-btn" onclick="orderProduct('${product.id}', '${plan}')">
          Commander
        </button>
      </div>
    `).join("")}
  `;

  showPage("product");
}

function orderProduct(productId, plan) {
  const product = products.find(item => item.id === productId);

  const order = {
    action: "order",
    product: product.name,
    plan: plan
  };

  if (tg) {
    tg.sendData(JSON.stringify(order));
    tg.showAlert(`Commande envoyée : ${product.name} - ${plan}`);
  } else {
    alert(`Commande : ${product.name}\nFormule : ${plan}`);
  }
}

function showPage(pageId, button = null) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  document.getElementById(pageId).classList.add("active");

  document.querySelectorAll(".nav").forEach(nav => {
    nav.classList.remove("active");
  });

  if (button) {
    button.classList.add("active");
  }
}

function showHome() {
  showPage("home", document.querySelector(".nav"));
}

function scrollToCategories() {
  document.getElementById("categories").scrollIntoView({
    behavior: "smooth"
  });
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
