import express from "express";
import mysql from "mysql";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path from "path";
import multer from "multer";
import { Router } from 'express';
import cron from 'node-cron';
import nodemailer from 'nodemailer';

const router = Router();
const app = express();
app.use(cors(
    {
        origin: ["http://localhost:5173"],
        methods: ["POST", "GET", "PUT","PATCH","DELETE"],
        credentials: true
    }
));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
});


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage
});

con.connect(function (err) {
    if (err) {
        console.log("Error in connection");
    } else {
        console.log("Connected");
    }
});

// app.post('/enter', (req, res) => {
//     const sql = "SELECT * FROM users WHERE email = ? AND password = ?"; 
//     con.query(sql, [req.body.email, req.body.password], (err, result) => {
//         if (err) return res.json({ Status: "Error" ,Error:"Error in running query"});
//         if (result.length > 0) {
//             const id= result[0].id;
//             const token = jwt.sign({id}, "JWT-KEY", {expiresIn: '1d'});
//             res.cookie('token', token);
//             return res.json({ Status: "Success" });
//         } else {
//             return res.json({ Status: "Error", Error:"Wrong Email or Password" });
//         }
//     });
// });

app.post('/enter', (req, res) => {
  const sql = "SELECT * FROM users Where email = ?";
  con.query(sql, [req.body.email], (err, result) => {
      if(err) return res.json({Status: "Error", Error: "Error in runnig query"});
      if(result.length > 0) {
          bcrypt.compare(req.body.password.toString(), result[0].password, (err, response)=> {
              if(err) return res.json({Error: "password error"});
              if(response) {
                const id= result[0].id;
                            const token = jwt.sign({id}, "JWT-KEY", {expiresIn: '1d'});
                             res.cookie('token', token);
                             return res.json({ Status: "Success" });
              } else {
                  return res.json({Status: "Error", Error: "Wrong Email or Password"});
              }
              
          })
          
      } else {
          return res.json({Status: "Error", Error: "Wrong Email or Password"});
      }
  })
})

app.post('/employeelogin', (req, res) => {
  const sql = "SELECT * FROM employee Where email = ?";
  con.query(sql, [req.body.email], (err, result) => {
      if(err) return res.json({Status: "Error", Error: "Error in runnig query"});
      if(result.length > 0) {
          bcrypt.compare(req.body.password.toString(), result[0].password, (err, response)=> {
              if(err) return res.json({Error: "password error"});
              if(response) {
                const token = jwt.sign({ role: "employee", id: result[0].id }, "jwt-secret-key");

                  res.cookie('token', token);
                  return res.json({Status: "Success"})
              } else {
                  return res.json({Status: "Error", Error: "Wrong Email or Password"});
              }
              
          })
          
      } else {
          return res.json({Status: "Error", Error: "Wrong Email or Password"});
      }
  })
})


app.get('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ Status: "Success" });
});


