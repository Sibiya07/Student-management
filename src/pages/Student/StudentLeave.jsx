import React, { useState, useEffect, useContext } from "react";
import { FaEdit, FaTrash, FaCalendarAlt, FaFileUpload, FaEye, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { useLeave } from "../../contexts/LeaveContext";
import { useUser } from "../../contexts/UserContext"; // Import useUser to access the current user

const backendUrl = "http://localhost:4000";

const StudentLeave = () => {
  const {
    pendingLeaves,
    loading,
    error,
    addLeave,
    updateLeave,
    deleteLeave,
    fetchPendingLeaves,
  } = useLeave();

  const { user } = useUser(); // Get the current user from UserContext
  const [editingLeave, setEditingLeave] = useState(null);

  // Fetch pending leaves on component mount
  useEffect(() => {
    fetchPendingLeaves();
  }, [fetchPendingLeaves]);

  // Filter leaves to show only those applied by the current user
  const userLeaves = pendingLeaves.filter((leave) => leave.Userid === user.Userid);

  // Handle Edit Click (Pre-fills form & switches tab)
  const handleEdit = (leave) => {
    setEditingLeave(leave);
  };

  // Handle Delete Click
  const handleDelete = async (id) => {
    await deleteLeave(id);
  };

  // Handle Save or Update Leave
  const handleSaveLeave = async (leaveData) => {
    if (editingLeave) {
      await updateLeave(editingLeave.id, leaveData);
    } else {
      await addLeave(leaveData);
    }
    setEditingLeave(null); // Reset editing state after saving
  };

  // Handle Cancel Edit
  const handleCancelEdit = () => {
    setEditingLeave(null); // Reset editing state
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-md w-full min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Leave Details
      </h2>

      {/* Form and Table in the Same Tab */}
      <div className="space-y-6">
        {/* Leave Form */}
        <LeaveForm
          onSave={handleSaveLeave}
          editingLeave={editingLeave}
          onCancelEdit={handleCancelEdit}
        />

        {/* Leave Details Table */}
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <LeaveDetails leaves={userLeaves} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
};

// Leave Details Component
const LeaveDetails = ({ leaves, onEdit, onDelete }) => {
  // Function to format date as "date/month/year"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Ensure leaves is an array before using .map()
  if (!leaves || !Array.isArray(leaves)) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full p-6 bg-white rounded-lg shadow-md"
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Active Leave Details</h3>
        <p className="text-center p-4">No leave records found.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full p-6 bg-white rounded-lg shadow-md"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Active Leave Details</h3>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <tr>
              <th className="border border-gray-300 p-3 text-left">Leave Type</th>
              <th className="border border-gray-300 p-3 text-left">Start Date</th>
              <th className="border border-gray-300 p-3 text-left">End Date</th>
              <th className="border border-gray-300 p-3 text-left">Reason</th>
              <th className="border border-gray-300 p-3 text-left">Status</th>
              <th className="border border-gray-300 p-3 text-left">Document</th>
              <th className="border border-gray-300 p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves.length > 0 ? (
              leaves.map((leave) => (
                <tr key={leave.id} className="bg-white hover:bg-gray-50 transition-all">
                  <td className="border border-gray-300 p-3">{leave.leave_type}</td>
                  <td className="border border-gray-300 p-3">{formatDate(leave.start_date)}</td>
                  <td className="border border-gray-300 p-3">{formatDate(leave.end_date)}</td>
                  <td className="border border-gray-300 p-3">{leave.reason}</td>
                  <td className="border border-gray-300 p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        leave.leave_status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {leave.leave_status}
                    </span>
                  </td>
                  <td className="border border-gray-300 p-3">
                    {leave.document ? (
                      <a
                        href={`${backendUrl}/uploads/leaves/${encodeURI(leave.document.replace(/\\/g, "/"))}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEye size={18} /> {/* Eye icon for viewing the document */}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="border border-gray-300 p-3">
                    <div className="flex justify-center space-x-4">
                      {/* Edit Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onEdit(leave)}
                        className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition-all duration-200"
                        title="Edit"
                      >
                        <FaEdit size={18} />
                      </motion.button>

                      {/* Delete Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onDelete(leave.id)}
                        className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-all duration-200"
                        title="Delete"
                      >
                        <FaTrash size={18} />
                      </motion.button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  No active leave records.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

// Leave Form Component (Remains the same as before)
const LeaveForm = ({ onSave, editingLeave, onCancelEdit }) => {
  const [leaveData, setLeaveData] = useState({
    leave_type: "Sick",
    start_date: "",
    end_date: "",
    reason: "",
    leave_status: "pending",
    document: null,
  });

  const [documentPreview, setDocumentPreview] = useState(null);

  // Function to format date for input[type="date"]
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (editingLeave) {
      // Pre-fill form with editingLeave data (including dates)
      setLeaveData({
        leave_type: editingLeave.leave_type,
        start_date: formatDateForInput(editingLeave.start_date),
        end_date: formatDateForInput(editingLeave.end_date),
        reason: editingLeave.reason,
        leave_status: editingLeave.leave_status,
        document: null, // Reset document to null when editing
      });
      if (editingLeave.document) {
        setDocumentPreview(editingLeave.document); // Set document preview if editing
      }
    } else {
      // Reset form to default state if not editing
      setLeaveData({
        leave_type: "Sick",
        start_date: "",
        end_date: "",
        reason: "",
        leave_status: "pending",
        document: null,
      });
      setDocumentPreview(null); // Clear document preview
    }
  }, [editingLeave]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveData({ ...leaveData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLeaveData({ ...leaveData, document: file });
      setDocumentPreview(URL.createObjectURL(file)); // Preview the uploaded file
    }
  };

  const calculateDays = () => {
    if (!leaveData.start_date || !leaveData.end_date) return 0; // Prevent invalid calculation
    const start = new Date(leaveData.start_date);
    const end = new Date(leaveData.end_date);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const days = calculateDays();

    if (days > 5 && !leaveData.document) {
      alert("Document is required for leaves longer than 5 days.");
      return;
    }

    onSave(leaveData);
    console.log(leaveData);
    setLeaveData({
      leave_type: "Sick",
      start_date: "",
      end_date: "",
      reason: "",
      leave_status: "pending",
      document: null,
    });
    setDocumentPreview(null); // Clear document preview
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full p-6 bg-white rounded-lg shadow-md"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        {editingLeave ? "Edit Leave" : "Apply Leave"}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Grid Container for 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Leave Type */}
          <div>
            <label className="block font-medium">Leave Type</label>
            <select
              name="leave_type"
              value={leaveData.leave_type}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="Sick">Sick</option>
              <option value="Casual">Casual</option>
              <option value="Emergency">Emergency</option>
            </select>
          </div>

          {/* Reason Field */}
          <div>
            <label className="block font-medium">Reason</label>
            <input
              type="text"
              name="reason"
              className="w-full p-2 border rounded"
              value={leaveData.reason}
              onChange={handleChange}
              required
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="block font-medium">Start Date</label>
            <div className="relative">
              <input
                type="date"
                name="start_date"
                value={leaveData.start_date}
                onChange={handleChange}
                className="w-full border p-2 rounded pl-10"
                required
              />
              <FaCalendarAlt className="absolute left-3 top-3 text-gray-500" />
            </div>
          </div>

          {/* End Date */}
          <div>
            <label className="block font-medium">End Date</label>
            <div className="relative">
              <input
                type="date"
                name="end_date"
                value={leaveData.end_date}
                onChange={handleChange}
                className="w-full border p-2 rounded pl-10"
                required
              />
              <FaCalendarAlt className="absolute left-3 top-3 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Document Upload (If leave exceeds 5 days) */}
        {calculateDays() > 5 && (
          <div className="mt-4">
            <label className="block font-medium">Upload Document</label>
            <div className="relative">
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full border p-2 rounded pl-10"
                required
              />
              <FaFileUpload className="absolute left-3 top-3 text-gray-500" />
            </div>
          </div>
        )}

        {/* Submit and Cancel Buttons */}
        <div className="mt-6 flex space-x-4">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded hover:from-blue-600 hover:to-purple-600 transition-all"
          >
            {editingLeave ? "Update Leave" : "Apply Leave"}
          </button>
          {editingLeave && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded hover:from-blue-600 hover:to-purple-600 transition-all"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default StudentLeave;