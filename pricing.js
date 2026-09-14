// ===============================
// ELEMENTS
// ===============================

const billingSwitch = document.getElementById("billingSwitch");
const monthlyLabel = document.getElementById("monthlyLabel");
const yearlyLabel = document.getElementById("yearlyLabel");
const amounts = document.querySelectorAll(".amount");
const chooseButtons = document.querySelectorAll(".choose-plan");

let yearly = false;

// ===============================
// BILLING TOGGLE
// ===============================

function updatePrices() {
  amounts.forEach((el) => {
    const value = yearly ? el.dataset.yearly : el.dataset.monthly;
    el.textContent = "$" + value;
  });

  monthlyLabel.classList.toggle("active", !yearly);
  yearlyLabel.classList.toggle("active", yearly);
  billingSwitch.classList.toggle("on", yearly);
}

billingSwitch.addEventListener("click", () => {
  yearly = !yearly;
  updatePrices();
});

// ===============================
// HIGHLIGHT CURRENT PLAN
// ===============================

function markCurrentPlan() {
  const current = localStorage.getItem("currentPlan");

  if (!current) return;

  document.querySelectorAll(".pricing-card").forEach((card) => {
    const planName = card.querySelector(".choose-plan").dataset.plan;

    if (planName === current) {
      card.classList.add("current-plan");

      const btn = card.querySelector(".choose-plan");
      btn.textContent = "Current Plan";
      btn.disabled = true;
    }
  });
}

// ===============================
// CHOOSE PLAN -> GO TO PAYMENT
// ===============================

chooseButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.disabled) return;

    const plan = btn.dataset.plan;
    const basePrice = billingSwitch.classList.contains("on")
      ? btn.closest(".pricing-card").querySelector(".amount").dataset.yearly
      : btn.closest(".pricing-card").querySelector(".amount").dataset.monthly;

    if (Number(basePrice) === 0) {
      localStorage.setItem("currentPlan", plan);
      alert("You're all set! Starter plan activated.");
      window.location.href = "dashboard.html";
      return;
    }

    const selection = {
      plan: plan,
      price: basePrice,
      cycle: yearly ? "yearly" : "monthly",
    };

    localStorage.setItem("selectedPlan", JSON.stringify(selection));

    window.location.href = "payment.html";
  });
});

// ===============================
// INITIAL LOAD
// ===============================

updatePrices();
markCurrentPlan();