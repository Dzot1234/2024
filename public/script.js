async function loadConcerts() {
    try {
      const response = await fetch("/api/concerts");
      const concerts = await response.json();
  
      const container = document.getElementById("tour-events");
      container.innerHTML = "";
  
      concerts.forEach((concert) => {
        const concertElement = document.createElement("article");
        concertElement.classList.add("tour-event");
  
        const concertDate = new Date(concert.date);
  
        // Форматируем дату для отображения
        const formattedDate = concertDate.toLocaleDateString("ru-RU", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }).toUpperCase();
  
        concertElement.innerHTML = `
        <div class="event-details">
          <p class="event-date">${formattedDate}</p>
          <h2 class="event-city">${concert.city}</h2>
          <p class="event-venue">${concert.venue}</p>
        </div>
        <div class="button">
         <a href="booking.html?id=${concert.id}">Купить билеты</a>
        </div>
      `;
        container.appendChild(concertElement);
      });
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    }
  }
  
  loadConcerts();

  document.getElementById("contactForm").addEventListener("submit", async (event) => {
    event.preventDefault();
  
    const formData = {
      name: document.getElementById("name").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("email").value,
      comment: document.getElementById("comment").value,
    };
  
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        alert("Сообщение отправлено!");
      } else {
        alert("Ошибка при отправке сообщения.");
      }
    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
      alert("Ошибка при отправке сообщения.");
    }
  });