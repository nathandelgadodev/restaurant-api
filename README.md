# :fork_knife_plate: Restaurant API

A RESTful API built for managing restaurant operations, including products, menus, and orders. Built with Node.js, TypeScript, Express, Knex.js, and Zod.

---

## :tools: Technologies Used

- **[Node.js](https://nodejs.org/)** — JavaScript runtime environment
- **[TypeScript](https://www.typescriptlang.org/)** — Typed superset of JavaScript
- **[Express](https://expressjs.com/)** — Web framework for Node.js
- **[Knex.js](https://knexjs.org/)** — SQL Query Builder
- **[SQLite](https://www.sqlite.org/)** — Relational database (development)
- **[Zod](https://zod.dev/)** — TypeScript-first schema validation with static type inference

---

## :rocket: Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or another package manager (pnpm/yarn)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nathandelgadodev/restaurant-api.git
   cd restaurant-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run database migrations:**
   ```bash
   npm run knex -- migrate:latest
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

The server will start at `http://localhost:3333` (or the port defined in `server.ts`).

---

## :pushpin: API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/products` | List all products |
| `POST` | `/products` | Create a new product (validated via Zod) |
| `PUT` | `/products/:id` | Update an existing product |
| `DELETE` | `/products/:id` | Delete a product |

---

## :rotating_light: Error Handling & Validation

The application features centralized error handling (`error-handling.ts`) with custom `AppError` instances and handles Zod validation errors seamlessly, returning structured JSON error payloads for bad requests.

---

## :page_facing_up: License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
