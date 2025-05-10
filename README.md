# TaskManager

**TaskManager** — це веб-додаток для управління завданнями та проєктами. Додаток дозволяє створювати особисті облікові записи, планувати завдання через інтерактивний календар, керувати пріоритетами, дедлайнами та відстежувати прогрес через аналітику і графіки.

---

## Стек технологій

### Фронтенд

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [FullCalendar](https://fullcalendar.io/)
- [React-toastify](https://fkhadra.github.io/react-toastify/)

### Бекенд

- [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)
- [bcrypt.js](https://github.com/dcodeIO/bcrypt.js/)

---

## Запуск проєкту

### 1. Клонування репозиторію

git clone https://github.com/your-username/taskmanager.git
cd taskmanager

### 2. Встановлення залежностей

    Фронтенд
    cd client
    npm install
    npm run dev

    Бекенд
    cd server
    npm install
    npm run dev

### 3. Налаштування змінних середовища

    У папці server створіть файл .env і додайте туди такі змінні:
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key

---

# TaskManager

**TaskManager** is a web application for task and project management. It allows users to create personal accounts, schedule tasks through an interactive calendar, manage priorities and deadlines, and track progress via analytics and charts.

---

## Main Features

- **User Authentication**

  - Registration via email/password or Google OAuth
  - Login/logout from the personal account
  - Data protection with JWT tokens

- **Task Management**

  - Create tasks with the following parameters:
    - Title
    - Description
    - Deadline date and time
    - Category (Work, Study, Personal, etc.)
    - Priority (Low, Medium, High)
    - Status (New, In Progress, Completed, Overdue)
    - Notes or comments
  - Edit and delete tasks

- **Interactive Calendar**

  - Display tasks by day
  - Add/edit tasks through the calendar interface
  - Drag-and-drop to reorder tasks

- **Deadline Reminders**

  - In-app notifications (email notifications may be added in the future)

- **Categories and Filters**

  - Filter tasks by status, date, category, priority

- **Analytics and Statistics**

  - Progress charts (completed/overdue tasks)
  - Activity graphs for a selected time period

---

## 🛠️ Tech Stack

### Frontend

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [FullCalendar](https://fullcalendar.io/)
- [React-toastify](https://fkhadra.github.io/react-toastify/)

### Backend

- [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)
- [bcrypt.js](https://github.com/dcodeIO/bcrypt.js/)

---

## 🚀 Project Setup

### 1. Clone the repository

git clone https://github.com/your-username/taskmanager.git
cd taskmanager

### 2. Install dependencies

    Frontend
    cd client
    npm install
    npm run dev

    Backend
    cd server
    npm install
    npm run dev

### 3. Configure environment variables

    In the server folder, create a .env file and add the following variables:
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
