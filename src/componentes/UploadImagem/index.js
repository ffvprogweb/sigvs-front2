import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [id, setId] = useState("");
  /*const url = "http://localhost:8080/api/v1/produtos/imadb";*/
  const url =
    "https://produto-backend2-0bd4ca5d2150.herokuapp.com/api/v1/produtos/imadb";
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (selectedFile && id) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("id", id);

      axios
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Resposta da API:", response.data);
          // Lidar com a resposta da API após o upload do arquivo
        })
        .catch((error) => {
          console.error("Erro ao fazer upload:", error);
        });
    } else {
      console.log("Por favor, selecione um arquivo de imagem e forneça um ID.");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Upload de Imagem</h3>
      <form onSubmit={handleUpload} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="inputId" className="form-label">
            ID:
          </label>
          <input
            type="text"
            className="form-control"
            id="inputId"
            value={id}
            onChange={handleIdChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputFile" className="form-label">
            Escolher arquivo de imagem
          </label>
          <input
            type="file"
            className="form-control"
            id="inputFile"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default ImageUpload;
