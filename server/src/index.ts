import express from "express";
import { errorHandler } from "./utils/errorHandler";
import { verificationRoutes } from "./routes/verification.routes";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello From OTP Verification Server");
});

app.use(express.json());


app.use("/api", verificationRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
