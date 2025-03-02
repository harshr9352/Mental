import fetch from 'node-fetch';

async function sendMessage() {
    console.log("sendMessage function called"); // Log when the function is called

    let input = document.getElementById("user-input").value;
    let chatbox = document.getElementById("chatbox");

    if (input.trim() !== "") {
        let userMessage = `<p><strong>You:</strong> ${input}</p>`;
        chatbox.innerHTML += userMessage;

        console.log("Sending message:", input); // Log the message being sent

        // Get response from Gemini API
        const botMessage = await getGeminiResponse(input);
        console.log("Bot response will be:", botMessage); // Log the bot's response
        chatbox.innerHTML += `<p><strong>Bot:</strong> ${botMessage}</p>`; // Append bot response to chatbox
    } else {
        console.log("Input is empty."); // Log if input is empty
    }

    document.getElementById("user-input").value = "";
}

async function getGeminiResponse(userMessage) {
    const apiKey = ""; // Replace with your actual Gemini API key
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'; // Actual Gemini API endpoint

    try {
        const response = await fetch(`${url}?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: userMessage }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.contents[0].parts[0].text; // Adjust based on the actual response structure
    } catch (error) {
        console.error('Error fetching Gemini response:', error);
        return 'Sorry, I am unable to process your request at the moment.';
    }
}