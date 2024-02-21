import React, { useState, useEffect } from "react";
import { TextInput, Button, FileInput, Modal, Alert } from "@mantine/core";
import axios from "axios";
import { useDisclosure } from '@mantine/hooks';
import Cookies from "universal-cookie";
const cookies = new Cookies();

const PostAnslag = ( { handlePostSubmission }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [form, setForm] = useState({
    values: {
      username: "",
      title: "",
      body: "",
      image: "", // Change image to string type to hold base64 data
      date: "",
    },
    isValid: false,
  });
  const [anslagPostStatus, setAnslagPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [date, setDate] = useState(""); // Add state for current date
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  useEffect(() => {
    // Retrieve the username from cookies
    const savedUsername = cookies.get("USERNAME");
    if (savedUsername) {
      setUsername(savedUsername);
    } else {

    }
    // Set current date
    const currentDate = new Date().toISOString().slice(0, 10);
    setDate(currentDate);
  }, []);

  const resizeImage = (file, maxWidth, maxHeight) => {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg'));
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleChange = async (field, file) => {
    if (field === "image" && file) {
      try {
        const resizedImage = await resizeImage(file, 800, 600); // Set your desired max width and height
        setForm({
          ...form,
          values: {
            ...form.values,
            [field]: resizedImage, // Set the resized image as the value
          },
          isValid: form.values.title !== "",
        });
      } catch (error) {
        console.error("Error resizing image:", error);
      }
    } else {
      // For other fields, update the state as before
      setForm({
        ...form,
        values: {
          ...form.values,
          [field]: file ? file : "", // Handle empty file selection
        },
        isValid: form.values.title !== "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.isValid) {
      setIsLoading(true);
      axios
        .post("https://auth-backend-theta.vercel.app/post-anslag", {
          username: username, // Send username from cookies
          title: form.values.title,
          body: form.values.body,
          image: form.values.image,
          date: date, // Send current date
        })
        .then(() => {
          setAnslagPost("success");
          handlePostSubmission()
          close(); // Close the modal after successful submission
        })
        .catch((error) => {
          if (error.response) {
            setAnslagPost(null); // Reset any previous success message
            setErrorMessage(error.response.data.message); // Set error message
          } else {
            setAnslagPost(null); // Reset any previous success message
            setErrorMessage("WHYWHYWHY"); // Set generic error message
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // If form is not valid, display error message
      setErrorMessage("Form is not valid. Please fill in all required fields.");
    }
  };

  return (
    <>
       <Modal opened={opened} onClose={close} title="TEST">
        <div
          style={{
            marginBottom: "16px",
            justifyContent: "space-between",
            display: "flex",
          }}
        >
        </div>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Titel"
            value={form.values.title}
            onChange={(event) => handleChange("title", event.target.value)}
            required
            placeholder="Titel"
          />
          <TextInput
            label="Meddelande"
            value={form.values.body}
            onChange={(event) => handleChange("body", event.target.value)}
            placeholder="Skriv ditt meddelande"
          />
          <FileInput
            leftSection=""
            placeholder="Ladda upp en bild"
            variant="filled"
            radius="md"
            clearable
            onChange={(files) => handleChange("image", files)}
          />
          {errorMessage && <Alert color="red">{errorMessage}</Alert>} 
          <Button type="submit" loading={isLoading} style={{ marginTop: "20px" }}>
            {isLoading ? "Publicerar..." : "Publicera"}
          </Button>
        </form>
      </Modal>
      <Button onClick={open}>Publicera ett meddelande</Button>
      </>
  );
};

export default PostAnslag;
