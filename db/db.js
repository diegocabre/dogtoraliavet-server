import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();

// Conectar a la base de datos mediante URL
const pool = new Pool({
  connectionString: process.env.DB_DATABASE_URL,
});

pool.on("connect", () => {
  console.log("Database connected");
});

pool.on("error", (error) => {
  console.error("Database error:", error);
});

// Test connection
(async () => {
  try {
    const client = await pool.connect();
    console.log("Database connected successfully");
    client.release();
  } catch (err) {
    console.error("Failed to connect to the database:", err);
  }
})();

export default pool;
