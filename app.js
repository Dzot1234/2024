const express = require("express");
const { Concert, Ticket, Admin } = require("./models");
const moment = require("moment");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vladborsch9000@gmail.com",
    pass: "bsae skof jiql itae",
  },
});

app.get('/api/concerts', async (req, res) => {
    try {
        const concerts = await Concert.findAll();
        const formattedConcerts = concerts.map(concert => {
            const date = concert.date.toISOString().split('T')[0];
            return {
                id: concert.id,
                date: date,
                city: concert.city,
                venue: concert.venue,
            };
        });
        res.json(formattedConcerts);
    } catch (error) {
        console.error("Ошибка при получении концертов:", error);
        res.status(500).send("Ошибка сервера");
    }
});

app.post("/api/login", async (req, res) => {
  const { login, password } = req.body;
  try {
      const admin = await Admin.findOne({ where: { login, password } });
      if (!admin) {
          return res.status(401).json({ success: false, message: "Неверный логин или пароль" });
      }
      res.json({ success: true, message: "Авторизация успешна" });
  } catch (err) {
      console.error("Ошибка при авторизации:", err);
      res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
});


app.post("/api/concerts", async (req, res) => {
  const { date, city, venue } = req.body;

  try {
    const newConcert = await Concert.create({ date, city, venue });
    res.status(201).json({ message: "Концерт добавлен успешно", concert: newConcert });
  } catch (error) {
    console.error("Ошибка при добавлении концерта:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

app.get("/api/concerts/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const concert = await Concert.findByPk(id);
    if (!concert) {
      return res.status(404).json({ message: "Концерт не найден" });
    }

    res.json(concert);
  } catch (error) {
    console.error("Ошибка при получении концерта:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

app.put("/api/concerts/:id", async (req, res) => {
  const { id } = req.params;
  const { date, city, venue } = req.body;

  try {
    const concert = await Concert.findByPk(id);
    if (!concert) {
      return res.status(404).json({ message: "Концерт не найден" });
    }

    await concert.update({ date, city, venue });
    res.json({ message: "Концерт обновлён успешно", concert });
  } catch (error) {
    console.error("Ошибка при обновлении концерта:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

app.delete("/api/concerts/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const concert = await Concert.findByPk(id);
    if (!concert) {
      return res.status(404).json({ message: "Концерт не найден" });
    }

    await concert.destroy();
    res.json({ message: "Концерт удалён успешно" });
  } catch (error) {
    console.error("Ошибка при удалении концерта:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

app.put("/api/tickets/:id", async (req, res) => {
  const { id } = req.params;
  const { row, seat, buyerName, buyerEmail, buyerPhone } = req.body;

  try {
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ message: "Билет не найден" });
    }

    await ticket.update({ row, seat, buyerName, buyerEmail, buyerPhone });
    res.json({ message: "Билет обновлён успешно", ticket });
  } catch (error) {
    console.error("Ошибка при обновлении билета:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

app.get("/api/tickets/:concertId", async (req, res) => {
  try {
    const concertId = req.params.concertId;
    const tickets = await Ticket.findAll({ where: { concertId } });

    console.log(tickets);  // Логируем билеты перед отправкой на клиент

    if (tickets && Array.isArray(tickets)) {
      res.json(tickets);  // Возвращаем массив билетов
    } else {
      res.status(404).json({ message: "Билеты не найдены" });
    }
  } catch (error) {
    console.error("Ошибка при загрузке билетов:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

app.post("/api/contact", async (req, res) => {
  const { name, phone, email, comment } = req.body;

  if (!name || !phone || !email || !comment) {
    return res.status(400).json({ message: "Все поля должны быть заполнены." });
  }

  try {

    const mailOptions = {
      from: `"Сотрудничество" <vladborsch9000@gmail.com>`,
      to: "vladborsch9000@gmail.com", 
      subject: "Новое сообщение о сотрудничестве",
      text: `
        Имя: ${name}
        Телефон: ${phone}
        Email: ${email}
        Комментарий: ${comment}
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log("Письмо успешно отправлено.");
    res.status(200).json({ message: "Письмо успешно отправлено!" });
  } catch (error) {
    console.error("Ошибка при отправке email:", error);
    res.status(500).json({ message: "Ошибка при отправке письма." });
  }
});


async function sendEmail(concert, name, email, row, seat, price, phone) {
  const mailOptions = {
    from: "your-email@gmail.com",
    to: email,
    subject: "Чек за бронирование билета",
    text: `
      Здравствуйте, ${name}!

      Вы успешно забронировали билет на концерт:
      Концерт: ${concert.city} - ${concert.venue}
      Дата: ${moment(concert.date).format("DD.MM.YYYY")}
      Время: ${moment(concert.date).format("HH:mm")}

      Бронирование:
      Ряд: ${row}
      Место: ${seat}
      Цена: ${price} руб.

      Ваши данные:
      Имя: ${name}
      Телефон: ${phone}

      Спасибо за покупку! Мы ждем вас на концерте.
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email успешно отправлен:", info.response);
    return { success: true, response: info.response };
  } catch (error) {
    console.error("Ошибка при отправке email:", error);
    return { success: false, error: error };
  }
}

app.post("/api/book-ticket", async (req, res) => {
  const { concertId, row, seat, name, email, phone } = req.body;

  let price = 0;
  if (row >= 1 && row <= 3) {
    price = 2500;
  } else if (row >= 4 && row <= 6) {
    price = 2000;
  } else if (row >= 7 && row <= 9) {
    price = 1500;
  }

  try {
    const existingTicket = await Ticket.findOne({
      where: { concertId, row, seat },
    });

    if (existingTicket) {
      return res.status(400).json({
        message: "Это место уже занято. Выберите другое место.",
      });
    }

    const concert = await Concert.findByPk(concertId);

    const newTicket = await Ticket.create({
      concertId,
      row,
      seat,
      price,
      buyerName: name,
      buyerEmail: email,
      buyerPhone: phone,
    });

    const emailResult = await sendEmail(concert, name, email, row, seat, price, phone);

    if (emailResult.success) {
      res.status(201).json({
        message: "Билет успешно забронирован и чек отправлен на ваш email!",
        ticket: newTicket,
      });
    } else {
      res.status(500).json({
        message: "Билет забронирован, но произошла ошибка при отправке чека на email.",
      });
    }
  } catch (error) {
    console.error("Ошибка при бронировании билета:", error);
    res.status(500).json({ message: "Ошибка сервера." });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
