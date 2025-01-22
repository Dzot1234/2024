const express = require("express");
const { Concert, Ticket } = require("./models");
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

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
