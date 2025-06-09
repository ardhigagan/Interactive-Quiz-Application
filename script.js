let questions = [];
let currentQuestion = 0;
let score = 0;

async function loadQuestions() {
  const response = await fetch('questions.json');
  questions = await response.json();
  showQuestion();
}

function startQuiz() {
  document.getElementById('startScreen').classList.add('hidden');
  document.getElementById('quizScreen').classList.remove('hidden');
  loadQuestions();
}

function showQuestion() {
  const q = questions[currentQuestion];
  document.getElementById('questionNumber').innerText = `Question ${currentQuestion + 1} of ${questions.length}`;
  document.getElementById('questionText').innerText = q.question;

  const optionsList = document.getElementById('optionsList');
  optionsList.innerHTML = "";

  q.options.forEach(option => {
    const li = document.createElement('li');
    li.innerText = option;
    li.onclick = () => selectOption(li, q.correct);
    optionsList.appendChild(li);
  });
}

function selectOption(selected, correctAnswer) {
  const options = document.querySelectorAll("#optionsList li");
  options.forEach(option => {
    option.style.pointerEvents = "none";
    if (option.innerText === correctAnswer) {
      option.classList.add("correct");
    } else if (option === selected) {
      option.classList.add("wrong");
    }
  });

  if (selected.innerText === correctAnswer) {
    score++;
  }
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById('quizScreen').classList.add('hidden');
  document.getElementById('resultScreen').classList.remove('hidden');
  document.getElementById('scoreText').innerText = `You scored ${score} out of ${questions.length}`;
}

// Light/Dark Mode Toggle
document.addEventListener("DOMContentLoaded", () => {
  const switcher = document.getElementById("modeSwitcher");
  const current = localStorage.getItem("theme") || "light";

  if (current === "dark") {
    document.body.classList.add("dark-mode");
    switcher.textContent = "☀️ Light Mode";
  } else {
    switcher.textContent = "🌙 Dark Mode";
  }

  switcher.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const mode = document.body.classList.contains("dark-mode") ? "dark" : "light";
    switcher.textContent = mode === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
    localStorage.setItem("theme", mode);
  });
});

