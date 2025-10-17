
let userCoins = 1600; // User coins (dynamic)
const requiredCoins = 1500;

const coinCount = document.getElementById('coinCount');
const coinProgress = document.getElementById('coinProgress');
const currentCoins = document.getElementById('currentCoins');
const redeemBtn = document.getElementById('redeemBtn');
const upiInput = document.getElementById('upiInput');

const modal = document.getElementById('redeemModal');
const modalIcon = document.getElementById('modalIcon');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const closeModal = document.getElementById('closeModal');
const modalConfetti = document.getElementById('modalConfetti');

// Initialize
coinCount.textContent = userCoins;
currentCoins.textContent = userCoins;
coinProgress.style.width = Math.min((userCoins/requiredCoins)*100,100)+'%';

// Redeem Button Click
redeemBtn.addEventListener('click', () => {
  if(!upiInput.value.trim()) {
    alert("Please enter UPI ID!");
    return;
  }

  if(userCoins >= requiredCoins) {
    // Deduct coins
    userCoins -= requiredCoins;
    coinCount.textContent = userCoins;
    currentCoins.textContent = userCoins;
    coinProgress.style.width = Math.min((userCoins/requiredCoins)*100,100)+'%';

    // Show success modal
    modalIcon.className = 'ri-checkbox-circle-line text-6xl text-green-500 mb-4';
    modalTitle.textContent = 'Success!';
    modalMessage.textContent = `You have successfully redeemed ${requiredCoins} coins for ₹100. \n We're Redirecting to you !\nDon't press Back Button Or Close this`;
    modal.classList.remove('hidden');

    // Confetti
    for(let i=0;i<50;i++){
      let confetti = document.createElement('div');
      confetti.className='confetti';
      confetti.style.left=Math.random()*100+'%';
      confetti.style.backgroundColor=['#FFD700','#FF4500','#00BFFF','#32CD32'][Math.floor(Math.random()*4)];
      confetti.style.animationDuration=(Math.random()*1+0.5)+'s';
      modalConfetti.appendChild(confetti);
      setTimeout(()=>{confetti.remove()},1500);
    }

    // Redirect to payment page
    setTimeout(()=>{ window.location.href='profile.html'; },6000);
  } else {
    modalIcon.className='ri-close-circle-line text-6xl text-red-500 mb-4';
    modalTitle.textContent='Insufficient Coins';
    modalMessage.textContent=`You need at least ${requiredCoins} coins to redeem.`;
    modal.classList.remove('hidden');
  }
});

closeModal.addEventListener('click',()=>{ modal.classList.add('hidden'); });