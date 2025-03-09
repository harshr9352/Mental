let prompt = document.querySelector(".prompt");
let container = document.querySelector(".container");
let chatContainer = document.querySelector(".chat-container");
let btn = document.querySelector(".btn");
let userMessage = null;

//const Api_url=paste here your api url , you can watch it on my video
function createChatBox(html, className) {
  const div = document.createElement("div");
  div.classList.add(className);
  div.innerHTML = html;
  return div;
}

async function getGeminiResponse(userMessage, aiChatBox) {
  const apiKey = "AIzaSyCvP8vjOSP-Ay9b2WJdSL1eNdAhg3yn6DU"

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
    const data = await response.json();
    const apiResponse = data?.candidates[0].content.parts[0].text.trim();
    aiChatBox.querySelector(".text").innerText = apiResponse;
  } catch (error) {
    console.log(error);
  } finally {
    aiChatBox.querySelector(".loading").style.display = "none";
  }
}

function showLoading() {
  const html = `
    <div id="img">
      <img src="ai.png" alt="">
    </div>
    <div class="text"></div>
    <img src="loading.gif" alt="" height="50" class="loading">
  `;
  let aiChatBox = createChatBox(html, "ai-chat-box");
  chatContainer.appendChild(aiChatBox);
  getGeminiResponse(userMessage, aiChatBox);
}

btn.addEventListener("click", () => {
  userMessage = prompt.value;
  if (prompt.value === "") {
    container.style.display = "flex";
  } else {
    container.style.display = "none";
  }
  if (!userMessage) return;
  const html = `
    <div id="img">
      <img src="user.png" alt="">
    </div>
    <div class="text"></div>
  `;
  let userChatBox = createChatBox(html, "user-chat-box");
  userChatBox.querySelector(".text").innerText = userMessage;
  chatContainer.appendChild(userChatBox);
  prompt.value = "";
  setTimeout(showLoading, 500);
});
