/*
Run this model in Javascript

> npm install @azure-rest/ai-inference @azure/core-auth @azure/core-sse
*/
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

const token = process.env["GITHUB_TOKEN"];

async function sendMessage() {
    let input = document.getElementById("user-input").value;
    let chatbox = document.getElementById("chatbox");

    if (input.trim() !== "") {
        let userMessage = `<p><strong>You:</strong> ${input}</p>`;
        chatbox.innerHTML += userMessage;

        console.log("Sending message:", input); // Log the message being sent

        // Await the bot response
        let botMessage = await getBotResponse(input);
        chatbox.innerHTML += `<p><strong>Bot:</strong> ${botMessage}</p>`;
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    document.getElementById("user-input").value = "";
}

async function getBotResponse(userInput) {
    const client = ModelClient(
        "https://models.github.ai/inference",
        new AzureKeyCredential(token)
    );

    console.log("Requesting response from DeepSeek API..."); // Log API request

    const response = await client.path("/chat/completions").post({
        body: {
            messages: [
                { role: "user", content: userInput }
            ],
            model: "DeepSeek-R1",
            max_tokens: 2048,
        }
    });

    if (isUnexpected(response)) {
        console.error("Unexpected response:", response.body.error); // Log unexpected response
        throw response.body.error;
    }
    return response.body.choices[0].message.content; // Return the response from DeepSeek
}

document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

// Add event listener for the send button
document.getElementById("send-button").addEventListener("click", function() {
    sendMessage();
});
