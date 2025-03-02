/*
Run this model in Javascript

> npm install @azure-rest/ai-inference @azure/core-auth @azure/core-sse
*/
const predefinedResponses = {
    "hi": "Hello! How can I assist you today?",
    "hello": "Hi there! What would you like to know?",
    "bye": "Goodbye! Take care!",
    "what is mental health?": "Mental health refers to our emotional, psychological, and social well-being.",
    "how can I manage stress?": "Consider practicing mindfulness, exercise, and talking to someone you trust.",
    "what are the signs of anxiety?": "Common signs include excessive worry, restlessness, and difficulty concentrating.",
    "how can I improve my mood?": "Engaging in activities you enjoy and connecting with friends can help.",
    "what is depression?": "Depression is a mood disorder that causes persistent feelings of sadness and loss of interest.",
    "how can I seek help?": "It's important to talk to a mental health professional or a trusted person in your life.",
    "what are coping strategies?": "Coping strategies include deep breathing, journaling, and seeking support.",
    "how does exercise affect mental health?": "Regular exercise can reduce anxiety and improve mood.",
    "what is mindfulness?": "Mindfulness is the practice of being present and fully engaged in the moment.",
    "how can I build resilience?": "Building resilience involves developing a positive mindset and strong support systems.",
    "what is self-care?": "Self-care includes activities that promote physical, mental, and emotional well-being.",
    "how can I deal with negative thoughts?": "Challenge negative thoughts by focusing on positive aspects and practicing gratitude.",
    "what is therapy?": "Therapy is a treatment for mental health issues that involves talking to a trained professional.",
    "how can I support a friend in need?": "Listen without judgment and encourage them to seek professional help.",
    "what are the benefits of talking about feelings?": "Talking about feelings can help process emotions and reduce stress.",
    "how can I practice gratitude?": "Consider keeping a gratitude journal to reflect on positive experiences.",
    "what is a mental health day?": "A mental health day is a day taken off to focus on mental well-being.",
    "how can I improve my sleep?": "Establishing a bedtime routine and reducing screen time can help improve sleep quality.",
    "what is the importance of social connections?": "Social connections can provide support and reduce feelings of loneliness.",
    "how can I find a therapist?": "You can search online directories or ask for recommendations from trusted sources."
};

async function sendMessage() {
    console.log("sendMessage function called"); // Log when the function is called

    let input = document.getElementById("user-input").value;
    let chatbox = document.getElementById("chatbox");

    if (input.trim() !== "") {
        let userMessage = `<p><strong>You:</strong> ${input}</p>`;
        chatbox.innerHTML += userMessage;

        console.log("Sending message:", input); // Log the message being sent

        // Check for predefined responses and handle case insensitivity
        const botMessage = predefinedResponses[input.toLowerCase()] || predefinedResponses["hi"]; // Default to greeting if unrecognized
        console.log("Bot response will be:", botMessage); // Log the bot's response
        chatbox.innerHTML += `<p><strong>Bot:</strong> ${botMessage}</p>`; // Append bot response to chatbox
    } else {
        console.log("Input is empty."); // Log if input is empty
    }

    document.getElementById("user-input").value = "";
}
