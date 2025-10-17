
for (let i = 0; i < 30; i++) {
  const particle = document.createElement('div');
  particle.classList.add('particle');
  const size = Math.random() * 6 + 4;
  particle.style.width = size + 'px';
  particle.style.height = size + 'px';
  particle.style.left = Math.random() * 100 + 'vw';
  particle.style.animationDuration = 6 + Math.random() * 8 + 's';
  particle.style.animationDelay = Math.random() * 5 + 's';
  particle.style.background = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 255, 0.5)`;
  document.body.appendChild(particle);
}


const toggleLoginType = document.getElementById("toggleLoginType");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");

toggleLoginType.addEventListener("click", () => {
  if (phoneInput.style.display === "none") {
    emailInput.style.display = "none";
    phoneInput.style.display = "block";
    toggleLoginType.textContent = "Login with Email instead";
  } else {
    emailInput.style.display = "block";
    phoneInput.style.display = "none";
    toggleLoginType.textContent = "Login with Phone instead";
  }
});

// document.getElementById("loginForm").addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const usingPhone = phoneInput.style.display === "block";
//   const identifier = usingPhone ? phoneInput.value.trim() : emailInput.value.trim();
//   const password = document.getElementById("password").value;

//   console.log('Sending login:', { identifier, password: password ? '***' : '' });

//   if (!identifier || !password) {
//     alert("❌ Please fill all fields!");
//     return;
//   }

//   try {
//     const res = await fetch('http://localhost:3000/login', { // relative path chalega because server serves static files
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ identifier, password })
//     });

    
//     const text = await res.text();
//     // try parse JSON
//     let data;
//     try {
//       data = JSON.parse(text);
//     } catch (parseErr) {
//       console.error('❌ Server returned non-JSON:', text);
//       alert('❌ Server did not return valid JSON. See console.');
//       return;
//     }

//     console.log('Server response:', res.status, data);
//     alert(data.message);

//     if (res.ok) {
//       window.location.href = '/index.html'; 
//     }
//   } catch (err) {
//     console.error('❌ Login error (fetch):', err);
//     alert('❌ Something went wrong! Make sure server is running and you opened the app via http://localhost:3000');
//   }
// });
// //////


// document.getElementById('loginForm').addEventListener('submit', async (e) => {
//   e.preventDefault();

//   const identifier = document.getElementById('identifier').value;
//   const password = document.getElementById('password').value;

//   try {
//     const res = await fetch('http://localhost:5000/api/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ identifier, password })
//     });

//     const data = await res.json();

//     if (res.ok) {
//       // Save user info locally (optional)
//       localStorage.setItem('user', JSON.stringify(data));

//       // Show profile card
//       document.getElementById('profile').classList.remove('hidden');
//       document.getElementById('userName').textContent = data.name;
//       document.getElementById('userEmail').textContent = data.email;
//       document.getElementById('userPhone').textContent = data.phone;
//     } else {
//       alert(data.message);
//     }
//   } catch (err) {
//     console.error(err);
//     alert('Server error');
//   }
// });





document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const usingPhone = phoneInput.style.display === "block";
  const identifier = usingPhone ? phoneInput.value.trim() : emailInput.value.trim();
  const password = document.getElementById("password").value;

  if (!identifier || !password) {
    alert("❌ Please fill all fields!");
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // Save full user info
      localStorage.setItem("userData", JSON.stringify(data));

      // Redirect to homepage
      window.location.href = "/index.html";
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
    alert("❌ Server error");
  }
});
