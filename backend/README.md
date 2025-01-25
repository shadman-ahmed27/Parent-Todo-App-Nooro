// Step 1: First install all dependencies

Run: npm install

// Step 2: Create a .env file in the root directory and add your database URL:

DATABASE_URL="mysql://username:password@localhost:3306/database_name"

// Step 3: Next generate the prisma schema

Run: npx prisma generate

// Step 4: Next apply database migrations

Run: npx prisma migrate dev

// Step: 5 Start the backend server

Run: npm start

Backend server will run on http://localhost:3001
