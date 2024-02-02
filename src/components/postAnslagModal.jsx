import { useState, useEffect } from "react";
import { TextInput, Button, FileInput, Modal } from "@mantine/core";
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

  const handleChange = (field, file) => {
    if (field === "image" && file) {
      // Convert the selected file to base64
      const reader = new FileReader();
      reader.onload = () => {
        console.log(reader.result); // Log the result to check if it's a valid base64 string
        setForm({
          ...form,
          values: {
            ...form.values,
            [field]: reader.result, // Set the base64 string as the value
          },
          isValid: form.values.title !== "",
        });
      };
      // Read the selected file
      reader.readAsDataURL(file);
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
            setAnslagPost(error.response.data.message);
          } else {
            setAnslagPost("Error occurred during registration.");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
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