app.get('/getEmployee', (req, res) => {
    const sql = "SELECT * FROM employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Get employee error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})

app.get('/gettimesheet', (req, res)=>{
  const sql = "SELECT * FROM time";
  con.query(sql , (err, result)=>{
  if(err) return res.json({Error:"Error in getting time-records of employees"});
  return res.json({Status:"Success", Result:result})
  })
})
app.get('/logout_time', (req, res)=>{
  const sql = "SELECT * FROM logout_records";
  con.query(sql , (err, result)=>{
  if(err) return res.json({Error:"Error in getting time-records of employees"});
  return res.json({Status:"Success", Result:result})
  })
})

app.get('/Events', (req, res)=>{
  const sql = "SELECT * FROM event_table";
  con.query(sql , (err, result)=>{
    if(err){
      return res.json({Error: "Error getting Events"});
    }
    return res.json(result);
  });
});

app.get('/managerlist', (req, res)=>{
  const sql = "SELECT * FROM users";
  con.query(sql , (err, result)=>{
    if(err){
      return res.json({Error: "Error getting manager"});
    }
    return res.json(result);
  });
});

app.get("/gettask", (req, res)=>{
  const sql = "SELECT * FROM task";
  con.query(sql,(err,result)=>{
    if(err) return res.json({Error:"Get Task Error"});
    return res.json({Status:"success",Result:result})
  })
})

app.delete('/remove/:email', (req, res) => {
    const email = req.params.email;
    const sql = "DELETE FROM employee WHERE email = ?";
    
    con.query(sql, [email], (err, result) => {
      if (err) {
        console.error("Error deleting employee:", err);
        return res.status(500).json({ Error: "Failed to remove employee" });
      }
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ Error: "Employee not found" });
      }
  
      return res.json({ Status: "Success" });
    });
  });


  app.get('/get/:name', (req, res) => {
    const name = req.params.name;
    const sql = "SELECT * FROM employee where name = ?";
    con.query(sql, [name], (err, result) => {
        if(err) return res.json({Error: "Get employee error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})

app.get('/employee/:email', (req,res) =>{
    const email = req.params.email;
    const sql = "SELECT * FROM employee where email = ?";
    con.query(sql, [email], (err, result) => {
        if(err) return res.json({Error: "Get employee error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})

app.get('/manager/:email', (req, res) => {
  const email = req.params.email;
  const sql = "SELECT * FROM users WHERE email = ?";
  con.query(sql, [email], (err, result) => {
    if(err) return res.json({ Error: "Get Manager Error in SQL" });
    return res.json({ Status: "Success", Result: result });
  });
});

app.put('/updateEmployee/:email', upload.single('image'), (req, res) => {
  const email = req.params.email;
  const newDob = req.body.dob;
  const newMobile = req.body.mobile;
  const newEducation = req.body.education;
  const image = req.file.filename;
  const maritalStatus = req.body.maritalStatus; 
  const nationality = req.body.nationality; 
  const linkedin = req.body.linkedin; 
  const gender = req.body.gender; 

  const sql = "UPDATE employee SET dob=?, mobile=?, education=?, image=?, maritalstatus=?, nationality=?, linkedin=?, gender=? WHERE email=?";
  con.query(sql, [newDob, newMobile, newEducation, image, maritalStatus, nationality, linkedin, gender, email], (err, result) => {
    if (err) return res.json({ Error: "Update employee error in SQL" });
    return res.json({ Status: "Success" });
  });
});

app.put('/updateManager/:email', upload.single('image'), (req, res) => {
  const email = req.params.email;
  const newRole = req.body.role;
  const newDob = req.body.dob;
  const newMobile = req.body.mobile;
  const newEducation = req.body.education;
  const image = req.file.filename;
  const newAddress = req.body.address;
  const maritalStatus = req.body.maritalStatus; 
  const nationality = req.body.nationality; 
  const linkedin = req.body.linkedin; 
  const gender = req.body.gender; 

  const sql = "UPDATE users SET role=?, address=?, dob=?, mobile=?, education=?, image=?, maritalstatus=?, nationality=?, linkedin=?, gender=? WHERE email=?";
  con.query(sql, [newRole, newAddress, newDob, newMobile, newEducation, image, maritalStatus, nationality, linkedin, gender, email], (err, result) => {
    if (err) return res.json({ Error: "Update employee error in SQL" });
    return res.json({ Status: "Success" });
  });
});


app.put('/update/:email',upload.single('image'), (req, res) => {
    const email = req.params.email;
    const newRole = req.body.role; 
    const newName = req.body.name; 
    const newAddress= req.body.address; 

  
  
    const sql = "UPDATE employee SET role = ?, name = ?, address = ?  WHERE email = ?";
    con.query(sql, [newRole, newName, newAddress, email], (err, result) => {
      if (err) return res.json({ Error: "Update employee error in SQL" });
      return res.json({ Status: "Success" });
    });
  });

  app.put('/updatetask/:email', (req, res) => {
    const projecttitle = req.body.projecttitle;  
    const description = req.body.description;
    const deadline = req.body.deadline;
    const team = req.body.team;
    const email = req.params.email;   
  
    const sql = "UPDATE employee SET projecttitle = ?, description = ?, deadline = ?, team =?  WHERE email = ?";
    con.query(sql, [projecttitle, description, deadline,team ,  email], (err, result) => {
      if (err) return res.json({ Error: "Update employee error in SQL" });
      return res.json({ Success: "Success" });   // Corrected capitalization
    });
  });

  app.put('/leave/:email', (req, res) => {
    const leavetype = req.body.leavetype;   // Corrected attribute name
    const startdate = req.body.startdate;
    const enddate = req.body.enddate;
    const reason = req.body.reason;
    const email = req.params.email;   // Assuming email is a URL parameter
  
    const sql = "UPDATE employee SET leavetype = ?, startdate = ?, enddate = ?, reason =?  WHERE email = ?";
    con.query(sql, [leavetype, startdate, enddate,reason ,  email], (err, result) => {
      if (err) return res.json({ Error: "Update employee error in SQL" });
      return res.json({ Success: "Success" });   // Corrected capitalization
    });
  });
  app.put('/leaveaproval/:name', (req, res) => {
    const name = req.params.name;
    const status = req.body.status;
  
    const sql = "UPDATE employee SET status = ? WHERE name = ?";
    con.query(sql, [status, name], (err, result) => {
      if (err) {

        return res.status(500).json({ error: 'Internal Server Error' });
      }
     
      return res.json({ success: true });
    });
  });
  app.put('/timeaproval/:name', (req, res) => {
    const name = req.params.name;
    const status = req.body.status;
  
    const sql = "UPDATE employee SET timeupdate = ? WHERE name = ?";
    con.query(sql, [status, name], (err, result) => {
      if (err) {

        return res.status(500).json({ error: 'Internal Server Error' });
      }
     
      return res.json({ success: true });
    });
  });
  app.put('/taskapproval/:name', (req, res) => {
    const name = req.params.name;
    const status = req.body.status;
  
    const sql = "UPDATE employee SET taskapproval = ? WHERE name = ?";
    con.query(sql, [status, name], (err, result) => {
      if (err) {

        return res.status(500).json({ error: 'Internal Server Error' });
      }
     
      return res.json({ success: true });
    });
  });
  

  
  
  // app.put('/updateEmployee/:email', (req, res) => {
  //   const email = req.params.email;
  //   const newDob = req.body.dob; 
  //   const newMobile= req.body.mobile; 
  //   const newEducation = req.body.education; 
  //   const sql = "UPDATE employee SET dob = ?, mobile = ?, education = ? WHERE email = ?";
  //   con.query(sql, [newDob, newMobile, newEducation, email], (err, result) => {
  //     if (err) return res.json({ Error: "Update employee error in SQL" });
  //     return res.json({ Status: "Success" });
  //   });
  // });
  app.get('/employeeCount', (req, res) => {
    const sql = "Select count(id) as employee from employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Error in runnig query"});
        return res.json(result);
    })
})

  const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ error: "You are not authenticated" });
    } else {
      jwt.verify(token, "jwt-secret-key", (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: "Token is invalid or has expired" });
        }
        
        req.name = decoded.name;
        req.email = decoded.email;
        next();
      });
    }
  };
  
  app.get('/dashboard', verifyUser, (req, res) => {
    return res.json({ Status: "Success" });
  });
  
  app.get('/Empdashboard', verifyUser, (req, res) => {
    return res.json({ Status: "Success" });
  });
  

  
const saltRounds = 10;

app.post('/create', (req, res) => {
  const { name, email, password, address , role} = req.body;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      return res.json({ error: 'Error hashing password' });
    }

    const sql = "INSERT INTO employee (`name`, `email`, `password`, `address`, `role`) VALUES (?, ?, ?, ?,?)";
    const values = [name, email, hash, address , role];

    con.query(sql, values, (err, result) => {
      if (err) {
        return res.json({ error: 'Error inserting data into the database' });
      }
      return res.json({ status: 'Success' });
    });
  });
});
 
