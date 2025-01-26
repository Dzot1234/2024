document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const login = document.getElementById("login").value.trim();
    const password = document.getElementById("password").value.trim();
    const data = { login, password };

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.querySelector(".login-section").style.display = "none";
            document.querySelector(".admin-panel").classList.remove("hidden");
            document.getElementById("error-message").style.display = "none";
        } else {
            document.getElementById("error-message").style.display = "block";
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
        document.getElementById("error-message").innerText = "Ошибка сети";
        document.getElementById("error-message").style.display = "block";
    });
});

async function loadAdminConcerts() {
    try {
      const response = await fetch("/api/concerts");
      const concerts = await response.json();
      const listContainer = document.getElementById("concerts-list");
  
      listContainer.innerHTML = "";
  
      concerts.forEach(concert => {
        const concertElement = document.createElement("div");
        concertElement.classList.add("concert-item");
        concertElement.innerHTML = `
          <p><strong>Дата:</strong> ${concert.date}</p>
          <p><strong>Город:</strong> ${concert.city}</p>
          <p><strong>Место:</strong> ${concert.venue}</p>
          <button onclick="editConcert(${concert.id})">Редактировать</button>
          <button onclick="deleteConcert(${concert.id})">Удалить</button>
        `;
  
        listContainer.appendChild(concertElement);
      });
    } catch (error) {
      console.error("Ошибка загрузки концертов:", error);
    }
  }
  
  async function addConcert(event) {
    event.preventDefault();
  
    const date = document.getElementById("concert-date").value;
    const city = document.getElementById("concert-city").value;
    const venue = document.getElementById("concert-venue").value;
  
    try {
      const response = await fetch("/api/concerts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date, city, venue }),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        loadAdminConcerts();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Ошибка при добавлении концерта:", error);
    }
  }
  
  async function deleteConcert(id) {
    try {
      const response = await fetch(`/api/concerts/${id}`, {
        method: "DELETE",
      });
  
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        loadAdminConcerts();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Ошибка при удалении концерта:", error);
    }
  }
  
  document.getElementById("add-concert-form").addEventListener("submit", addConcert);
  loadAdminConcerts();
  
  async function editConcert(concertId) {
  const modal = document.getElementById("edit-concert-modal");
  modal.classList.remove("hidden");

  fetch(`/api/concerts/${concertId}`)
    .then(response => response.json())
    .then(concert => {
      document.getElementById("edit-concert-date").value = concert.date;
      document.getElementById("edit-concert-city").value = concert.city;
      document.getElementById("edit-concert-venue").value = concert.venue;
      document.getElementById("edit-concert-form").dataset.concertId = concertId;
    })
    .catch(error => {
      console.error("Ошибка загрузки данных концерта:", error);
      alert("Ошибка загрузки данных.");
    });
}

function hideEditModal() {
  const modal = document.getElementById("edit-concert-modal");
  modal.classList.add("hidden");
}

document.getElementById("edit-concert-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const concertId = event.target.dataset.concertId;
  const date = document.getElementById("edit-concert-date").value;
  const city = document.getElementById("edit-concert-city").value;
  const venue = document.getElementById("edit-concert-venue").value;

  try {
    const response = await fetch(`/api/concerts/${concertId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date, city, venue }),
    });

    const result = await response.json();

    if (response.ok) {
      alert(result.message);
      hideEditModal();
      loadAdminConcerts();
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error("Ошибка при сохранении изменений:", error);
    alert("Ошибка сервера.");
  }
});

document.getElementById("close-modal").addEventListener("click", hideEditModal);

function showTicketsModal(concertId) {
    const modal = document.getElementById("tickets-modal");
    const ticketsList = document.getElementById("tickets-list");
  
    modal.classList.remove("hidden");
    ticketsList.innerHTML = "<p>Загрузка...</p>";
  
    fetch(`/api/concerts/${concertId}/tickets`)
      .then(response => response.json())
      .then(tickets => {
        ticketsList.innerHTML = tickets.map(ticket => `
          <div class="ticket-item">
            <p><strong>Ряд:</strong> ${ticket.row}, <strong>Место:</strong> ${ticket.seat}</p>
            <p><strong>Имя:</strong> ${ticket.buyerName || "—"}</p>
            <p><strong>Email:</strong> ${ticket.buyerEmail || "—"}</p>
            <p><strong>Телефон:</strong> ${ticket.buyerPhone || "—"}</p>
            <button onclick="editTicket(${ticket.id})">Редактировать</button>
          </div>
        `).join("");
      })
      .catch(error => {
        console.error("Ошибка загрузки билетов:", error);
        ticketsList.innerHTML = "<p>Не удалось загрузить билеты.</p>";
      });
  }
  
  function hideTicketsModal() {
    const modal = document.getElementById("tickets-modal");
    modal.classList.add("hidden");
  }
  
  document.getElementById("close-tickets-modal").addEventListener("click", hideTicketsModal);

  function editTicket(ticketId) {
    const modal = document.getElementById("edit-ticket-modal");
    modal.classList.remove("hidden");
  
    fetch(`/api/tickets/${ticketId}`)
      .then(response => response.json())
      .then(ticket => {
        document.getElementById("edit-ticket-row").value = ticket.row;
        document.getElementById("edit-ticket-seat").value = ticket.seat;
        document.getElementById("edit-ticket-name").value = ticket.buyerName || "";
        document.getElementById("edit-ticket-email").value = ticket.buyerEmail || "";
        document.getElementById("edit-ticket-phone").value = ticket.buyerPhone || "";
        document.getElementById("edit-ticket-form").dataset.ticketId = ticketId;
      })
      .catch(error => {
        console.error("Ошибка загрузки данных билета:", error);
        alert("Ошибка загрузки данных билета.");
      });
  }
  
  function hideEditTicketModal() {
    const modal = document.getElementById("edit-ticket-modal");
    modal.classList.add("hidden");
  }
  
  document.getElementById("close-edit-ticket-modal").addEventListener("click", hideEditTicketModal);

  document.getElementById("edit-ticket-form").addEventListener("submit", async (event) => {
    event.preventDefault();
  
    const ticketId = event.target.dataset.ticketId;
    const row = document.getElementById("edit-ticket-row").value;
    const seat = document.getElementById("edit-ticket-seat").value;
    const buyerName = document.getElementById("edit-ticket-name").value;
    const buyerEmail = document.getElementById("edit-ticket-email").value;
    const buyerPhone = document.getElementById("edit-ticket-phone").value;
  
    try {
      const response = await fetch(`/api/tickets/${ticketId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ row, seat, buyerName, buyerEmail, buyerPhone }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert(result.message);
        hideEditTicketModal();
        showTicketsModal(result.concertId);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Ошибка при обновлении билета:", error);
      alert("Ошибка сервера.");
    }
  });