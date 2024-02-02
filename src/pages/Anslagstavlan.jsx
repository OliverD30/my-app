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
      {/* Map over the anslag array and render Paper component for each object */}
      {anslagData && anslagData.anslag.map(anslagItem => (
        <Paper key={anslagItem._id} shadow="sm" style={{ marginBottom: "20px" }}>
          <h3>{anslagItem.title}</h3>
          <p>{anslagItem.body}</p>
          {anslagItem.image && (
            <img src={anslagItem.image} alt="Anslag Image" style={{ maxWidth: "100%" }} />
          )}
          <p>Posted by: {anslagItem.username}</p>
          <p>Date: {anslagItem.date}</p>
          <Button onClick={() => handleDelete(anslagItem._id)}>Delete</Button>
        </Paper>
      ))}
    </div>
  );
};

export default Anslagstavlan;