app.post('/Addevent',(req,res)=>{
  const {eventName , eventStart, eventEnd , eventDescription} = req.body;

  const sql = "INSERT INTO event_table (`eventName`, `eventStart`, `eventEnd`, `eventDescription`)VALUES (? , ? ,?, ?)";
  const values= [eventName , eventStart , eventEnd , eventDescription];
  con.query(sql , values, (err, result)=>{
    if(err) {
      return res.json({ success: false, error: "Error inserting data into database" });
    }
    return res.json({ success: true, status: "Success" });
  })
})

app.put('/tasksubmit/:email', (req, res) => {
  const description = req.body.description;   // Corrected attribute name
  const status = req.body.status;
  const email = req.params.email;   // Assuming email is a URL parameter

  const sql = "UPDATE employee SET taskDescription = ?, taskStatus = ? WHERE email = ?";
  con.query(sql, [description, status,  email], (err, result) => {
    if (err) return res.json({ Error: "Update Task error in SQL" });
    return res.json({ Success: "Success" });   // Corrected capitalization
  });
});
app.post('/createmanager', (req,res)=>{
  const {name , email , password} = req.body;

  bcrypt.hash(password,saltRounds,(err,hash)=>{
    if(err){
      return res.json({error:"Error Hassing pw"});
    }
    const sql = "INSERT INTO users (`name`, `email`, `password`) VALUES (?,?,?)";
    const values =[name , email , hash];

    con.query(sql,values,(err,result)=>{
      if(err){
        return res.json({error:"Error inserting data"});
      }
      return res.json({status:"Success"});
    });
  });
});


