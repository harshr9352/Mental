function sendMessage() {
    let input = document.getElementById("user-input").value;
    let chatbox = document.getElementById("chatbox");

    if (input.trim() !== "") {
        let userMessage = `<p><strong>You:</strong> ${input}</p>`;
        chatbox.innerHTML += userMessage;

        // Provide a predefined response
        let botMessage = getBotResponse(input);
        chatbox.innerHTML += `<p><strong>Bot:</strong> ${botMessage}</p>`;
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    document.getElementById("user-input").value = "";
}

function getBotResponse(userInput) {
    // Simple predefined responses
    const responses = {
        "hello": "Hi there! How can I assist you today?",
        "how are you": "I'm just a bot, but I'm here to help you!",
        "what is your name": "I'm your friendly AI chatbot.",
        "bye": "Goodbye! Take care!",
        "i need help": "Sure, I'm here to help. What do you need assistance with?",
        "thank you": "You're welcome! If you have any other questions, feel free to ask.",
        "what can you do": "I can provide information and support for mental health. How can I assist you today?",
        "tell me a joke": "Why don't scientists trust atoms? Because they make up everything!",
        "i feel sad": "I'm sorry to hear that. It's important to talk to someone who can help. How can I support you?",
        "i feel anxious": "It's okay to feel anxious sometimes. Try taking deep breaths and focusing on something positive.",
        "what is mental health": "Mental health includes our emotional, psychological, and social well-being. It affects how we think, feel, and act.",
        "how to improve mental health": "Improving mental health can involve regular exercise, healthy eating, getting enough sleep, and talking to a mental health professional.",
        "what is depression": "Depression is a common mental health disorder characterized by persistent sadness and a lack of interest or pleasure in previously rewarding or enjoyable activities.",
        "how to deal with stress": "Dealing with stress can involve relaxation techniques, exercise, talking to someone you trust, and managing your time effectively.",
        "what is anxiety": "Anxiety is a feeling of worry, nervousness, or unease about something with an uncertain outcome. It's a normal response to stress but can become a disorder if it interferes with daily life."
    };

    // Default response if input doesn't match predefined responses
    return responses[userInput.toLowerCase()] || "I'm here to help. Can you please elaborate?";
}

document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});