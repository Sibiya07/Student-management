import React, { useState } from "react";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";

const Bulk = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      setMessage("No file selected.");
      return;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      setMessage("File is too large! Please upload a file smaller than 5MB.");
      return;
    }
    setFile(selectedFile);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:4000/api/bulk/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Upload failed. Please try again.");
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-50 to-blue-50 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-purple-800 mb-6 text-center">
          Upload Users CSV
        </h2>

        {/* File Upload Section */}
        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-purple-300 rounded-lg cursor-pointer hover:bg-purple-50 transition">
          <FaCloudUploadAlt className="text-purple-500 text-4xl mb-3" />
          <span className="text-purple-600 text-sm">
            {file ? file.name : "Click to upload CSV"}
          </span>
          <input
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className={`w-full mt-6 py-3 text-white rounded-lg transition ${
            loading
              ? "bg-purple-400 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          }`}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>

        {/* Message Display */}
        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              message.includes("failed") ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Bulk;