const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // default empty
  database: "db_project",
  port: 3306,
});

// Connect to MySQL
db.connect((err) => {
  if (err) return console.log("DB Error:", err);
  console.log("Connected to MySQL");
});

app.get("/", (req, res) => {
  res.send("Hey Fares This is an API");
});

app.post("/login", (req, res) => {
  const { id, phone } = req.body;
  const query = "SELECT * FROM student WHERE Student_ID = ? AND phone = ?";
  db.query(query, [id, phone], (err, results) => {
    if (err)
      return res.status(500).json({ error: "DB Error", message: err.message });
    if (!results || results.length === 0)
      return res.status(401).json({ error: "Invalid credentials" });

    return res.json(results[0]);
  });
});

app.post("/signup", (req, res) => {
  const {
    First_Name,
    Last_Name,
    Email,
    Phone,
    Date_Of_Birth,
    Year_Level,
    Dept_ID,
  } = req.body;
  const query =
    "INSERT INTO student (First_Name, Last_Name, Email, Phone, Date_Of_Birth, Year_Level, Dept_ID) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [First_Name, Last_Name, Email, Phone, Date_Of_Birth, Year_Level, Dept_ID],
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "DB Error", message: err.message });
      }
      return res.json({
        message: "Signup successful",
        Student_ID: results.insertId,
        First_Name,
        Last_Name,
        Email,
        Phone,
        Date_Of_Birth,
        Year_Level,
        Dept_ID,
      });
    }
  );
});

// Get all courses registered by a specific student
app.get("/student/:id/courses", (req, res) => {
  const studentId = req.params.id;
  const filter = req.query.filter;

  let query = "";
  if (filter === "Completed") {
    query = `
    SELECT c.Course_ID,s.Section_ID, c.Course_Name, c.Credits, c.Course_Description,Status,e.Grade
    FROM Enrollment e
    JOIN Section s ON e.Section_ID = s.Section_ID
    JOIN Course c ON s.Course_ID = c.Course_ID
    WHERE e.Student_ID = ? AND e.Status = 'Completed'
  `;
  } else if (filter === "All") {
    query = `
    SELECT 
    c.Course_ID,
    s.Section_ID,
    c.Course_Name,
    c.Credits,
    c.Course_Description,e.Grade,
    COALESCE(e.Status, 'Incomplete') AS Status
    FROM Course c
    LEFT JOIN Section s ON c.Course_ID = s.Course_ID
    LEFT JOIN Enrollment e 
        ON s.Section_ID = e.Section_ID AND e.Student_ID = ?
    ORDER BY c.Course_ID;
    `;
  } else if (filter === "Incomplete") {
    query = `
    SELECT 
    c.Course_ID,
    s.Section_ID,
    c.Course_Name,
    c.Credits,
    c.Course_Description,
    e.Grade,
    COALESCE(e.Status, 'Incomplete') AS Status
    FROM Course c
    LEFT JOIN Section s ON c.Course_ID = s.Course_ID
    LEFT JOIN Enrollment e 
        ON s.Section_ID = e.Section_ID AND e.Student_ID = ?
    WHERE e.Status IS NULL
    ORDER BY c.Course_ID;
  `;
  }

  db.query(query, [studentId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "DB Error", message: err.message });
    }
    if (results.length === 0) {
      return res
        .status(200)
        .json({ message: "No courses found for this student" });
    }
    res.json(results);
  });
});

app.post("/student/:id/register", (req, res) => {
  const studentId = req.params.id;
  const { sectionId } = req.body;

  // Validate input
  if (!sectionId) {
    return res.status(400).json({ error: "sectionId is required" });
  }

  const checkSectionQuery = `SELECT * FROM Section WHERE Section_ID = ?`;
  db.query(checkSectionQuery, [sectionId], (err, sectionResults) => {
    if (err)
      return res.status(500).json({ error: "DB Error", message: err.message });

    if (sectionResults.length === 0) {
      return res.status(400).json({ message: "Section does not exist" });
    }

    // Then check if already registered
    const checkQuery = `
    SELECT * FROM Enrollment 
    WHERE Student_ID = ? AND Section_ID = ?
  `;
    db.query(checkQuery, [studentId, sectionId], (err2, results2) => {
      if (err2)
        return res
          .status(500)
          .json({ error: "DB Error", message: err2.message });

      if (results2.length > 0) {
        return res
          .status(400)
          .json({ message: "Already registered in this course" });
      }

      const mysqlDate = new Date().toISOString().split("T")[0];

      const insertQuery = `
      INSERT INTO Enrollment (Enrollment_Date, Student_ID, Section_ID, Status)
      VALUES (?, ?, ?, 'Enrolled')
    `;
      db.query(
        insertQuery,
        [mysqlDate, studentId, sectionId],
        (err3, results3) => {
          if (err3)
            return res
              .status(500)
              .json({ error: "DB Error", message: err3.message });

          res.json({ message: "Course registered successfully" });
        }
      );
    });
  });
});

app.post("/student/:id/unregister", (req, res) => {
  const studentId = req.params.id;
  const { sectionId } = req.body;

  // Validate input
  if (!sectionId) {
    return res.status(400).json({ error: "sectionId is required" });
  }

  // Check if the student is actually registered in this section
  const checkQuery = `
    SELECT * FROM Enrollment 
    WHERE Student_ID = ? AND Section_ID = ?
  `;

  db.query(checkQuery, [studentId, sectionId], (err, results) => {
    if (err)
      return res.status(500).json({ error: "DB Error", message: err.message });

    if (results.length === 0) {
      return res
        .status(400)
        .json({ message: "Student is not registered in this course" });
    }

    // Delete the enrollment
    const deleteQuery = `
      DELETE FROM Enrollment 
      WHERE Student_ID = ? AND Section_ID = ?
    `;

    db.query(deleteQuery, [studentId, sectionId], (err2, results2) => {
      if (err2)
        return res
          .status(500)
          .json({ error: "DB Error", message: err2.message });

      res.json({ message: "Course unregistered successfully" });
    });
  });
});

// Update student data
app.put("/student/:id", (req, res) => {
  const studentId = req.params.id;
  const { First_Name, Last_Name, Email, Phone, Date_Of_Birth } = req.body;

  const query = `
    UPDATE student 
    SET First_Name = ?, Last_Name = ?, Email = ?, Phone = ?, 
        Date_Of_Birth = ?
    WHERE Student_ID = ?
  `;

  db.query(
    query,
    [First_Name, Last_Name, Email, Phone, Date_Of_Birth, studentId],
    (err, results) => {
      if (err)
        return res
          .status(500)
          .json({ error: "DB Error", message: err.message });

      if (results.affectedRows === 0)
        return res.status(404).json({ message: "Student not found" });

      res.json({ message: "Student updated successfully" });
    }
  );
});

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
