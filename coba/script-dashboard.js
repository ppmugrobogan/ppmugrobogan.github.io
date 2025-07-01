const API_URL = 'https://script.google.com/macros/s/AKfycbwd0CVbkpKB59Ph_K1FVY8-nlQj1a6-s-UN0bSOR_D33QS2lqjwqkt8PLmcTJiVfBS6pA/exec';

window.onload = () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    alert("Silakan login terlebih dahulu.");
    window.location.href = "login.html";
    return;
  }

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "getUser",
      id: id
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === "found") {
        document.getElementById("nama-user").innerText = data.nama;
        document.getElementById("pondok-user").innerText = data.pondok;
        document.getElementById("avatar").innerText = data.nama.charAt(0).toUpperCase();
      } else {
        alert("ID tidak ditemukan. Silakan login ulang.");
        window.location.href = "login.html";
      }
    })
    .catch(err => {
      console.error("Gagal ambil data:", err);
      alert("Terjadi kesalahan. Silakan coba lagi.");
      window.location.href = "login.html";
    });
};

// Navigasi ke halaman lain dengan tetap membawa id
function goTo(page) {
  const userId = new URLSearchParams(window.location.search).get("id");
  if (!userId) {
    alert("ID user tidak ditemukan!");
    window.location.href = "login.html";
    return;
  }

  // Redirect ke halaman sesuai parameter 'page'
  window.location.href = `${page}.html?id=${userId}`;
}


// Logout
function logout() {
  window.location.href = "login.html";
}

  const params = new URLSearchParams(window.location.search);
  const userId = params.get("id");
