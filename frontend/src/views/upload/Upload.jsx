import React from 'react';

function Upload() {
  const handleMulterUpload = async (e) => {
    e.preventDefault();
    const file = e.target.uploaded_file.files[0];

    const data = new FormData();
    data.append("uploaded_file", file);

    try {
      const res = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: data
      });
      const result = await res.json();
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCloudinaryUpload = async (e) => {
    e.preventDefault();
    const file = e.target.uploaded_file_cloud.files[0];

    const data = new FormData();
    data.append("uploaded_file_cloud", file);

    try {
      const res = await fetch("http://localhost:3001/upload-cloud", {
        method: "POST",
        body: data
      });
      const result = await res.json();
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendEmail = async () => {
    try {
      const res = await fetch("http://localhost:3001/send-email");
      const result = await res.json();
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1>Upload File tramite Multer</h1>
      <form onSubmit={handleMulterUpload}>
        <input type="file" name="uploaded_file" />
        <button type="submit">Salva File</button>
      </form>

      <hr />

      <h1>Upload File tramite Cloudinary</h1>
      <form onSubmit={handleCloudinaryUpload}>
        <input type="file" name="uploaded_file_cloud" />
        <button type="submit">Salva File</button>
      </form>

      <hr />

      <h1>Send Email</h1>
      <button onClick={handleSendEmail}>Invia Email</button>
    </div>
  );
}

export default Upload;
