import express from 'express';
import { connectDB, sequelize } from './config/mysql.js'; 
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Import Routes
import leaveRoutes from './routes/student/leaveRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/admin/adminRoutes.js';
import tableRoutes from './routes/admin/tableRoutes.js';
import internRoutes from './routes/student/internshipRoutes.js';
import dashboardRoutes from './routes/student/DashboardRoutes.js';
import bulkRoutes from "./routes/admin/bulkRoutes.js";
import studentRoutes from "./routes/student/studentRoutes.js"
import staffRoutes from "./routes/staffRoutes.js";
import { applyAssociations, EventOrganized } from './models/index.js';
//import eventRoutes from './routes/student/eventRoutes.js';
import locationRoutes from './routes/student/locationRoutes.js';
import activityRoutes from "./routes/admin/activityRoutes.js";
import ScholarshipRoutes from './routes/student/ScholarshipRoutes.js';
import eventRoutes from './routes/student/eventRoutes.js'
import eventAttendedRoutes from './routes/student/eventAttendedRoutes.js';
import OnlineCoursesRoutes from './routes/student/onlinecourseRoute.js'
import achievementRoutes from './routes/student/achievementRoutes.js'
import courseRoutes from './routes/student/CourseRoutes.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


applyAssociations(); // ✅ Ensure associations are applied
// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(cors()); // Allow frontend requests
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Test Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Routes
app.use('/api', authRoutes); 
app.use('/api', adminRoutes);
app.use('/api', tableRoutes);
app.use('/api', internRoutes);
app.use('/api', dashboardRoutes);
app.use("/api/bulk", bulkRoutes);
app.use("/api",studentRoutes);
app.use("api/student/",studentRoutes);
app.use('/api',staffRoutes);
//app.use('/api',eventRoutes);
app.use('/api',locationRoutes);
app.use('/api', activityRoutes);
app.use('/api',ScholarshipRoutes);
app.use('/api',eventRoutes);
app.use('/api',eventAttendedRoutes);
app.use('/api', leaveRoutes);
app.use('/api',OnlineCoursesRoutes);
app.use('/api',achievementRoutes);
app.use('/api', courseRoutes);

// Sync Sequelize Models
sequelize.sync()
  .then(() => console.log("✅ Database synced successfully"))
  .catch((err) => console.error("❌ Error syncing database:", err));

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
