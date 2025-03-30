import multer from "multer";
import xlsx from "xlsx";
import fs from "fs";
import bcrypt from "bcrypt";
import { sequelize } from "../../config/mysql.js";
import { User, StudentDetails, BulkUploadHistory } from "../../models/index.js"; // Import BulkUploadHistory

const upload = multer({ dest: "uploads/" });

const bulkUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const filePath = req.file.path;
  const ADMIN_USER_ID = 1; // Assuming this is the admin user ID

  let t; // Declare transaction outside try-catch

  try {
    // Read the uploaded file
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Validate the file data
    if (!data.length) {
      return res.status(400).json({ error: "The file is empty or invalid." });
    }

    // Start a database transaction
    t = await sequelize.transaction();

    try {
      const users = [];
      const students = [];

      // Process each row in the CSV
      for (const row of data) {
        // Validate required fields for User
        if (!row.username || !row.email || !row.role || !row.staffId) {
          throw new Error(`Missing required fields in row: ${JSON.stringify(row)}`);
        }

        // Hash the password (use a default password if not provided)
        const password = row.password || "defaultPassword123";
        const hashedPassword = await bcrypt.hash(password, 10);

        // Prepare User data
        const userData = {
          username: row.username,
          email: row.email,
          password: hashedPassword,
          role: row.role,
          status: row.status || "active",
          Deptid: row.Deptid || null, // Optional field
          image: row.image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52De3xsS7XcR6ZIgKcUXd9M_9drU6kQFOiBIiUCXF1DJYkbjavx3pii3w_xCukbEy2hU&usqp=CAU', // Default image
          Created_by: ADMIN_USER_ID,
          Updated_by: ADMIN_USER_ID,
          created_at: new Date(),
          updated_at: new Date(),
        };

        // Add staffId only for staff members
        if (row.role === "Staff") {
          if (!row.staffId) {
            throw new Error(`Missing staffId for staff member: ${JSON.stringify(row)}`);
          }
          userData.staffId = row.staffId;
        }

        users.push(userData);
      }

      // Bulk insert Users
      const createdUsers = await User.bulkCreate(users, {
        ignoreDuplicates: true,
        returning: true,
        transaction: t,
      });

      // Prepare StudentDetails data for students
      for (let i = 0; i < createdUsers.length; i++) {
        const user = createdUsers[i];
        const row = data[i];

        if (user.role === "Student") {
          // Validate required fields for StudentDetails
          if (!row.regno || !row.Deptid || !row.batch || !row.staffId) {
            throw new Error(`Missing required student fields in row: ${JSON.stringify(row)}`);
          }

          // Fetch tutor's email using staffId from the users table
          let tutorEmail = null;
          let tutorId=0;
          if (row.staffId) {
            const tutor = await User.findOne({
              where: { staffId: row.staffId },
              attributes: ["email","Userid"],
              transaction: t,
            });
            if (tutor) {
              tutorEmail = tutor.email;
              tutorId=tutor.Userid;
            }
          }

          // Prepare StudentDetails data
          students.push({
            Userid: user.Userid, // Foreign key to users table
            regno: row.regno,
            Deptid: row.Deptid,
            batch: row.batch,
            staffId:tutorId, // Add staffId for students
            tutorEmail: tutorEmail, // Store tutor's email
            Created_by: ADMIN_USER_ID,
            Updated_by: ADMIN_USER_ID,
          });
        }
      }

      // Bulk insert StudentDetails
      if (students.length > 0) {
        await StudentDetails.bulkCreate(students, {
          ignoreDuplicates: true,
          transaction: t,
        });
      }

      // **Record Bulk Upload History inside the transaction**
      await BulkUploadHistory.create({
        Userid: ADMIN_USER_ID,
        filename: req.file.originalname,
        file_size: req.file.size / 1024, // Convert bytes to KB
        download_type: req.file.mimetype, // MIME type (e.g., application/vnd.ms-excel)
        total_records: data.length, // Total records processed
      }, { transaction: t });
      

      // ✅ Commit the transaction
      await t.commit();

      // ✅ Delete the uploaded file after successful commit
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      res.json({ message: "Users and students imported successfully!" });

    } catch (error) {
      // ❌ Rollback only if transaction exists
      if (t) await t.rollback();
      throw error;
    }
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).json({ error: error.message || "Failed to process the file." });
  } finally {
   
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};

export { upload, bulkUpload };
