import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import UploadOCR from "./pages/UploadOCR";
import SearchMedicine from "./pages/SearchMedicine.jsx";
import Test from "./pages/Test.jsx";
import { useState } from "react";
import styled from "styled-components";

function HomePage({ detectedName, setDetectedName, uploadMessage, setUploadMessage }) {
  const navigate = useNavigate();

  return (
    <APP>
    <h1>Training  Phase</h1>
      <Top>
        <UploadOCR
          detectedName={detectedName}
          setDetectedName={setDetectedName}
          uploadMessage={uploadMessage}
          setUploadMessage={setUploadMessage}
        />
        <Button>
          <button className="test" onClick={() => navigate("/test")}>
            Test
          </button>
        </Button>
      </Top>

      <SearchMedicine
        detectedName={detectedName}
        setDetectedName={setDetectedName}
        uploadMessage={uploadMessage}
        setUploadMessage={setUploadMessage}
      />
    </APP>
  );
}

function App() {
  const [detectedName, setDetectedName] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            detectedName={detectedName}
            setDetectedName={setDetectedName}
            uploadMessage={uploadMessage}
            setUploadMessage={setUploadMessage}
          />
        }
      />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}

const APP = styled.div`
display: flex;
flex-direction: column;
align-items: center;

`

const Top = styled.div`
display: flex;
`
const Button = styled.div`
padding-top: 60px;
margin-left: 50px;
.test{
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
