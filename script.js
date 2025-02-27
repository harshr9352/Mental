function sendMessage() {
    let input = document.getElementById("user-input").value;
    let chatbox = document.getElementById("chatbox");

    if (input.trim() !== "") {
        let userMessage = `<p><strong>You:</strong> ${input}</p>`;
        chatbox.innerHTML += userMessage;
        
        setTimeout(() => {
            let botMessage = `<p><strong>Bot:</strong> I'm here to help. How are you feeling today?</p>`;
            chatbox.innerHTML += botMessage;
            chatbox.scrollTop = chatbox.scrollHeight;
        }, 1000);
    }

    document.getElementById("user-input").value = "";
}
