const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const logger = require("./utils/logger");
const errorHandler = require(
    "./middleware/errorMiddleware"
);
dotenv.config();

const connectDB = require("./config/db");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/resume", require("./routes/resumeRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));
app.use(
  "/api/job",
  require("./routes/jobRoutes")
);
app.use(
  "/api/dashboard",
  require("./routes/dashboardRoutes")
);
app.use(
    "/api/cover-letter",
    require("./routes/coverLetterRoutes")
);
app.use(
  "/api/interview",
  require("./routes/interviewRoutes")
);
// Home Route
app.get("/", (req, res) => {
  res.send("CareerCopilot API Running...");
});
app.use(errorHandler);
// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.success(
    `Server running on http://localhost:${PORT}`
);
});