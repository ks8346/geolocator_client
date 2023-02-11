import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, FormControl,FloatingLabel } from 'react-bootstrap';
const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [responseData, setResponseData] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/getLocation/`, {
        params: { location: inputValue }
      });
      // const data = await response.json();
      setResponseData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container className='d-flex justify-content-center align-items-center' style={{justifyContent:'center',alignContent: 'center',alignItems:'center', height: '80vh',display:'flex' }}>
        <Form onSubmit={handleSubmit} style={{textAlign:'center',justifyContent:'center',height: '50vh',lineHeight:'3vh'}}>
          <Form.Group className="mb-3">
          <FloatingLabel size="md" label = "Enter location">
          <FormControl
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter location"
            size="lg"
          />
          </FloatingLabel>
          </Form.Group>
          <Button variant="primary" type="submit" size="lg">
          Submit
        </Button>
        {responseData ? <p Style={{lineHeight:'5vh'}}>{responseData.name}</p> : null}
        </Form>
      </Container>
    </>
  );
};

export default App;
