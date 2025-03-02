async function sendMessage() {
    console.log("sendMessage function called"); // Log when the function is called

    let input = document.getElementById("user-input").value;
    let chatbox = document.getElementById("chatbox");

    if (input && input.trim() !== "") {
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
    const apiKey = "AIzaSyCwP8vjOSP-Ay9b2WJdSL1eNdAhg3yn6DU"; // Inserted actual Gemini API key here

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
            const errorResponse = await response.json();
        console.error('Error response:', errorResponse); // Log the entire response for debugging
        console.error('Response status:', response.status); // Log the response status for additional context

            alert('An error occurred while fetching the response. Please try again.'); // Notify the user

            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        if (data.contents && data.contents[0] && data.contents[0].parts[0]) {
            return data.contents[0].parts[0].text; // Adjust based on the actual response structure
        } else {
            console.error('Unexpected response structure:', data); // Log unexpected structure
            alert('Unexpected response structure received. Please check the API response.'); // Notify the user

            return 'Sorry, I am unable to process your request at the moment.';
        }
    } catch (error) {
        console.error('Error fetching Gemini response:', error);
        alert('An error occurred while fetching the response. Please check the console for more details.'); // Notify the user

        return 'Sorry, I am unable to process your request at the moment.';
    }
}

// Make the sendMessage function globally accessible
window.sendMessage = sendMessage;
