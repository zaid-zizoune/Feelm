// ======== Themes حسب نوع الفيلم ========
const themesByGenre = {
  Action: ["War", "Military", "Spy", "Superhero", "Martial Arts", "Revenge"],
  Thriller: ["Crime", "Mystery", "Psychological", "Political", "Survival", "Conspiracy"],
  Drama: ["Romance", "Family", "Friendship", "Life Struggles", "Sport", "Biography"],
  Comedy: ["Romantic Comedy", "Teen Comedy", "Dark Comedy", "Buddy Comedy", "Satire", "Parody"],
  Horror: ["Supernatural", "Psychological Horror", "Slasher", "Zombie", "Demon Possession", "Monster"],
  Sci_Fi: ["Space", "Aliens", "Artificial Intelligence", "Time Travel", "Dystopia", "Cyberpunk"]
};

// ======== إعداد الأسئلة ========
const questions = [
  { question: "What type of movie would you like to watch?", answers: ["Action","Thriller","Drama","Comedy","Horror","Sci_Fi"] },
  { question: "Choose a theme you like?", answers: [] },
  { question: "How long would you like the movie to be?", answers: ["60-90 min", "1.5 to 2 hours","2 to 3 hours","3+ hours","Any..."] },
  { question: "Which time period do you prefer the movie to be set in?", answers: ["Modern","Present","Future","Past","Ancient","Any..."] },
  { question: "Choose your preferred movie language?", answers: ["English","French","Any..."] },
  { question: "Choose your preferred streaming platform?", answers: ["Netflix","HBO Max","Amazon Prime","Disney+","Apple TV+","Any..."] }
];

// ======== المتغيرات ========
let currentQuestion = 0;
let progress = 0;
const userAnswers = {};

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
  questionTitle.textContent = q.question;

  // تحديث Progress Bar
  barEl.style.width = progress + "%";
  percentEl.textContent = progress + "%";
  currentEl.textContent = currentQuestion + 1;

  // عرض الأجوبة
  buttons.forEach((btn, i) => {
    if(q.answers[i]){
      btn.style.display = "inline-block";
      btn.textContent = q.answers[i];
      btn.onclick = () => {
        userAnswers[currentQuestion] = q.answers[i];
        progress += 17; // زيادة Progress تدريجي
        if(progress > 100) progress = 100;
        nextQuestion();
      };
    } else {
      btn.style.display = "none";
    }
  });

  backBtn.disabled = currentQuestion === 0;
}

// ======== السؤال التالي ========
function nextQuestion() {
  if(currentQuestion === 0){
    const selectedGenre = userAnswers[0];
    if(themesByGenre[selectedGenre]){
      questions[1].answers = themesByGenre[selectedGenre];
    }
  }

  currentQuestion++;

  // إذا وصلنا للسؤال الأخير + تجاوزه
  if(currentQuestion >= questions.length){
    // حفظ الإجابات
    localStorage.setItem("answers", JSON.stringify(userAnswers));

    // الانتقال مباشرة لصفحة النتائج
    window.location.href = "result.html";
    return;
  }

  showQuestion();
}

// ======== السؤال السابق ========
function prevQuestion(){
  if(currentQuestion > 0){
    currentQuestion--;
    progress -= 17;
    if(progress < 0) progress = 0;
    showQuestion();
  }
}

// ======== تخطي السؤال ========
function skipQuestion(){
  // حفظ إجابة "Skipped"
  userAnswers[currentQuestion] = "Skipped";
  progress += 17;
  if(progress > 100) progress = 100;
  nextQuestion();
}

// ======== ربط الأزرار ========
backBtn.addEventListener("click", prevQuestion);
skipBtn.addEventListener("click", skipQuestion);

// ======== بدء Quiz ========
showQuestion();