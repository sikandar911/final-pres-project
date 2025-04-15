import { useState } from "react";
import axios from "axios";
import styled from 'styled-components'
import { VscSearch } from "react-icons/vsc";

export default function SearchMedicine({ detectedName, setDetectedName, uploadMessage, setUploadMessage }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [medicineList, setMedicineList] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [selectedMedicineId, setSelectedMedicineId] = useState(null); // 👈 For future use (POST to Supervise API)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitMessage, setSubmitMessage] = useState("");
 

  const handleSearch = async (event) => {
    console.log("Name: ",detectedName);
    const value = event.target.value;
    setSearchTerm(value);

    if (value.length < 3) {
      setMedicineList([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "https://api-premed.azurewebsites.net/Medicine/Search",
        {
          params: {
            medicineName: value,
            pageSize: 10,
            pageNumber: 1,
          },
        }
      );
      setMedicineList(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch medicines. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (medicine) => {
    setSelectedMedicine(medicine);
    setSelectedMedicineId(medicine.id); // 👉 Store the selected medicine ID
    setSearchTerm(medicine.brandName);
    setMedicineList([]);
  };

  const handleSubmit = async () => {
    if (!selectedMedicineId || !detectedName) {
      setUploadMessage("Please Upload A Medicine Image");
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("medicineId", selectedMedicineId);
      formData.append("detectedName", detectedName);
  
      const response = await axios.post(
        "https://api-premed.azurewebsites.net/Medicine/Supervise",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("Supervise POST Response:", response.data);
      setSubmitMessage("Successfully submitted!");

      setDetectedName(null);
    } catch (error) {
      console.error("Submission failed:", error);
      setSubmitMessage("Failed to submit. Try again.");
    }
  };
  

  return (
    <Search>
      <h3 className="title">Search Medicine</h3>
      <SearchWrapper>
      <input
        type="text"
        placeholder="Enter medicine name..."
        value={searchTerm}
        onChange={handleSearch}
        className="searchbox"
      />
      <SearchIcon />
    </SearchWrapper>

      {loading && <p className="text-gray-500">Searching...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {medicineList.length > 0 && (
        <ul className="ullist" style={{ width: "300px" }}>
          {medicineList.map((medicine) => (
            <li
              key={medicine.id}
              onClick={() => handleSelect(medicine)}
              className="lilist"
              >
              <span >{medicine.brandName}</span><br />
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={handleSubmit}
        className="searchbutton"
      >
        Submit
      </button>

      {submitMessage && (
        <p className="submit-message">{submitMessage}</p>
      )}
      {uploadMessage && (
        <p className="upload-message">{uploadMessage}</p>
      )}
    </Search>
  );
}


const Search = styled.div`

 display: flex;
 flex-direction: column;
 padding: 20px;
 align-items: left;
 margin-left: -120px;

 .searchbox{
  width: 100%;
  padding: 10px 40px 10px 15px; 
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  color: white;
  background-color: #404040;
  
 }
 .ullist{
  border-radius:10px;
  display: block;
 }
  ul li::marker{
    color: black;
    font-size: 20px;
  }
 .lilist{
  padding: 2px;
  width: fit-content;
  &:hover{
    background-color:  #404040;
    color: white;
    padding: 3px;
    transition: all 0.3s;
  }
}
  .searchbutton{
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
  span{
    cursor: pointer;
  }

 
 .submit-message{
  color: green;
  font-size: 16px;
 }
 .upload-message{
  color:red;
  font-size: 16px;
 }
`
const SearchWrapper = styled.div`
  position: relative;
  width: 250px;
`;
const SearchIcon = styled(VscSearch)`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
  font-size: 20px;
  pointer-events: none;
`;

