// src/FAQ.tsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FAQContainer = styled.div`
  max-width: 800px;
  margin: 40px auto;
  font-family: Arial, sans-serif;
`;

const FAQHeader = styled.h1`
  text-align: center;
  margin-bottom: 40px;
`;

const FAQItem = styled(motion.div)`
  margin-bottom: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const FAQSummary = styled(motion.summary)`
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  padding: 15px;
  background: #007BFF;
  color: white;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FAQDetails = styled(motion.div)`
  padding: 0 20px 20px;
`;

const FAQ: React.FC = () => {
  return (
    <FAQContainer>
      <FAQHeader>Frequently Asked Questions (FAQs)</FAQHeader>
      
      <FAQItem initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <details>
          <FAQSummary whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            1. What is BloxAI and what can it do?
          </FAQSummary>
          <FAQDetails>
            <p>BloxAI is an advanced AI-powered tool designed to streamline and enhance productivity by automating repetitive tasks and providing intelligent insights. It can be used for various applications such as data analysis, natural language processing, and task scheduling, helping users to save time and focus on more complex tasks.</p>
          </FAQDetails>
        </details>
      </FAQItem>

      <FAQItem initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
        <details>
          <FAQSummary whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            2. How can I install BloxAI on my system?
          </FAQSummary>
          <FAQDetails>
            <p>To install BloxAI, follow these steps:</p>
            <ol>
              <li>Clone the repository using: <code>git clone https://github.com/subhadeeproy3902/BloxAI.git</code></li>
              <li>Navigate to the project directory with: <code>cd BloxAI</code></li>
              <li>Install the necessary dependencies by running: <code>npm install</code></li>
              <li>Start the application using: <code>npm start</code></li>
            </ol>
            <p>Ensure that you have Node.js and npm installed on your system before proceeding with the installation.</p>
          </FAQDetails>
        </details>
      </FAQItem>

      <FAQItem initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
        <details>
          <FAQSummary whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            3. How do I use BloxAI to automate repetitive tasks?
          </FAQSummary>
          <FAQDetails>
            <p>To use BloxAI for automating tasks, follow these steps:</p>
            <ol>
              <li>Create a new task script in the designated scripts directory.</li>
              <li>Define the tasks you want to automate using the provided APIs and libraries.</li>
              <li>Configure the task scheduler to run your scripts at specified intervals or triggers.</li>
              <li>Monitor the task execution and review the logs to ensure everything runs smoothly.</li>
            </ol>
            <p>Refer to the <a href="#user-guide">User Guide</a> for detailed examples and use cases.</p>
          </FAQDetails>
        </details>
      </FAQItem>

      <FAQItem initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }}>
        <details>
          <FAQSummary whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            4. How can I contribute to the development of BloxAI?
          </FAQSummary>
          <FAQDetails>
            <p>We welcome contributions from the community! To contribute:</p>
            <ol>
              <li>Fork the repository to your GitHub account.</li>
              <li>Clone the forked repository to your local machine.</li>
              <li>Create a new branch for your feature or bug fix: <code>git checkout -b feature-name</code></li>
              <li>Make your changes and commit them with descriptive messages.</li>
              <li>Push your changes to your forked repository.</li>
              <li>Open a pull request to the main repository with a detailed description of your changes.</li>
            </ol>
            <p>Ensure you follow our <a href="CONTRIBUTING.md">Contributing Guidelines</a> for more information on the contribution process.</p>
          </FAQDetails>
        </details>
      </FAQItem>

      <FAQItem initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.4 }}>
        <details>
          <FAQSummary whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            5. Where can I find the detailed documentation for BloxAI?
          </FAQSummary>
          <FAQDetails>
            <p>You can find the detailed documentation for BloxAI in the <a href="docs">docs</a> directory of this repository. Additionally, the documentation is available on our <a href="https://example.com/docs">official website</a>. The documentation includes setup guides, API references, and examples to help you get started and make the most of BloxAI.</p>
          </FAQDetails>
        </details>
      </FAQItem>

      <FAQItem initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.5 }}>
        <details>
          <FAQSummary whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            6. Who can I contact for support or questions regarding BloxAI?
          </FAQSummary>
          <FAQDetails>
            <p>If you have any questions or need support, you can open an issue on our GitHub repository. For more direct assistance, you can contact us at support@example.com. We also have a community forum where you can ask questions and share insights with other BloxAI users.</p>
          </FAQDetails>
        </details>
      </FAQItem>
    </FAQContainer>
  );
};

export default FAQ;
