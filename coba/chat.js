const USER_API = 'https://script.google.com/macros/s/AKfycbwd0CVbkpKB59Ph_K1FVY8-nlQj1a6-s-UN0bSOR_D33QS2lqjwqkt8PLmcTJiVfBS6pA/exec';
const CHAT_API = 'https://script.google.com/macros/s/AKfycbzOT9o2iW7Y3xLHmh9jXpTJswUq0H3uh9K28GPwkg1ev-6jYwlmBKDO_xOdh24qPdz02A/exec';

let currentId = null;
let currentUser = null;
let replyTo = null;

window.onload = () => {
  const params = new URLSearchParams(window.location.search);
  currentId = params.get("id");
  if (!currentId) return location.href = "login.html";

  fetch(USER_API, {
    method: "POST",
    body: JSON.stringify({ action: "getUser", id: currentId })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === "found") {
        currentUser = data.nama;
        document.getElementById("nama-user").innerText = data.nama;
        document.getElementById("pondok-user").innerText = data.pondok;
        document.getElementById("avatar").innerText = data.nama.charAt(0).toUpperCase();
        loadMessages();
      } else {
        alert("ID tidak ditemukan."); location.href = "login.html";
      }
    });
};

function disableEnter(e) {
  if (e.key === "Enter") e.preventDefault();
}

function sendMessage() {
  const input = document.getElementById("chat-input");
  const text = input.value.trim();
  if (text === "") return;

  const message = {
    action: "sendMessage",
    id_user: currentId,
    nama_user: currentUser,
    pesan: text,
    balas: replyTo ? replyTo.pesan : ""
  };

  fetch(CHAT_API, {
    method: "POST",
    body: JSON.stringify(message)
  })
    .then(res => res.json())
    .then(() => {
      input.value = "";
      cancelReply();
      loadMessages();
    });
    document.getElementById("chat-input").style.height = "36px"; // reset tinggi textarea
}

function loadMessages() {
  fetch(CHAT_API + "?action=getMessages")
    .then(res => res.json())
    .then(data => {
      const box = document.getElementById("chat-box");
      box.innerHTML = "";

      data.forEach(msg => {
        const msgDiv = document.createElement("div");
        msgDiv.classList.add("chat-message");
        msgDiv.classList.add(msg.id_user === currentId ? "chat-right" : "chat-left");
        msgDiv.onclick = () => setReply(msg);

        if (msg.balas) {
          const replyDiv = document.createElement("div");
          replyDiv.classList.add("chat-reply-box");
          replyDiv.innerText = `Membalas: "${msg.balas}"`;
          msgDiv.appendChild(replyDiv);
        }        

        const textDiv = document.createElement("div");
        textDiv.innerText = msg.pesan;
        msgDiv.appendChild(textDiv);

        const meta = document.createElement("div");
        meta.classList.add("chat-meta");
        meta.innerText = `${msg.nama_user} • ${msg.timestamp}`;
        msgDiv.appendChild(meta);

        box.appendChild(msgDiv);
      });

      box.scrollTop = box.scrollHeight;
    });
}

function setReply(msg) {
  replyTo = msg;
  document.getElementById("reply-text").innerText = `Membalas: "${msg.pesan}"`;
  document.getElementById("reply-preview").style.display = "flex";
}

function cancelReply() {
  replyTo = null;
  document.getElementById("reply-preview").style.display = "none";
}
function autoResize(textarea) {
  textarea.style.height = 'auto'; // reset dulu
  const minHeight = 36; // tinggi minimal
  textarea.style.height = Math.max(minHeight, textarea.scrollHeight) + 'px';
}
