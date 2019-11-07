const pics = document.querySelectorAll(".picBox");
const spinButton = document.querySelector(".spinButton");
const gameStatusText = document.querySelector(".gameStatusText");
const acceptBalance = document.querySelector(".acceptBalance");
const addBid = document.querySelector(".addBid");
const yourBid = document.querySelector(".yourBid");
const addBalance = document.querySelector(".addBalance");
let yourBalance = document.querySelector(".yourBalance");
const playAgain = document.querySelector(".playAgain");
let winSum;
let attempt;
let currentBalance = document.querySelector(".currentBalance");
currentBalance.textContent = 5;
const images = ["images/1.png", "images/2.png", "images/3.png", "images/4.png", "images/5.png"];



pics.forEach(function(pic) {
  pic.style.backgroundImage = `url(${images[0]})`;
});

function changeBackgrounImg(picPath, pic) {
  pic.style.backgroundImage = `url(${picPath})`;
}

spinButton.addEventListener("click", () => {

  let pic1, pic2, pic3;
  for (let i = 0; i < pics.length; i++) {
    let picPath = Math.floor(Math.random() * images.length);
    changeBackgrounImg(images[picPath], pics[i]);

    if (i === 0) {
      pic1 = picPath;
    } else if (i === 1) {
      pic2 = picPath;
    } else {
      pic3 = picPath;
    }
  }

  attempt--;
  if (attempt < 0) {
    gameStatusText.textContent = "Attemps are empty";
    currentBalance.textContent = parseInt(currentBalance.innerHTML) - yourBid.innerHTML;
    spinButton.disabled = true;
    spinButton.style.opacity = "0.5";
    yourBid.textContent = "";
    acceptBalance.classList.add("hidden");
    playAgain.classList.remove("hidden");
    addBid.disabled = true;

    playAgain.addEventListener("click", () => {
      gameStatusText.textContent = "Make your bid";
    addBid.disabled = false;

      acceptBalance.classList.remove("hidden");
      playAgain.classList.add("hidden");
      acceptBalance.style.opacity = "1";
      acceptBalance.disabled = false;
    });
  }

  combination(pic1, pic2, pic3);
});

start();

function start() {
  acceptBalance.addEventListener("click", () => {
    let bidText = /^[0-9]{1,2}|[,]{1}[0-9]{1}$/g;
    attempt = 5;

    if (
      addBid.value != 0 &&
      bidText.test(addBid.value) &&
      parseInt(currentBalance.innerHTML) != 0 &&
      parseInt(currentBalance.innerHTML) >= addBid.value
    ) {
     

      spinButton.disabled = false;
      spinButton.style.opacity = "1";
      acceptBalance.style.opacity = "0.5";
      acceptBalance.disabled = true;
      yourBid.textContent = addBid.value;
      addBid.value = "";
    } else { 
        if(addBid.value > parseInt(currentBalance.innerHTML)) {
      if (parseInt(currentBalance.innerHTML) <= 0) {
        gameStatusText.textContent = "Your balance is empty.";
        spinButton.disabled = true;
        spinButton.style.opacity = "0,5";
        acceptBalance.style.opacity = "0,5";
        acceptBalance.disabled = true;
       
      } else if (addBid.value > parseInt(currentBalance.innerHTML)) {
      
        gameStatusText.textContent = "Your bid higer than your balance";
        

      }
    }}
  });
}

function winTerms() {
  if(attempt >= 0){
  gameStatusText.textContent = "You win! your cash: " + winSum;


  currentBalance.textContent = parseInt(+currentBalance.innerHTML) + winSum;
  spinButton.disabled = true;
  spinButton.style.opacity = "0.5";
  yourBid.textContent = "";
  acceptBalance.classList.add("hidden");
  playAgain.classList.remove("hidden");
  addBid.disabled = true;

  }

  playAgain.addEventListener("click", () => {
    addBid.disabled = false;

    acceptBalance.style.opacity = "1";
    acceptBalance.disabled = false;
    acceptBalance.classList.remove("hidden");
    playAgain.classList.add("hidden");
  });
}

function combination(num1, num2, num3) {
  if (num1 === 6 && num2 === 6 && num3 === 6 || num1 === 5 && num2 === 5 && num3 === 5) {
    winSum = yourBid.innerHTML * 5;

    winTerms();
  }else if (num1 === 4 && num2 === 4 && num3 === 4 || num1 === 3 && num2 === 3 && num3 === 3) {
    winSum = yourBid.innerHTML * 4;
    winTerms();
  } else if (num1 === 2 && num2 === 2 && num3 === 2 || num1 === 1 && num2 === 1 && num3 === 1) {
    winSum = yourBid.innerHTML * 3;

    winTerms();
  } else if (num1 === 0 && num3 === 0 && num2 === 0) {
    winSum = yourBid.innerHTML * 2;

    winTerms();
  }
}
