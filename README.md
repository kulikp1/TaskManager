# TaskManager

**TaskManager** — це веб-додаток для управління завданнями та проєктами. Додаток дозволяє створювати особисті облікові записи, планувати завдання через інтерактивний календар, керувати пріоритетами, дедлайнами та відстежувати прогрес через аналітику і графіки.

---

## 📋 Основний функціонал

- **Аутентифікація користувачів**

  - Реєстрація через e-mail/пароль або Google OAuth
  - Вхід/вихід із особистого кабінету
  - Захист даних через JWT токени

- **Управління завданнями**

  - Створення завдань із параметрами:
    - Назва
    - Опис
    - Дата та час дедлайну
    - Категорія (робота, навчання, особисте тощо)
    - Пріоритет (низький, середній, високий)
    - Статус (нове, в процесі, виконано, прострочено)
    - Нотатки або коментарі
  - Редагування та видалення завдань

- **Інтерактивний календар**

  - Відображення завдань по днях
  - Додавання/редагування завдань через календарний інтерфейс
  - Drag-and-drop для зміни порядку завдань

- **Нагадування про дедлайни**

  - Сповіщення у додатку (з перспективою додати email-нотифікації)

- **Категорії та фільтри**

  - Фільтрація завдань за статусом, датою, категорією, пріоритетом

- **Аналітика та статистика**
  - Діаграми прогресу (виконані/прострочені завдання)
  - Графіки активності за обраний період

---

## 🛠️ Стек технологій

### Фронтенд

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [FullCalendar](https://fullcalendar.io/)
- [React-Beautiful-DnD](https://github.com/atlassian/react-beautiful-dnd)
- [Chart.js](https://www.chartjs.org/)
- [MUI (Material-UI)](https://mui.com/) або [Tailwind CSS](https://tailwindcss.com/)
- [React-toastify](https://fkhadra.github.io/react-toastify/)

### Бекенд

- [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)
- [bcrypt.js](https://github.com/dcodeIO/bcrypt.js/)

---

## 🚀 Запуск проєкту

### 1. Клонування репозиторію

```bash
git clone https://github.com/your-username/taskmanager.git
cd taskmanager
2. Встановлення залежностей
Фронтенд
bash
Копировать
Редактировать
cd client
npm install
npm run dev
Бекенд
bash
Копировать
Редактировать
cd server
npm install
npm run dev
3. Налаштування змінних середовища
У папці server створіть файл .env і додайте туди такі змінні:

env
Копировать
Редактировать
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```
