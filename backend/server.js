import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import schoolRegistrationRoutes from "./routes/schoolRegistration.js";
import studentRegistrationRoutes from "./routes/studentRegistration.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://princekr969.github.io"]
        : ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Root endpoint for debugging
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Sangillence Backend API",
    version: "1.0.0",
    endpoints: {
      health: "/health",
      schoolRegistration: "/api/school",
      studentRegistration: "/api/student",
    },
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use("/api/school", schoolRegistrationRoutes);
app.use("/api/student", studentRegistrationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);

  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File size too large. Maximum size is 5MB.",
      });
    }
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong",
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(
    `📝 School registration API: http://localhost:${PORT}/api/school`
  );
  console.log(
    `📝 Student registration API: http://localhost:${PORT}/api/student`
  );
});

export default app;
