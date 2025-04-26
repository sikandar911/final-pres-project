import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

export default function UploadOCR({ setDetectedName, detectedName, setUploadMessage }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null); 
  const [medicineData, setMedicineData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile)); 
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image file first");
      return;
    }

    setLoading(true);
    setError(null);
    setMedicineData(null);
    setDetectedName(null);

    const formData = new FormData();
    formData.append("File", file);

    try {
      const response = await axios.post(
        "https://api-premed.azurewebsites.net/Medicine/OCR",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Accept": "/",
            "Origin": "http://localhost:5173",
          },
        }
      );

      setUploadMessage(null);
      setMedicineData(response.data.medicine);
      setDetectedName(response.data.detectedName);
    } catch (err) {
      console.error(err);
      setError("Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Upload>
      <h3 className="headl">Upload Medicine Image</h3>

      <input type="file" accept="image/*" onChange={handleFileChange} />

      {preview && (
        <div className="preview-image">
          <img
            src={preview}
            alt="Selected medicine"
            className="mt-2 rounded border shadow w-full max-h-60 object-contain"
          />
        </div>
      )}

      <button
        onClick={handleUpload}
        className="upload"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {medicineData && (
        <div className="mt-4 p-4 border rounded shadow">
          <h3 className="text-lg font-semibold">Medicine Details</h3>
          <p><strong>Detected Name:</strong> {detectedName}</p>
        </div>
      )}
 
    </Upload>
  );
}
const Upload = styled.div `
 padding: 20px;
display: block;



.preview-image{
  margin-top: 10px;
  width: 200px;
  max-width: 120px;
  height: auto; 
}
.preview-image img{
  width: 180px;
  height: auto;
}

.upload{
  color: white;
    margin-top: 10px;
 padding: 10px 18px;
 margin-left: 0px;
 width: fit-content;
 background-color: #404040;
 border-radius: 5px;
 border: none;
 transition: 0.4s background ease-in;
 cursor: pointer;
 font-size: 16px;
 text-align: left;
 text-decoration: none;
}

`