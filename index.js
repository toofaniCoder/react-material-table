const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/schoolDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define Student Schema
const studentSchema = new mongoose.Schema({
  id: Number,
  name: String,
  email: String,
  phone: String,
  standard: Number,
  section: String,
  age: Number,
  date_of_birth: Date,
  date_of_admission: Date,
  parentID: mongoose.ObjectId,
  address: {
    pincode: String,
    city: String,
    street: String,
    state: String,
  },
});

const Student = mongoose.model("Student", studentSchema);

// GET Endpoint to fetch all students
app.get("/students", async (req, res) => {
  const ids = req.query?.parentIds?.split(",").map((el) => Number(el));
  console.log(ids);
  try {
    const students = await Student.aggregate([
      {
        $match: {
          $or: [
            { parentId: { $in: ids ?? [] } },
            { parentId: { $eq: null } },
          ],
        },
      },
    ]);
    // const students = await Student.find();
    res.json({
      total: students.length,
      students,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/students`);
});
