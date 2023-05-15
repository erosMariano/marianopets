import React, { useState, ChangeEvent } from "react";

function Teste() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [percent, setPercent] = useState(0);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(event.target.files);
    }
  };

  const handleUpload = () => {
    if (!files) {
      alert("Please upload images first!");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Handle the response from the server
      })
      .catch((error) => {
        console.error("Error uploading images:", error);
      });
  };

  return (
    <div>
      <input type="file" onChange={handleChange} accept="image/*" multiple />
      <button onClick={handleUpload}>Upload to Server</button>
      <p>{percent}% done</p>
    </div>
  );
}

export default Teste;