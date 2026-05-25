require("dotenv").config({ path: require("path").join(__dirname, ".env") }); // debe ser lo primero — antes de cualquier require que lea process.env

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const appRoutes = require('./routers/app.routers.js');
const authController = require('./controllers/auth.controller.js');

const app = express();

const PORT = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// 1. Configuración de CORS
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      if (origin === FRONTEND_URL) return cb(null, true);
      if (/^http:\/\/localhost:\d+$/.test(origin)) return cb(null, true);
      cb(new Error(`CORS bloqueado: ${origin}`));
    },
    credentials: true,
  })
);


app.post('/api/auth/webhook', express.raw({ type: 'application/json' }), authController.webhookRegistro);


app.use(express.json()); 

app.use('/api', appRoutes);


app.get("/health", (req, res) => {
  res.json({
    ok: true,
    status: "healthy",
    database: "MongoDB Atlas",
  });
});


const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Backend FabricSoft corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("🚨 No se pudo iniciar el servidor:", error.message);
    process.exit(1);
  }
};

startServer();