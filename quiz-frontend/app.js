console.log("Frontend JS loaded");

/* =======================
   STATE
======================= */

let questions = [];
let currentIndex = 0;
let userAnswers = [];
let username = localStorage.getItem("quizUser");

let timerInterval = null;
let timeLeft = 0;
const TIME_PER_QUESTION = 15; // seconds (ONLY configurable place)

/* =======================
   DOM ELEMENTS
======================= */

const overlay = document.getElementById("overlay");
const nameInput = document.getElementById("usernameInput");
const startBtn = document.getElementById("startQuiz");

const quizContainer = document.getElementById("quizContainer");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const timerEl = document.getElementById("timer");

/* =======================
   QUIZ LOCK / UNLOCK
======================= */

function lockQuiz() {
  quizContainer.style.pointerEvents = "none";
  quizContainer.style.opacity = "0.4";
}

function unlockQuiz() {
  quizContainer.style.pointerEvents = "auto";
  quizContainer.style.opacity = "1";
}

/* =======================
   NAME HANDLING
======================= */

if (!username) {
  overlay.style.display = "flex";
  lockQuiz();
} else {
  overlay.style.display = "none";
  unlockQuiz();
  startQuizFlow();
}

startBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();

  if (!name) {
    alert("Please enter your name");
    return;
  }

  localStorage.setItem("quizUser", name);
  username = name;

  overlay.style.display = "none";
  unlockQuiz();

  startQuizFlow();
});

/* =======================
   QUIZ FLOW START
======================= */

async function startQuizFlow() {
  try {
    const res = await fetch("http://localhost:5000/api/questions");
    if (!res.ok) throw new Error("Failed to fetch questions");

    questions = await res.json();

    if (!questions.length) {
      questionEl.textContent = "No questions available.";
      nextBtn.disabled = true;
      return;
    }

    userAnswers = new Array(questions.length).fill(null);
    currentIndex = 0;

    renderQuestion();
    startTimer();

  } catch (err) {
    console.error(err);
    questionEl.textContent = "Error loading quiz.";
  }
}

/* =======================
   TIMER (NO HARD CODING)
======================= */

function startTimer() {
  clearInterval(timerInterval);
  timeLeft = TIME_PER_QUESTION;
  updateTimerUI();

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerUI();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      autoMoveNext();
    }
  }, 1000);
}

function updateTimerUI() {
  timerEl.textContent = `⏱ Time Left: ${timeLeft}s`;
}

/* =======================
   RENDER QUESTION
======================= */

function renderQuestion() {
  const currentQ = questions[currentIndex];

  questionEl.textContent = `Q${currentIndex + 1}. ${currentQ.question}`;
  optionsEl.innerHTML = "";

  currentQ.options.forEach(option => {
    const label = document.createElement("label");
    label.className = "option";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "option";
    input.value = option;

    if (userAnswers[currentIndex] === option) {
      input.checked = true;
    }

    label.appendChild(input);
    label.appendChild(document.createTextNode(" " + option));
    optionsEl.appendChild(label);
  });

  nextBtn.textContent =
    currentIndex === questions.length - 1 ? "Submit" : "Next";

  startTimer();
}

/* =======================
   NEXT / AUTO NEXT
======================= */

nextBtn.addEventListener("click", manualNext);

function manualNext() {
  const selected = document.querySelector('input[name="option"]:checked');

  if (!selected) {
    alert("Select an option");
    return;
  }

  userAnswers[currentIndex] = selected.value;
  moveForward();
}

function autoMoveNext() {
  userAnswers[currentIndex] = userAnswers[currentIndex] ?? null;
  moveForward();
}

function moveForward() {
  clearInterval(timerInterval);

  if (currentIndex < questions.length - 1) {
    currentIndex++;
    renderQuestion();
  } else {
    submitScore();
  }
}

/* =======================
   SCORE LOGIC
======================= */

function calculateScore() {
  let score = 0;

  questions.forEach((q, i) => {
    if (userAnswers[i] === q.answer) score++;
  });

  return score;
}

/* =======================
   SUBMIT SCORE
======================= */

async function submitScore() {
  clearInterval(timerInterval);
  const finalScore = calculateScore();

  try {
    await fetch("http://localhost:5000/api/users/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: username,
        score: finalScore,
        totalQuestions: questions.length
      })
    });

    let resultHTML = `
      <h2>Quiz Completed 🎉</h2>
      <p><strong>Name:</strong> ${username}</p>
      <p><strong>Score:</strong> ${finalScore} / ${questions.length}</p>
      <hr/>
    `;

    questions.forEach((q, i) => {
      const userAns = userAnswers[i];
      const isCorrect = userAns === q.answer;

      resultHTML += `
        <div style="margin-bottom:15px;">
          <p><strong>Q${i + 1}:</strong> ${q.question}</p>
          <p>
            Your Answer: 
            <span style="color:${isCorrect ? "green" : "red"}">
              ${userAns ?? "Not answered"}
            </span>
          </p>
          ${
            !isCorrect
              ? `<p>Correct Answer: <strong>${q.answer}</strong></p>`
              : ""
          }
        </div>
        <hr/>
      `;
    });

    quizContainer.innerHTML = resultHTML;

  } catch (err) {
    console.error(err);
    alert("Failed to save score");
  }
}

