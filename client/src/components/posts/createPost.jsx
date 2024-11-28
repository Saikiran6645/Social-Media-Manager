// import React, { useState } from "react";
import { postApi } from "../../services/postApi"; // Ensure this is correctly set up
// import { useMutation } from "@tanstack/react-query";~
import { useSelector } from "react-redux";
import imageCompression from "browser-image-compression"; // Import image compression library
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useSelector } from "react-redux";
// import { postApi } from "../../services/postApi";

const CreatePost = () => {
  const [image, setImage] = useState(null);
  const [base64String, setBase64String] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploaing, setuploading] = useState(false);
  const queryClient = useQueryClient();
  const id = useSelector((state) => state.auth.user.id);
  const username = useSelector((state) => state.auth.user.username);

  const mutate = useMutation({
    mutationFn: postApi,
    mutationKey: ["createPost"],
    onError: (error) => {
      
      console.error("Error submitting post:", error);
      setErrorMessage("Failed to submit post. Please try again.");
    },
  });

  const resetForm = () => {
    setImage(null);
    setBase64String("");
    setDescription("");
    setErrorMessage("");
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      try {
        setuploading(true);
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
        });
        convertToBase64(compressedFile);
      } catch (error) {
        console.error("Error compressing image:", error);
        setErrorMessage("Error compressing image.");
      }
    } else {
      setErrorMessage("Please select a valid image file.");
      resetForm();
    }
  };

  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64String(reader.result);
      setImage(file); // Store the file after conversion
      setuploading(false);
    };
    reader.onerror = (error) => {
      console.error("Error converting file:", error);
      setErrorMessage("Error converting file to Base64.");
    };
    reader.readAsDataURL(file); // Convert the file to base64
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!base64String || !description) {
      setErrorMessage("Both image and description are required.");
      return;
    }

    const data = { img: base64String, desc: description, id,username };

    setIsLoading(true); // Start loading

    mutate
      .mutateAsync(data)
      .then((data) => {
        console.log(data);

        resetForm();
        queryClient.invalidateQueries("posts");
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Create a Post</h1>
      <form onSubmit={handleSubmit}>
        {uploaing && <p>Uploading image...</p>}
        {/* {!uploaing && <p>Uploading image...</p>} */}

        <div style={styles.formGroup}>
          <label htmlFor="image" style={styles.label}>
            Image:
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="description" style={styles.label}>
            Description:
          </label>
          <textarea
            id="description"
            rows="4"
            value={description}
            onChange={handleDescriptionChange}
            required
            style={styles.textarea}
          />
        </div>
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}
        {isLoading && <p>Submitting your post...</p>}
        <button type="submit" style={styles.submitButton} disabled={isLoading}>
          Submit Post
        </button>
      </form>
    </div>
  );
};

// Styles for the component
const styles = {
  container: {
    maxWidth: "1000px",
    margin: "auto",
    padding: "20px",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  header: {
    textAlign: "center",
    color: "#4a90e2",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "10px",
    width: "100%",
  },
  textarea: {
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "10px",
    width: "100%",
  },
  error: {
    color: "red",
  },
  submitButton: {
    backgroundColor: "#4a90e2",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "10px 15px",
    cursor: "pointer",
  },
};

export default CreatePost;
