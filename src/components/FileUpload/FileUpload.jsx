import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { storage } from "../../service/Firebase";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const CustomFileInput = styled.input`
  background-color: #f2f2f2;
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
  font-size: 16px;
`;

function FileUpload({ setDownloadURL }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const imageRef = ref(storage, `${selectedFile.name}`);
      await uploadBytes(imageRef, selectedFile);
      const downloadURL = await getDownloadURL(imageRef);
      setDownloadURL(downloadURL);
    }
  };

  useEffect(() => {
    handleUpload();
  }, [selectedFile]);

  return (
    <>
      <CustomFileInput type="file" onChange={handleFileSelect} />
    </>
  );
}

export default FileUpload;
