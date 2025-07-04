const API_URL = "https://script.google.com/macros/s/AKfycbz_Zt-P9bjo-bMpdhb7PXngS3CtabSjniFDzx_x3BlvOfmx3bhOVeqvq61AxJvJ1l8pHg/exec";

function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const btn = document.querySelector("button");

  btn.classList.add("loading");

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "login",
      email,
      password
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === "success") {
        window.location.href = `dashboard.html?id=${data.id}`;
      } else {
        alert("Email atau password salah, atau akun belum terdaftar.");
        btn.classList.remove("loading");
      }
    })
    .catch(err => {
      alert("Terjadi kesalahan jaringan.");
      btn.classList.remove("loading");
    });
}
