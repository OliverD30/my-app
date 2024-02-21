import PostAnslag from "../components/postAnslagModal";
import axios from "axios";
import { useState, useEffect } from "react";
import { Paper, Button } from "@mantine/core";

const Anslagstavlan = () => {
  const [anslagData, setAnslagData] = useState(null);

  useEffect(() => {
    // Call your API when the component mounts
    axios.get("https://auth-backend-theta.vercel.app/get-anslag")
      .then(response => {
        // Handle the response data
        setAnslagData(response.data);
        console.log(response.data)
      })
      .catch(error => {
        // Handle errors
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array to run the effect only once when the component mounts

  const handlePostSubmission = () => {
    axios
      .get("https://auth-backend-theta.vercel.app/get-anslag")
      .then((response) => {
        setAnslagData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleDelete = (id) => {
    // Make a DELETE request to your backend API to delete the post with the given ID
    axios.delete(`https://auth-backend-theta.vercel.app/delete-anslag/${id}`)
      .then(() => {
        // Update the state to reflect the deletion
        setAnslagData(prevData => ({
          ...prevData,
          anslag: prevData.anslag.filter(item => item._id !== id)
        }));
      })
      .catch(error => {
        console.error("Error deleting post:", error);
      });
  };

  return (
    <div>
      <h1>Anslagstavlan</h1>
      <p>Detta är Anslagstavlan</p>
      <PostAnslag handlePostSubmission={handlePostSubmission} />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
      
      {anslagData &&
        anslagData.anslag.map((anslagItem) => (
          <Paper
            key={anslagItem._id}
            shadow="xl"
            style={{
              marginBottom: "20px",
              position: "relative",
              width: "100%", // Set width to 100% by default
              marginRight: "20px",
              // Adjust width for different screen sizes
              "@media (min-width: 768px)": {
                width: "calc(33.33% - 20px)", // Set width to approximately 33.33% for tablets and larger
              },
              "@media (max-width: 767px)": {
                width: "calc(100% - 20px)", // Set width to 100% for mobile
              },
            }}
            withBorder
          >
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
              <h3 style={{ fontSize: "24px", margin: "0" }}>{anslagItem.title}</h3>
              <p style={{ fontSize: "12px", margin: "0" }}>Posted by: {anslagItem.username}</p>
            </div>
            {anslagItem.image && (
              <div style={{ textAlign: "center", marginBottom: "10px" }}>
                <img
                  src={anslagItem.image}
                  alt="Anslag Image"
                  style={{ maxWidth: "90%", borderRadius: "8px" }}
                />
              </div>
            )}
            <p style={{ marginBottom: "10px" }}>{anslagItem.body}</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p style={{ fontSize: "12px", margin: "0" }}>Date: {anslagItem.date}</p>
              <Button
                onClick={() => handleDelete(anslagItem._id)}
                style={{ fontSize: "12px" }}
              >
                Delete
              </Button>
            </div>
          </Paper>
        ))}
    </div>
    </div>
  );
};

export default Anslagstavlan;
