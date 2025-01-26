document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".submit-btn span").addEventListener("click", async () => {

const params = new URLSearchParams(window.location.search);
const concertId = params.get("id");

const row = document.querySelector("#row").value;
const seat = document.querySelector("#seat").value;
const name = document.querySelector("#name").value;
const email = document.querySelector("#email").value;
const phone = document.querySelector("#phone").value;
const price = document.querySelector("#price").value;

if (row < 1 || row > 9) {
  alert("Пожалуйста, выберите ряд от 1 до 9.");
  return;
}

if (seat < 1 || seat > 15) {
  alert("Пожалуйста, выберите место от 1 до 15.");
  return;
}

if (!row || !seat || !name || !email || !phone || !concertId) {
  alert("Пожалуйста, заполните все поля!");
  return;
}

console.log("Данные для отправки:", { concertId, row, seat, name, email, phone, price });

try {
  const response = await fetch("/api/book-ticket", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      concertId,
      row,
      seat,
      name,
      email,
      phone,
      price,
    }),
  });

  const result = await response.json();
  console.log("Ответ от сервера:", result);

  if (response.ok) {
    alert(result.message);
  } else {
    alert(result.message);
  }
} catch (error) {
  console.error("Ошибка при отправке данных:", error);
  alert("Ошибка сервера");
}
});
});

document.querySelector("#row").addEventListener("input", () => {
console.log("Ряд выбран:", document.querySelector("#row").value);
const row = document.querySelector("#row").value;
const priceInput = document.querySelector("#price");

let price = 0;

if (row >= 1 && row <= 3) {
  price = 2500;
} else if (row >= 4 && row <= 6) {
  price = 2000;
} else if (row >= 7 && row <= 9) {
  price = 1500;
}

priceInput.value = price;
});