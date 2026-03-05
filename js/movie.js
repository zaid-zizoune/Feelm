// ======== إعداد الأسئلة ========
const questions = [
  { question: "What type of movie?", answers: ["Action", "Romance", "Sci-Fi", "Comedy"] },
  { question: "New or Classic?", answers: ["New", "Classic"] },
  { question: "What vibes?", answers: ["Exciting", "Emotional", "Thoughtful", "Dark"] },
  { question: "Preferred length?", answers: ["Short", "Medium", "Long"] },
  { question: "Language?", answers: ["English", "French", "Arabic"] }
];

// ======== المتغيرات ========
let currentQuestion = 0;
const userAnswers = {}; // حفظ الإجابات

// ======== ربط العناصر ========
const questionTitle = document.querySelector(".question_title");
const buttons = document.querySelectorAll(".answer_btn");
const currentEl = document.getElementById("current");
const percentEl = document.getElementById("percent");
const barEl = document.getElementById("bar");
const backBtn = document.querySelector(".back_btn");
const skipBtn = document.querySelector(".skip_btn");

// ======== عرض السؤال ========
function showQuestion() {
  const q = questions[currentQuestion];

  // تحديث نص السؤال
  questionTitle.textContent = q.question;

  // تحديث Progress bar
  const percent = ((currentQuestion + 1) / questions.length) * 100;
  barEl.style.width = percent + "%";        // حركة الشريط
  percentEl.textContent = Math.round(percent) + "%"; // تحديث الرقم
  currentEl.textContent = currentQuestion + 1;

  // تحديث أزرار الإجابة
  buttons.forEach((btn, i) => {
    if (q.answers[i]) {
      btn.style.display = "inline-block";
      btn.textContent = q.answers[i];

      btn.onclick = () => {
        userAnswers[currentQuestion] = q.answers[i]; // حفظ الإجابة
        nextQuestion();
      };
    } else {
      btn.style.display = "none";
    }
  });

  // تعطيل Back إذا في السؤال الأول
  backBtn.disabled = currentQuestion === 0;
}

// ======== التنقل ========
function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
}

function skipQuestion() {
  nextQuestion();
}

// ربط أزرار Back و Skip
backBtn.addEventListener("click", prevQuestion);
skipBtn.addEventListener("click", skipQuestion);

// ======== عرض النتائج ========
function showResult() {
  const container = document.querySelector(".container");
  container.innerHTML = "<h1>Quiz Finished! Your Answers:</h1>";

  const ul = document.createElement("ul");
  questions.forEach((q, i) => {
    const li = document.createElement("li");
    li.textContent = `${q.question} → ${userAnswers[i] ? userAnswers[i] : "Skipped"}`;
    ul.appendChild(li);
  });
  container.appendChild(ul);
}

// ======== بدء Quiz ========
showQuestion();