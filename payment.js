// ===============================
// LOAD SELECTED PLAN
// ===============================

let selection = JSON.parse(localStorage.getItem("selectedPlan"));

const planPerks = {
  Pro: [
    "Unlimited projects",
    "Up to 10 team members",
    "Advanced analytics & charts",
    "Calendar sync & reminders",
    "Priority email support",
  ],
  Enterprise: [
    "Unlimited team members",
    "Custom roles & permissions",
    "Advanced security & audit logs",
    "Dedicated account manager",
    "API access",
  ],
};

// ===============================
// ELEMENTS
// ===============================

const summaryContent = document.getElementById("summaryContent");
const methodButtons = document.querySelectorAll(".payment-method-btn");
const cardFields = document.getElementById("cardFields");
const paypalFields = document.getElementById("paypalFields");
const upiFields = document.getElementById("upiFields");
const paymentForm = document.getElementById("paymentForm");
const payBtn = document.getElementById("payBtn");
const successOverlay = document.getElementById("successOverlay");
const successMessage = document.getElementById("successMessage");

let activeMethod = "card";

// ===============================
// GUARD: NO PLAN SELECTED
// ===============================

if (!selection) {
  summaryContent.innerHTML = `
        <p>No plan selected yet.</p>
        <a href="pricing.html" class="btn-outline" style="margin-top:15px;display:inline-block;">
            Choose a Plan
        </a>
    `;

  paymentForm.style.display = "none";
} else {
  renderSummary();
}

// ===============================
// RENDER ORDER SUMMARY
// ===============================

function renderSummary() {
  const perks = planPerks[selection.plan] || [];

  const cycleLabel = selection.cycle === "yearly" ? "per month, billed yearly" : "per month";

  summaryContent.innerHTML = `

        <div class="summary-plan">
            <h3>${selection.plan} Plan</h3>
            <span class="summary-price">$${selection.price}<small>/mo</small></span>
        </div>

        <p class="summary-cycle">${cycleLabel}</p>

        <ul class="summary-perks">
            ${perks.map((perk) => `<li><i class="fa-solid fa-check"></i> ${perk}</li>`).join("")}
        </ul>

        <div class="summary-total">
            <span>Total due today</span>
            <b>$${selection.price}.00</b>
        </div>

    `;
}

// ===============================
// PAYMENT METHOD SWITCHING
// ===============================

methodButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    methodButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    activeMethod = btn.dataset.method;

    cardFields.classList.toggle("hidden", activeMethod !== "card");
    paypalFields.classList.toggle("hidden", activeMethod !== "paypal");
    upiFields.classList.toggle("hidden", activeMethod !== "upi");
  });
});

// ===============================
// CARD NUMBER AUTO-FORMAT
// ===============================

const cardNumberInput = document.getElementById("cardNumber");

if (cardNumberInput) {
  cardNumberInput.addEventListener("input", () => {
    let digits = cardNumberInput.value.replace(/\D/g, "").slice(0, 16);
    cardNumberInput.value = digits.replace(/(.{4})/g, "$1 ").trim();
  });

  const expiryInput = document.getElementById("cardExpiry");

  expiryInput.addEventListener("input", () => {
    let digits = expiryInput.value.replace(/\D/g, "").slice(0, 4);

    if (digits.length > 2) {
      expiryInput.value = digits.slice(0, 2) + " / " + digits.slice(2);
    } else {
      expiryInput.value = digits;
    }
  });
}

// ===============================
// SUBMIT / VALIDATE / CONFIRM
// ===============================

paymentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!selection) return;

  if (activeMethod === "card") {
    const name = document.getElementById("cardName").value.trim();
    const number = document.getElementById("cardNumber").value.replace(/\s/g, "");
    const expiry = document.getElementById("cardExpiry").value.trim();
    const cvv = document.getElementById("cardCvv").value.trim();

    if (!name || number.length < 16 || expiry.length < 6 || cvv.length < 3) {
      alert("Please fill in all card details (this is a demo — try 16 dummy digits).");
      return;
    }
  } else if (activeMethod === "paypal") {
    const email = document.getElementById("paypalEmail").value.trim();

    if (!email.includes("@")) {
      alert("Enter a valid PayPal email to continue.");
      return;
    }
  } else if (activeMethod === "upi") {
    const upi = document.getElementById("upiId").value.trim();

    if (!upi.includes("@")) {
      alert("Enter a valid UPI ID (e.g. yourname@upi) to continue.");
      return;
    }
  }

  // Simulate processing delay for realism

  payBtn.disabled = true;
  payBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Processing...`;

  setTimeout(() => {
    localStorage.setItem("currentPlan", selection.plan);
    localStorage.removeItem("selectedPlan");

    successMessage.textContent = `You're now on the ${selection.plan} plan.`;
    successOverlay.classList.add("show");
  }, 1200);
});