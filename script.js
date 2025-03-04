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
    const apiKey = "Enter your api key"; // Inserted actual Gemini API key here

    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'; 

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
            alert('An error occurred while fetching the response. Please try again.'); // Notify the user

            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Full response data:', data); // Log the entire response data

        let apiResponse = data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0];
        if (apiResponse) {
            return apiResponse.text; // Adjust based on the actual response structure
        } else {
            console.error('Unexpected response structure:', data); // Log unexpected structure
            alert('Unexpected response structure received. Please check the API response.'); 

            return 'Sorry, I am unable to process your request at the moment.';
        }
    } catch (error) {
        console.error('Error fetching Gemini response:', error);
        return 'Sorry, I am unable to process your request at the moment.';
    }
}

window.sendMessage = sendMessage;