/*********************************
 ACCORDION TOGGLE
**********************************/
document.querySelectorAll(".accordion-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const content = btn.nextElementSibling;
    btn.classList.toggle("active");
    content.style.maxHeight = content.style.maxHeight
      ? null
      : content.scrollHeight + "px";
  });
});


/*********************************
 CATERING PAGE LOGIC
**********************************/
document.addEventListener("DOMContentLoaded", () => {

  const guestInput = document.getElementById("guestCount");
  const cateringCheckboxes = document.querySelectorAll(
    ".accordion-content input[type='checkbox']"
  );
  const cateringTotalEl = document.getElementById("totalAmount");
  const cateringWhatsappBtn = document.getElementById("whatsappEnquiry");

  function calculateCateringTotal() {
    if (!guestInput || !cateringTotalEl || !cateringWhatsappBtn) return;

    const guests = parseInt(guestInput.value);
    if (!guests || guests <= 0) {
      cateringTotalEl.textContent = "₹0";
      cateringWhatsappBtn.removeAttribute("href");
      return;
    }

    let perPlate = 0;
    let items = [];

    cateringCheckboxes.forEach(cb => {
      if (cb.checked) {
        perPlate += Number(cb.dataset.price || 0);
        items.push(cb.parentElement.textContent.trim());
      }
    });

    const total = perPlate * guests;
    cateringTotalEl.textContent = "₹" + total.toLocaleString("en-IN");

    let message =
      `Hello, I want catering service from Bhiwadi Bakers.%0A%0A` +
      `Guests: ${guests}%0A` +
      `Per Plate: ₹${perPlate}%0A%0A`;

    items.forEach(i => (message += `- ${i}%0A`));
    message += `%0ATotal: ₹${total}`;

    cateringWhatsappBtn.href =
      `https://wa.me/919784002700?text=${message}`;
  }

  if (guestInput) guestInput.addEventListener("input", calculateCateringTotal);
  cateringCheckboxes.forEach(cb =>
    cb.addEventListener("change", calculateCateringTotal)
  );
});


/*********************************
 SWEETS PAGE – AUTO CHECK + TOTAL
**********************************/
document.addEventListener("DOMContentLoaded", () => {

  const sweetTotalEl = document.getElementById("sweetTotal");
  const orderBtn = document.getElementById("sweetOrderBtn");

  document.querySelectorAll(".sweet-line").forEach(row => {
    const checkbox = row.querySelector(".sweet-item");
    const qtyInput = row.querySelector(".sweet-qty");
    const unit = checkbox.dataset.unit;

    // Qty typing → auto checkbox
    qtyInput.addEventListener("input", () => {
      if (qtyInput.value.startsWith(".")) {
        qtyInput.value = "0" + qtyInput.value;
      }

      const qty = parseFloat(qtyInput.value);
      checkbox.checked = !isNaN(qty) && qty > 0;
      calculateSweetTotal();
    });

    // Checkbox click → auto qty
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        if (!qtyInput.value || qtyInput.value === "0") {
          qtyInput.value = "1"; // ✅ default 1 kg
        }
        qtyInput.focus();
      } else {
        qtyInput.value = "";
      }
      calculateSweetTotal();
    });
  });

  function calculateSweetTotal() {
    let total = 0;

    document.querySelectorAll(".sweet-line").forEach(row => {
      const checkbox = row.querySelector(".sweet-item");
      const qtyInput = row.querySelector(".sweet-qty");
      const price = Number(checkbox.dataset.price);
      const qty = parseFloat(qtyInput.value);

      if (checkbox.checked && qty > 0) {
        total += price * qty;
      }
    });

    if (sweetTotalEl) {
      sweetTotalEl.textContent = "₹" + total.toLocaleString("en-IN");
    }
  }

  /*********************************
   SWEETS ORDER → WHATSAPP
  **********************************/
  if (!orderBtn) return;

  orderBtn.addEventListener("click", () => {

    const name = document.getElementById("custName").value.trim();
    const phone = document.getElementById("custPhone").value.trim();
    const address = document.getElementById("custAddress").value.trim();

    if (!name || !phone || !address) {
      alert("Please fill all customer details.");
      return;
    }

    // ✅ Auto-generate Google Maps link
    const mapsLink =
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(address);

    const paymentMethod =
      document.querySelector("input[name='paymentMethod']:checked")?.value
      || "Not specified";

    let orderList = "";
    let total = 0;

    document.querySelectorAll(".sweet-line").forEach(row => {
      const checkbox = row.querySelector(".sweet-item");
      const qtyInput = row.querySelector(".sweet-qty");

      if (!checkbox.checked) return;

      const qty = parseFloat(qtyInput.value);
      if (!qty || qty <= 0) return;

      const price = Number(checkbox.dataset.price);
      const name = checkbox.dataset.name;
      const unit = checkbox.dataset.unit;

      total += price * qty;
      orderList += `• ${name} – ${qty} ${unit}\n`;
    });

    if (!orderList) {
      alert("Please select at least one sweet.");
      return;
    }

    const message =
`Hello Bhiwadi Bakers 👋

🍬 Sweet Order
${orderList}

💰 Total Amount: ₹${total}

👤 Name: ${name}
📞 Phone: ${phone}
🏠 Address: ${address}
📍 Google Maps: ${mapsLink}
💳 Payment: ${paymentMethod}

Please confirm availability & delivery time.`;

    window.open(
      "https://wa.me/919784002700?text=" +
      encodeURIComponent(message),
      "_blank"
    );
  });
});






/*********************************
 FEEDBACK → WHATSAPP
**********************************/
document.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("sendFeedbackBtn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const name = document.getElementById("fbName")?.value.trim();
    const rating = document.getElementById("fbRating")?.value;
    const review = document.getElementById("fbMessage")?.value.trim();

    if (!name || !rating || !review) {
      alert("Please fill all fields");
      return;
    }

    const message =
      `⭐ Customer Feedback ⭐\n\n` +
      `Name: ${name}\n` +
      `Rating: ${rating}\n\n` +
      `Review:\n${review}\n\n` +
      `Photos can be shared in WhatsApp.`;

    window.open(
      "https://wa.me/919784002700?text=" +
      encodeURIComponent(message),
      "_blank"
    );

    document.getElementById("fbName").value = "";
    document.getElementById("fbRating").value = "";
    document.getElementById("fbMessage").value = "";
  });
});










orderBtn.addEventListener("click", () => {

  const address = document.getElementById("custAddress").value.trim();

  const mapsLink =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(address);

  console.log(mapsLink); // 🔍 test log

})














const btn = document.getElementById("sendReviewBtn");

btn.onclick = function () {
  const name = document.getElementById("revName").value.trim();
  const rating = document.getElementById("revRating").value;
  const review = document.getElementById("revMessage").value.trim();

  if (!name || !rating || !review) {
    alert("Please fill all fields");
    return;
  }

  const message =
`⭐ Customer Review ⭐

👤 Name: ${name}
⭐ Rating: ${rating}

💬 Review:
${review}`;

  // 🔥 MOST RELIABLE METHOD
  window.location.href =
    "https://wa.me/919784002700?text=" +
    encodeURIComponent(message);
};
