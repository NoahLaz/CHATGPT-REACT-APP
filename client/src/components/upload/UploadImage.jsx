import { useRef } from "react";
import "./uploadImage.css";

import { IKContext, IKUpload } from "imagekitio-react";

const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT;
const publicKey = import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY;

const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/upload");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    console.log(data);
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const UploadImage = ({ setImg }) => {
  const ikUploadRef = useRef();

  const onError = (err) => {
    console.log("Error", err);
    setImg((prev) => ({ ...prev, isLoading: false, error: err }));
  };

  const onSuccess = (res) => {
    console.log("Success", res);
    setImg((prev) => ({
      ...prev,
      isLoading: false,
      imgPath: res.filePath,
    }));
  };

  const onUploadProgress = (progress) => {
    console.log("Progress", progress);
  };

  const onUploadStart = (evt) => {
    const file = evt.target.files[0];

    const reader = new FileReader();

    reader.onloadend = () => {
      setImg((prev) => ({
        ...prev,
        isLoading: true,
        imgData: {
          inlineData: {
            data: reader.result.split(",")[1],
            mimeType: file.type,
          },
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="uploadImage">
      <IKContext
        urlEndpoint={urlEndpoint}
        publicKey={publicKey}
        authenticator={authenticator}
      >
        <IKUpload
          useUniqueFileName={true}
          fileName="test-upload.png"
          onError={onError}
          onSuccess={onSuccess}
          onUploadProgress={onUploadProgress}
          onUploadStart={onUploadStart}
          style={{ display: "none" }}
          ref={ikUploadRef}
        />
        <label
          htmlFor="file"
          className="attachment"
          onClick={() => ikUploadRef.current.click()}
        >
          <img src="/attachment.png" alt="" />
        </label>
      </IKContext>
    </div>
  );
};

export default UploadImage;
