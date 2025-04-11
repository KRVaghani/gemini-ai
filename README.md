# Multi-Model AI Assistant

This project is a web application initially based on the "Baking with the Gemini API" demo, extended to support multiple Large Language Models (LLMs) and include a chat history feature.

Users can select an image, provide a text prompt, choose a language model (Gemini, DeepSeek, ChatGPT, Local), and receive generated output. The interactions are logged in a history section for review.

## Features

*   **Image and Text Input:** Accepts both image selection and text prompts.
*   **Multi-Model Support:** Allows switching between different LLMs:
    *   Google Gemini API (Implemented)
    *   DeepSeek (Placeholder)
    *   ChatGPT (Placeholder)
    *   Local LLM (Placeholder via local server)
*   **Chat History:** Displays a log of previous interactions (Model, Prompt, Result).
*   **Markdown Rendering:** Renders the model's output as Markdown.
*   **Simple Web Interface:** Built with HTML, CSS, and vanilla JavaScript.
*   **Python Backend:** Uses a basic Python server (likely Flask, based on common patterns for these demos) to serve the frontend and handle API requests.

## Technologies Used

*   HTML5
*   CSS3
*   JavaScript (ES Modules)
*   Python 3
*   Flask (or similar Python web framework implied by `main.py` and `requirements.txt`)
*   Google Gemini API
*   [markdown-it](https://github.com/markdown-it/markdown-it) (for Markdown rendering)
*   [base64-js](https://github.com/beatgammit/base64-js) (for image handling)

## Setup Instructions

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/KRVaghani/gemini-ai.git
    cd gemini-ai
    ```

2.  **Create a Virtual Environment (Recommended):**
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3.  **Install Python Dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

## Configuration

### API Keys

*   **Google Gemini API:**
    *   You need a Gemini API key. Obtain one from [Google AI Studio](https://aistudio.google.com/app/apikey).
    *   The application expects the API key to be available as an environment variable named `API_KEY`.
    *   Set the environment variable in your terminal before running the server:
        ```bash
        export API_KEY='YOUR_GEMINI_API_KEY'
        ```
        (On Windows Command Prompt, use `set API_KEY=YOUR_GEMINI_API_KEY` or use PowerShell syntax `$env:API_KEY='YOUR_GEMINI_API_KEY'`)
    *   Alternatively, you can modify `main.py` to load the key from a `.env` file or other configuration method.

*   **DeepSeek / ChatGPT:**
    *   The integration for these models in `web/main.js` is currently a placeholder.
    *   To implement them, you will need to:
        1.  Sign up for their respective API keys.
        2.  Modify `web/main.js` to include the JavaScript logic to call their APIs.
        3.  Potentially adjust the Python backend (`main.py`) if server-side API calls are needed (recommended for keeping API keys secure).

*   **Local Model:**
    *   The "Local Model" option assumes you have an LLM running locally and exposed via an API endpoint (e.g., `http://localhost:11434` for Ollama).
    *   You will need to modify the placeholder fetch call in `web/main.js` within the `else if (selectedModel === 'local')` block to point to your local model's API endpoint and handle its specific request/response format.

## Running the Application

1.  **Ensure API Key is Set:** Make sure the `API_KEY` environment variable is set for Gemini (see Configuration section).
2.  **Make the Server Script Executable (Linux/macOS):**
    ```bash
    chmod +x devserver.sh
    ```
3.  **Start the Development Server:**
    ```bash
    ./devserver.sh
    ```
4.  **Access the Application:** Open your web browser and navigate to `http://localhost:8080` (or the port specified in the `devserver.sh` script or `main.py`).

## How It Works

*   The frontend (`web/index.html`, `web/style.css`, `web/main.js`) provides the user interface for selecting images, entering prompts, choosing models, and displaying results/history.
*   JavaScript (`web/main.js`) handles:
    *   Reading user input and selected model.
    *   Fetching the selected image and encoding it.
    *   Making API calls (currently implemented for Gemini, placeholders for others) based on the selected model.
    *   Updating the output area with the response.
    *   Appending interactions to the history log.
*   The Python backend (`main.py`) serves the static web files and likely includes an endpoint (`/generate`) that the frontend JavaScript calls to interact with the Gemini API securely (keeping the API key server-side).
*   The `devserver.sh` script is a convenience wrapper to run the Python backend server.

## Future Enhancements

*   Implement API call logic for DeepSeek and ChatGPT.
*   Implement robust interaction logic for local models.
*   Add more sophisticated error handling and user feedback.
*   Improve UI/UX further.
*   Allow clearing chat history.
*   Potentially add conversation context support for models that allow it.
