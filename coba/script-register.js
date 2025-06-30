const API_URL = "https://script.google.com/macros/s/AKfycbwd0CVbkpKB59Ph_K1FVY8-nlQj1a6-s-UN0bSOR_D33QS2lqjwqkt8PLmcTJiVfBS6pA/exec";

function register() {
    const nama = document.getElementById("reg-nama").value;
    const email = document.getElementById("reg-email").value;
    const pondok = document.getElementById("reg-pondok").value;
    const password = document.getElementById("reg-password").value;
    const btn = document.querySelector("button");
  
    btn.classList.add("loading");
  
    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "register",
        nama,
        email,
        pondok,
        password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === "exists") {
          alert("Email sudah terdaftar!");
          btn.classList.remove("loading");
        } else if (data.status === "success") {
          alert("Registrasi berhasil!");
          window.location.href = `dashboard.html?id=${data.id}`;
        } else {
          alert("Gagal registrasi.");
          btn.classList.remove("loading");
        }
      })
      .catch(() => {
        alert("Terjadi kesalahan jaringan.");
        btn.classList.remove("loading");
      });
  }
  