import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
  font-family: Arial, sans-serif;
`;

const Header = styled.header`
  position: absolute;
  top: 0;
  width: 100%;
  height: 60px;
  background-color: #007bff;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const Form = styled.form`
  display: flex;
  margin-bottom: 2rem;
  width: 80%;
  max-width: 600px;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 10px;
  margin-right: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const UrlList = styled.ul`
  list-style-type: none;
  width: 100%;
  max-width: 600px;
`;

const UrlListItem = styled.li`
  background-color: #fff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
`;

function App() {
  const [url, setUrl] = useState("");
  const [shortUrls, setShortUrls] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Add validation for URL before making the API call

    try {
      const response = await axios.get(
        `https://api.shrtco.de/v2/shorten?url=${url}`
      );
      setShortUrls((prevShortUrls) => [
        ...prevShortUrls,
        [response.data.result.full_short_link, url],
      ]);
    } catch (error) {
      // Handle the error
      console.error("Error:", error);
    }
  };

  return (
    <AppContainer>
      <Header>
        <h1>URL Shortener</h1>
      </Header>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Enter URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button type="submit">Shorten it!</Button>
      </Form>

      <UrlList>
        {shortUrls
          .map((shortUrl, index) => (
            <UrlListItem key={index}>
              <a href={shortUrl[1]} target="_blank" rel="noopener noreferrer">
                {shortUrl[1]}
              </a>

              <span> -> </span>

              <a
                href={shortUrl[0]}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textAlign: "right",
                }}
              >
                {shortUrl[0]}
              </a>
            </UrlListItem>
          ))
          .reverse()}
      </UrlList>
    </AppContainer>
  );
}

export default App;
