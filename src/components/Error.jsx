import { useState } from "react";
import { BASE_URL   } from "../utils/constants";
import axios from "axios";

const Error = () => {
  const [img, setImg] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");

  const uploadImage = async () => {
    if (!img) return alert("Please select an image first!");

    const formData = new FormData();
    formData.append("image", img);

    try {
      const res = await axios.post(BASE_URL + "/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploadedUrl(res.data.imageUrl);
      console.log("Uploaded:", res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-2xl my-5">Upload to Cloudinary</h1>

      <input
        type="file"
        onChange={(e) => {
          setImg(e.target.files[0]);
          setPreview(URL.createObjectURL(e.target.files[0]));
        }}
      />

      {preview && <img src={preview} alt="preview" className="w-48 mt-3" />}

      <button
        onClick={uploadImage}
        className="mt-5 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Upload
      </button>

      {uploadedUrl && (
        <div className="mt-5">
          <p>Uploaded to Cloudinary:</p>
          <a href={uploadedUrl} target="_blank" rel="noreferrer">
            {uploadedUrl}
          </a>
          <img src={uploadedUrl} alt="uploaded" className="w-48 mt-2" />
        </div>
      )}
    </div>
  );
};

export default Error;
