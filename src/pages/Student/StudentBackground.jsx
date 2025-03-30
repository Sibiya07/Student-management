import React from "react";
import {
  FaChartLine,
  FaLaptopCode,
  FaCalendarAlt,
  FaBell,
  FaGraduationCap,
  FaTrophy,
  FaBook,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
  FaUserGraduate,
  FaClipboardList,
  FaClock,
  FaCreditCard,
} from "react-icons/fa";
import { motion } from "framer-motion";

const StudentDashboard = () => {
  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-md w-full min-h-screen">
      {/* Header Section */}
      <div className="mb-8 p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg text-white">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <FaChartLine className="mr-3 text-yellow-300" /> Dashboard Overview
        </h1>
        <p className="text-gray-100 flex items-center">
          <FaClipboardList className="mr-2 text-yellow-300" /> Manage your academic activities and track your progress
        </p>
        <div className="mt-2 text-gray-200 text-sm flex items-center">
          <FaClock className="mr-2 text-yellow-300" /> Last Updated: 03/04/2025, 10:30 AM
        </div>
      </div>

      {/* Top Row: Grades, Skillrack Details, Events Participated */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Grades Box */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-orange-400 to-orange-600 text-white p-6 rounded-lg shadow-lg"
        >
          <div className="flex items-center mb-4">
            <FaGraduationCap className="text-3xl mr-3" />
            <h2 className="text-xl font-semibold">Grades</h2>
          </div>
          <p>Check your academic performance and grades.</p>
          <a href="#" className="underline flex items-center mt-3">
            <FaCheckCircle className="mr-2" /> View Details
          </a>
        </motion.div>

        {/* Skillrack Details Box */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-teal-400 to-teal-600 text-white p-6 rounded-lg shadow-lg"
        >
          <div className="flex items-center mb-4">
            <FaLaptopCode className="text-3xl mr-3" />
            <h2 className="text-xl font-semibold">Skillrack Details</h2>
          </div>
          <p>Track your Skillrack progress and achievements.</p>
          <a href="#" className="underline flex items-center mt-3">
            <FaCheckCircle className="mr-2" /> View Details
          </a>
        </motion.div>

        {/* Events Participated Details Box */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-pink-400 to-pink-600 text-white p-6 rounded-lg shadow-lg"
        >
          <div className="flex items-center mb-4">
            <FaTrophy className="text-3xl mr-3" />
            <h2 className="text-xl font-semibold">Events Participated</h2>
          </div>
          <p>View details of events you've participated in.</p>
          <a href="#" className="underline flex items-center mt-3">
            <FaCheckCircle className="mr-2" /> View Details
          </a>
        </motion.div>
      </div>

      {/* Bottom Row: Notifications and Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Notifications Box */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-6 bg-white rounded-lg shadow-lg"
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <FaBell className="mr-3 text-purple-600" /> Notifications
          </h2>
          <ul className="space-y-4">
            <li className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-4"></span>
              <div>
                <p className="text-gray-700 flex items-center">
                  <FaCheckCircle className="mr-2 text-green-500" /> Project Submission Approved
                </p>
                <p className="text-sm text-gray-500">01/04/2025</p>
              </div>
            </li>
            <li className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-4"></span>
              <div>
                <p className="text-gray-700 flex items-center">
                  <FaTimesCircle className="mr-2 text-red-500" /> Report Submission Rejected
                </p>
                <p className="text-sm text-gray-500">28/03/2025</p>
              </div>
            </li>
            <li className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-4"></span>
              <div>
                <p className="text-gray-700 flex items-center">
                  <FaExclamationCircle className="mr-2 text-blue-500" /> New Event Registration Open
                </p>
                <p className="text-sm text-gray-500">27/03/2025</p>
              </div>
            </li>
          </ul>
        </motion.div>

        {/* Quick Stats Box */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-6 bg-white rounded-lg shadow-lg"
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <FaChartLine className="mr-3 text-purple-600" /> Quick Stats
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* CGPA */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-6 bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-lg shadow-lg"
            >
              <div className="flex items-center mb-2">
                <FaUserGraduate className="text-2xl mr-3" />
                <h3 className="text-lg font-semibold">CGPA</h3>
              </div>
              <p className="text-2xl font-bold">8.5/10</p>
            </motion.div>

            {/* Number of Events Participated */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-6 bg-gradient-to-r from-pink-400 to-pink-600 text-white rounded-lg shadow-lg"
            >
              <div className="flex items-center mb-2">
                <FaTrophy className="text-2xl mr-3" />
                <h3 className="text-lg font-semibold">Events Participated</h3>
              </div>
              <p className="text-2xl font-bold">3</p>
            </motion.div>

            {/* Number of Courses Enrolled */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-6 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg shadow-lg"
            >
              <div className="flex items-center mb-2">
                <FaBook className="text-2xl mr-3" />
                <h3 className="text-lg font-semibold">Courses Enrolled</h3>
              </div>
              <p className="text-2xl font-bold">5</p>
            </motion.div>

            {/* Attendance Percentage */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-6 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg shadow-lg"
            >
              <div className="flex items-center mb-2">
                <FaCalendarAlt className="text-2xl mr-3" />
                <h3 className="text-lg font-semibold">Attendance</h3>
              </div>
              <p className="text-2xl font-bold">85%</p>
            </motion.div>

            {/* Pending Approvals */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-6 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-lg shadow-lg"
            >
              <div className="flex items-center mb-2">
                <FaExclamationCircle className="text-2xl mr-3" />
                <h3 className="text-lg font-semibold">Pending Approvals</h3>
              </div>
              <p className="text-2xl font-bold">2</p>
            </motion.div>

            {/* Total Credits Earned */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-6 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-lg shadow-lg"
            >
              <div className="flex items-center mb-2">
                <FaCreditCard className="text-2xl mr-3" />
                <h3 className="text-lg font-semibold">Credits Earned</h3>
              </div>
              <p className="text-2xl font-bold">20</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboard;