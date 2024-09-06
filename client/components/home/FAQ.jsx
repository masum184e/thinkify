import { useState } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';

const faqData = [
  { question: 'What is Thinkify?', answer: 'Thinkify is a student-focused web platform designed to help manage tasks, share thoughts, and organize posts in an interactive and collaborative environment.' },
  { question: 'What features are available for post management?', answer: 'You can create, edit, delete, and organize your posts efficiently.' },
  { question: 'Is Thinkify only for students?', answer: 'Thinkify is primarily designed for students, but it may also be beneficial for anyone looking to stay organized and share thoughts in a collaborative environment.' },
  { question: 'Can I share my thoughts publicly on Thinkify?', answer: 'Yes, Thinkify allows users to share their thoughts with others. You can choose to post publicly or privately, depending on your preference.' },
  { question: 'How can I interact with other students on Thinkify?', answer: 'You can interact with other students by commenting on their shared thoughts.' },
];

const FAQ = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(faqData[0]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        border: '2px solid #1b2e35',
        borderRadius: '20px',
        overflow: 'hidden',
        padding: '20px',
        maxWidth: '1280px',
        margin: '50px auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '40%',
        }}
      >
        {faqData.map((faq, index) => (
          <Button
            key={index}
            onClick={() => setSelectedQuestion(faq)}
            sx={{
              textAlign: 'left',
              backgroundColor: selectedQuestion.question === faq.question ? '#1b2e35' : 'white',
              color: selectedQuestion.question === faq.question ? 'white' : '#1b2e35',
              borderRadius: '10px',
              padding: '10px',
              fontWeight: 'bold',
              boxShadow: selectedQuestion.question === faq.question ? '0px 4px 10px rgba(0, 0, 0, 0.2)' : 'none',
              transition: '0.3s',
              '&:hover': {
                backgroundColor: selectedQuestion.question === faq.question ? '#1b2e35' : '#f0f0f0',
              },
            }}
          >
            {faq.question}
          </Button>
        ))}
      </Box>

      <Paper
        sx={{
          width: '55%',
          padding: '20px',
          backgroundColor: '#1b2e35',
          borderRadius: '15px',
          color:"white"
        }}
        elevation={3}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
          Answer
        </Typography>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
          {selectedQuestion.answer}
        </Typography>
      </Paper>
    </Box>
  );
};

export default FAQ;
