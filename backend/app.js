//imports
const express = require ("express")
const cors = require ("cors")
const mongoose = require ("mongoose")


const app = express();

require ("dotenv").config();


//conexiones
mongoose
  .connect("mongodb://localhost/beerUp")
  .then(() => console.log("Connected to DB 🔌"))
  .catch(() => console.log("Couldn't connect to DB ❌"));


//middlewares
app.use(cors());
app.use(express.json())


//routes
app.use("/api/auth", require("./routes/user"))
app.use("/api/meetup", require("./routes/meetup"))


//listen on server
port = process.env.PORT

app.listen(5000, () => {
  console.log("server running...");
});

