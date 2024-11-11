import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress
} from '@mui/material';

const Chat = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (question.trim() === '') return;
    setIsLoading(true);
    try {
      const response = await axios.post('https://cs-rag-service-v2-ae7114b79515.herokuapp.com/api/v1/query', {
        query: question,
      });
      setAnswer(response.data?.suggestedResponse);
    } catch (error) {
      console.error('Error fetching answer:', error);
      setAnswer('Sorry, an error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box my={5}>
        <Typography variant="h4" gutterBottom>
          Customer Support RAG Assistant
        </Typography>
        <TextField
          label="User Query"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={isLoading}
        />
        <Box mt={2} display="flex" alignItems="center">
          <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSubmit}
              disabled={isLoading || !question.trim()}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>
          {isLoading && (
              <Box ml={2}>
                <CircularProgress size={24} />
              </Box>
          )}
        </Box>
        {answer && (
          <Box mt={4}>
            <Typography variant="h6">Answer:</Typography>
            <Typography variant="body1">{answer}</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Chat;