function retrieveEmployeeName(email, callback) {
  const sql = "SELECT name FROM employee WHERE email = ?";
  con.query(sql, [email], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result[0].name);
    }
  });
}

app.post('/login', (req, res) => {
  const email = req.body.email;
  const loginTime = req.body.loginTime;
  // const logoutTime = new Date(`1970-01-01T${logoutTime}`);
  // let totalhours;

  // if (!isNaN(loginTime) && !isNaN(logoutTime)) {
  //   const timeDifference = (logoutTime - loginTime) / 1000;
  //   totalhours = timeDifference / 3600;
  // } else {
  //   console.error('Invalid date format for newlogin or newlogout');
  //   return res.status(400).json({ error: 'Invalid date format' });
  // }

  retrieveEmployeeName(email, (err, name) => {
    if (err) {
      console.error('Error retrieving employee name:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    console.log('Retrieved employee name:', name);

    const updateLoginTimeSql = "INSERT INTO time (`employeeName`, `employeeEmail`, `date`, `login`) VALUES (?, ?, CURDATE(), ?)";
    con.query(updateLoginTimeSql, [name, email, loginTime], (err, updateResult) => {
      if (err) {
        console.error('Error updating login time:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      return res.json({ Status: "Success" });
    });
  });
});

app.put('/time', (req, res) => {
  const email = req.body.email;
  const newlogin = req.body.newlogin;
  const newlogout = req.body.newlogout;
  const Ddescription = req.body.Ddescription;

  const loginTime = new Date(`1970-01-01T${newlogin}`);
  const logoutTime = new Date(`1970-01-01T${newlogout}`);
  let totalhours;

  if (!isNaN(loginTime) && !isNaN(logoutTime)) {
    const timeDifference = (logoutTime - loginTime) / 1000;
    totalhours = timeDifference / 3600;
  } else {
    console.error('Invalid date format for newlogin or newlogout');
    return res.status(400).json({ error: 'Invalid date format' });
  }

  retrieveEmployeeName(email, (err, name) => {
    if (err) {
      console.error('Error retrieving employee name:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const timeSql = "INSERT INTO time (`employeeName`, `employeeEmail`, `date`, `login`, `totalhours`) VALUES (?, ?, CURDATE(), ?, ?)";
    const logoutRecordSql = "INSERT INTO logout_records (`employeeEmail`, `date`, `logoutTime`, `Ddescription`) VALUES (?, CURDATE(), ?, ?)";

    con.beginTransaction((err) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      con.query(timeSql, [name, email, newlogin, totalhours], (err, result1) => {
        if (err) {
          return con.rollback(() => {
            res.status(500).json({ error: 'Internal Server Error' });
          });
        }

        con.query(logoutRecordSql, [email, newlogout, Ddescription], (err, result2) => {
          if (err) {
            return con.rollback(() => {
              res.status(500).json({ error: 'Internal Server Error' });
            });
          }

          con.commit((err) => {
            if (err) {
              return con.rollback(() => {
                res.status(500).json({ error: 'Internal Server Error' });
              });
            }
            return res.json({ success: true });
          });
        });
      });
    });
  });
});

app.post('/logout', (req, res) => {
  const email = req.body.email;
  const logoutTime = req.body.logoutTime;

  const insertLogoutRecordSql = "INSERT INTO logout_records (`employeeEmail`, `date`, `logoutTime`) VALUES (?,CURDATE(), ?)";
  con.query(insertLogoutRecordSql, [email, logoutTime], (err, insertResult) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.json({ Status: "Success" });
  });
});




// app.post('/login/:email', (req, res) => {
//   const email = req.params.email;
//   const loginTime = req.body.loginTime;

//   const updateLoginTimeSql = "UPDATE employee SET login = ? WHERE email = ?";
//   con.query(updateLoginTimeSql, [loginTime, email], (err, updateResult) => {
//     if (err) {
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }
//     return res.json({ Status: "Success" });
//   });
// });

// app.post('/logout/:email', (req, res) => {
//   const email = req.params.email;
//   const logoutTime = req.body.logoutTime;
//   const totalHours = req.body.totalHours; // Assuming you have this variable

//   const updateSql = "UPDATE employee SET logout = ?, totalhours = ? WHERE email = ?";
//   con.query(updateSql, [logoutTime, totalHours, email], (err, updateResult) => {
//     if(err) return res.json({ Status: "Error", Error: "Error updating logout time and total hours" });
//     return res.json({ Status: "Success" });
//   });
// });


function deleteExpiredRecords() {
  con.query(
    `UPDATE employee SET leavetype = NULL, startdate = NULL, enddate = NULL, reason = NULL  WHERE 
    enddate < CURRENT_DATE`,
    (error, result) => {
      if (error) {
        console.error('Error deleting expired records:', error);
      } else {
        console.log(`${result.affectedRows} records deleted.`);
      }
    }
  );
}

cron.schedule('20 14 * * *', () => {
  deleteExpiredRecords();
});


function sendEmail(to, subject , text){
  const mailOptions = {
    from : "Application1manager1@gmail.com",
    to,
    subject,
    text
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
      user: 'application1manager1@gmail.com',
      pass: 'qevu sefx pmgs hpxv'
    }
  });
  

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

function sendingEmail() {
  con.query(
    `SELECT * FROM employee WHERE leavetype IS NOT NULL`,
    (error , result) =>{
      if(error){
        console.error("Error Collecting Data's :", error);
      } else {
        console.log("Details Collected for Leave Request");

        const { employee_name, start_date, end_date, leave_type } = result;
        const emailBody = `
        You have Received an Leave Request From,
           Employees !, Please visit website to do action (Approve / Reject)
        `;
        sendEmail('jayanthkumar0604@gmail.com', ' Leave Request from  Employees' , emailBody);
      }
    }
  )
}

function DelayLogin(){
  con.query(
    `SELECT * FROM employee WHERE Ddescription IS NOT NULL`,
    (error, result) =>{
      if(error){
        console.error("Error Collecting DelayLogin Data's:", error);
      }else{
        console.log("Delay Login Employee List Collected");
         const emailContent = 
         `
         Delay Login / Change in Employee Login Time Sheet , Employees Submmited their Reason for Change / Delay 
         Visit Website to Approve / Reject 

         `;
         sendEmail('jayanthkumar0604@gmail.com', 'Delay Login /Change in Time Sheet From Employees' , emailContent);
      }
    }
  )
}

cron.schedule('35 15 * * *', () => {
  sendingEmail();
});

cron.schedule('37 15 * * *',()=>{
  DelayLogin();
})


app.listen(8081, () => {
    console.log("Listening");
});
