
// for (let i = 0; i < 30; i++) {
//   const particle = document.createElement('div');
//   particle.classList.add('particle');
//   const size = Math.random() * 6 + 4;
//   particle.style.width = size + 'px';
//   particle.style.height = size + 'px';
//   particle.style.left = Math.random() * 100 + 'vw';
//   particle.style.animationDuration = 6 + Math.random() * 8 + 's';
//   particle.style.animationDelay = Math.random() * 5 + 's';
//   particle.style.background = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 255, 0.5)`;
//   document.body.appendChild(particle);
// }




document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;

  if (name && email && phone && password) {

    console.log("🚀 Sending register request...");

   fetch('http://localhost:3000/register', {
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

