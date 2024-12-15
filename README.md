# AI Story Generator

## Overview
This project is a single-page web application that uses Google Generative AI to create captivating stories based on user-provided inputs. Users can specify the theme, genre, and characters for the story, and the application generates a creative and engaging narrative tailored to their preferences.

---

## Features
- **Interactive Story Creation**: Users can input a theme, genre, and character details to generate a unique story.
- **Customizable Outputs**: Uses generative AI settings like temperature, max tokens, top-p, frequency penalty, and presence penalty to fine-tune the story.
- **Efficient Prompt Engineering**: Employs techniques such as role-based prompting and contextual prompting for high-quality outputs.

---

## Installation

### Prerequisites
1. Node.js installed on your machine.
2. A Google Generative AI API key (Gemini model).
3. Environment setup with `.env` file for API key configuration.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ai-story-generator.git
   cd ai-story-generator
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   Create a `.env` file in the root directory and add the following line:
   ```env
   gemini=YOUR_GOOGLE_GENERATIVE_AI_API_KEY
   ```
4. Run the application:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

## Key Concepts Used
### Prompt Engineering Techniques
1. **Role-Based Prompting**: The AI is guided to adopt the role of a creative writer.
2. **Contextual Prompting**: Inputs provide explicit context for better alignment with user expectations.
3. **Iterative Refinement**: Adjustments to parameters ensure balance between creativity and coherence.
4 **Negative Prompting**: The prompt explicitly instructs the AI on what not to do, such as avoiding specific content or exceeding certain limits. For example, "Do not include any violent language" or "Avoid using more than 100 words."
### AI Configuration
- **Temperature**: `0.7` (Balanced creativity and factual accuracy).
- **Max Tokens**: `500` (Limits the story length to ensure concise narratives).
- **Top-p**: `0.9` (Encourages diverse yet focused outputs).
- **Frequency Penalty**: `0.2` (Minimizes repetitive word usage).
- **Presence Penalty**: `0.3` (Promotes a diverse vocabulary).


