Synergia Event Booking API (MongoDB)

A Node.js + Express API for managing Synergia event bookings with MongoDB (via Mongoose). Implements CRUD and query features following REST standards.

Requirements
- Node.js 18+
- MongoDB (local or cloud, e.g., Atlas)

Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create environment file:
   - Copy `.env.example` to `.env`
   - Set your values
3. Start the server:
   ```bash
   # Dev with auto-reload
   npm run dev
   # or production
   npm start
   ```

Environment Variables
Create `.env` in project root:
```
PORT=3000
MONGO_URI="mongodb+srv://<username>:<password>@<cluster-name>.mdcbkm3.mongodb.net/<db_name>"
```
Note: `.env` is gitignored. For GitHub submission without credentials, keep `.env.example` committed.

Scripts
- `npm run dev`: start with nodemon
- `npm start`: start with node

Folder Structure
```
.
├─ server.js            # Express app + Mongo connection
├─ routes/
│  └─ bookingRoutes.js  # Booking API routes
├─ schemas/
│  └─ booking.js        # Mongoose Booking model
├─ package.json
├─ .gitignore
├─ .env.example
└─ README.md
```

Booking Model
```json
{
  "name": "String (required)",
  "email": "String (required, unique, lowercased)",
  "event": "String (required)",
  "ticketType": "String (default: Standard)",
  "createdAt": "Date (default: now)"
}
```

Endpoints
Base URL: `http://localhost:3000/api/bookings`

- GET `/` — Get all bookings
- POST `/` — Create a booking
- GET `/:id` — Get booking by ID
- PUT `/:id` — Update booking
- DELETE `/:id` — Delete/cancel booking
- GET `/search?email=xyz` — Search booking by email
- GET `/filter?event=Synergia` — Filter bookings by event

Request/Response Samples
- Create
  ```bash
  curl -X POST http://localhost:3000/api/bookings \
    -H "Content-Type: application/json" \
    -d '{"name":"Alex","email":"alex@example.com","event":"Synergia","ticketType":"VIP"}'
  ```
  - 201 Created, returns created booking
  - 400 if missing name/email/event
  - 409 if email already exists

- Get All
  ```bash
  curl http://localhost:3000/api/bookings
  ```

- Get by ID
  ```bash
  curl http://localhost:3000/api/bookings/<id>
  ```
  - 404 if not found

- Update
  ```bash
  curl -X PUT http://localhost:3000/api/bookings/<id> \
    -H "Content-Type: application/json" \
    -d '{"ticketType":"Standard"}'
  ```

- Delete
  ```bash
  curl -X DELETE http://localhost:3000/api/bookings/<id>
  ```

- Search by Email
  ```bash
  curl "http://localhost:3000/api/bookings/search?email=alex@example.com"
  ```
  - 400 if email missing, 404 if not found

- Filter by Event
  ```bash
  curl "http://localhost:3000/api/bookings/filter?event=Synergia"
  ```
  - 400 if event missing, 404 if none

Validation & Status Codes
- Required fields: `name`, `email`, `event`
- Status codes used: 200 (OK), 201 (Created), 400 (Bad Request), 404 (Not Found), 409 (Conflict), 500 (Server Error)

Notes
- Email is unique by design; a user can have only one booking per email.
- Update validation uses Mongoose `runValidators`.

Troubleshooting
- Ensure Mongo is running and `MONGO_URI` is correct
- If connection fails, server exits with an error message
