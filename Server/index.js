//npm i express
//npm i nodemon
//>package.json> start:"",dev:""
//npm i dotenv
//npm i mongoose
//npm i cookie-parser
//npm i jsonwebtoken
//npm i nodemailer
//npm i otp-generator
//npm i bcrypt

//for routes: method, path , handler function

const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const paymentRoutes = require("./routes/Payment");
const profileRoutes = require("./routes/Profile");
const courseRoutes = require("./routes/Course");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;
//db connect
database.connect();
//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000", //frontend req
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);
//clodinary connect
cloudinaryConnect();

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);

//def route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: `Your server is up and running`,
  });
});

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
