import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import {
    BrowserRouter as Router,
    useNavigate,
  } from "react-router-dom";

export default function Test() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null); 
  const [brandName, setBrandName] = useState(null);
  const [generic, setGeneric] = useState();
  const [dose, setDose] = useState();
  const [dosageForm, setDosageForm] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
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
    setBrandName(null);
    setGeneric(null);
    setDose(null);
    setDosageForm(null)

 

    const formData = new FormData();
    formData.append("File", file);

    try {
      const response = await axios.post(
        "https://api-premed.azurewebsites.net/Medicine/Analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Accept": "/",
            "Origin": "http://localhost:5173",
           
          },
        }
      );

      
      setBrandName(response.data.brandName);
      setDosageForm(response.data.dosageForm)
      setGeneric(response.data.generic)
      setDose(response.data.dose)
    } catch (err) {
      console.error(err);
      setError("Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Main>
    <Upload>
    <div className="form">
    <h1>Testing</h1>
      <h3 className="headl">Upload Medicine Image For Test</h3>

      <input type="file" accept="image/*" onChange={handleFileChange} />

      {preview && (
        <div className="preview-image">
          <img
            src={preview}
            alt="Selected medicine"
            className=""
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

      <Medicine_info>

      {brandName &&(
        <div>
        <h3>Medicine Info</h3>
        <p><strong>Brand Name: </strong>{brandName}</p>
        </div>
      )}
      {dosageForm &&(
        <div className="bas">
        <p><strong>Dosage form: </strong>{dosageForm}</p>
        </div>
      )}
      {generic &&(
        <div className="bas">
        <p><strong>Generic: </strong>{generic}</p>
        </div>
      )}
      {dose &&(
        <div className="bas">
        <p><strong>Dose: </strong>{dose}</p>
        </div>
      )}
      </Medicine_info>
      </div>
      <div>
      <button className="train" onClick={() => navigate("/")}>
      Training 
      </button>
      </div>
    </Upload>
    
    </Main>
  );
}

const Main = styled.div`
display: flex;
padding-top: 20px;
display: flex;
flex-direction: column;
align-items: center;


`
const Medicine_info = styled.div`
 background-color: #CECECE;
 text-align: left;
 font-size: 16px;
 margin-top: 10px;
 padding: 15px;
 border-radius: 10px;
`
const Upload = styled.div `
 padding: 20px;
 display: flex;
 align-items: left;
 text-align: left;
 
 .form{
    display: flex;
    flex-direction: column;
    
 }

.preview-image{
  margin-top: 10px;
  width: auto;
  height: auto;
}
.bas{
  margin: 0px;
}


.train , .upload{
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