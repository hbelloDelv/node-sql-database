const express = require('express');
const cors = require('cors');
const mysql = require('mysql')
const app = express();

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: "",
    database: "rms_db"
})

app.get('/', (req,res) => {
    let allStudent = "SELECT * FROM student_record"
    db.query(allStudent, (err, data) => {
        if(err) {
          return  res.json(`Error: ${err}`)
        }

        return res.json(data)
    })
})

app.get('/:studentId', (req, res) => {
    const studentId = req.params.studentId;
    const fetchStudent = "SELECT * FROM student_record WHERE `studentId` = ?";

    db.query(fetchStudent, [studentId], (err, data) => {
        if (err) {
            return res.json(`Error: ${err}`);
        }

        // Check if a student with the given ID exists
        if (data.length === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Return the student data
        return res.json(data[0]);
    });
});


app.post('/create', (req, res) => {
    let createStudent = "INSERT INTO student_record (`Name`, `Age`, `Email` ) VALUES (?, ?, ?)"
    const values = [
        req.body.name,
        req.body.age,
        req.body.email
    ]
    db.query(createStudent, values, (err, data) => {
        if(err) {
          return  res.json(`Error: ${err}`)
        }

        return res.json(data)
    })
})

app.put('/edit/:studentId', (req, res) => {
    const studentId = req.params.studentId;
    const updateStudent = "UPDATE student_record SET `Name` = ?, `Age` = ?, `Email` = ? WHERE studentId = ?";
    
    const values = [
        req.body.name,
        req.body.age,
        req.body.email,
        studentId,
    ];
    db.query(updateStudent, values, (err, data) => {
        if (err) {
            return res.json(`Error: ${err}`);
        }

        return res.json(data);
    });
});

app.delete('/delete/:studentId', (req, res) => {
    const studentId = req.params.studentId;
    const deleteStudent = "DELETE FROM student_record WHERE studentId = ?";

    db.query(deleteStudent, [studentId], (err, data) => {
        if (err) {
            return res.json(`Error: ${err}`);
        }

        // Check if a student with the given ID was deleted
        if (data.affectedRows === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }

        return res.json({ message: 'Student deleted successfully' });
    });
});



app.listen(5000, () => {
    console.log("listening...")
})