import { streamGemini } from './gemini-api.js';

let form = document.querySelector('form');
let promptInput = document.querySelector('input[name="prompt"]');
let output = document.querySelector('.output');
let modelSelect = document.getElementById('model-select');
let historyLog = document.getElementById('history-log');
let md = new markdownit();

// Function to add entry to history
function addToHistory(model, prompt, result) {
    const entry = document.createElement('div');
    entry.classList.add('history-entry');
    entry.innerHTML = `
        <p><strong>Model:</strong> ${model}</p>
        <p><strong>Prompt:</strong> ${prompt}</p>
        <p><strong>Result:</strong></p>
        <div>${result}</div>
        <hr>
    `;
    // Prepend to keep the latest entry at the top
    historyLog.prepend(entry);
}

form.onsubmit = async (ev) => {
    ev.preventDefault();
    output.textContent = 'Generating...';

    let selectedModel = modelSelect.value;
    let currentPrompt = promptInput.value;
    let resultHtml = '';

    try {
        // Load the image as a base64 string
        let imageUrl = form.elements.namedItem('chosen-image').value;
        let imageBase64 = await fetch(imageUrl)
            .then(r => r.arrayBuffer())
            .then(a => base64js.fromByteArray(new Uint8Array(a)));

        // Assemble the prompt by combining the text with the chosen image
        let contents = [
            {
                type: "text",
                text: currentPrompt,
            },
            {
                type: "image_url",
                image_url: `data:image/jpeg;base64,${imageBase64}`,
            },
        ];

        if (selectedModel === 'gemini') {
            // Call the Gemini API
            let stream = streamGemini({
                model: 'gemini-1.5-flash', // or gemini-1.5-pro
                contents,
            });

            // Read from the stream and interpret the output as markdown
            let buffer = [];
            for await (let chunk of stream) {
                buffer.push(chunk);
                resultHtml = md.render(buffer.join(''));
                output.innerHTML = resultHtml;
            }
        } else if (selectedModel === 'deepseek') {
            // Placeholder for DeepSeek API call
            output.textContent = 'DeepSeek API integration not implemented yet.';
            resultHtml = output.textContent; // Store placeholder text for history
            // You would replace this with actual API call to DeepSeek
            // Example: resultHtml = await callDeepSeekAPI(contents);
        } else if (selectedModel === 'chatgpt') {
            // Placeholder for ChatGPT API call
            output.textContent = 'ChatGPT API integration not implemented yet.';
            resultHtml = output.textContent; // Store placeholder text for history
            // Example: resultHtml = await callChatGPTAPI(contents);
        } else if (selectedModel === 'local') {
            // Placeholder for Local Model interaction
            output.textContent = 'Local Model interaction not implemented yet. You need to set up a local server.';
            resultHtml = output.textContent; // Store placeholder text for history
            // Example: resultHtml = await callLocalModelAPI(contents);
        }

        // Add the interaction to history
        addToHistory(selectedModel, currentPrompt, resultHtml);

    } catch (e) {
        let errorMsg = '<hr>Error: ' + e;
        output.innerHTML += errorMsg;
        // Add error to history as well
        addToHistory(selectedModel, currentPrompt, output.innerHTML);
    }
};
