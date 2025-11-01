
document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;

  if (name && email && phone && password) {

    console.log("🚀 Sending register request...");
//add kro link ko render ka
   fetch(`${CONFIG.BACKEND_URL}/register`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, phone, password })
})

    .then(response => response.text())
    .then(data => {
          console.log("✅ Response received:", data);
      alert(`✅ Server says: ${data}`);
      window.location.href = 'login.html'; 
    })
    .catch(error => {
      console.error('❌ Error:', error);
      alert('Something went wrong!');
    });
    
  
  } else {
    alert("❌ Please fill all fields!");
  }
});

