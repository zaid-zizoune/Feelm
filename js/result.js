const answers = JSON.parse(localStorage.getItem("answers"));

let filteredMovies = [];
let currentIndex = 0;

// جلب البيانات
fetch("data/movies.json")
  .then(res => res.json())
  .then(movies => {

    // ✅ فلترة صحيحة
    filteredMovies = movies.filter(movie =>
      movie.genre.includes(answers[0]) &&
      movie.theme === answers[1]
    );

    if (filteredMovies.length === 0) {
      document.querySelector(".ruselt").innerHTML = "<h2>No movie found 😢</h2>";
      return;
    }

    showRandomMovie();
  });


// ===== عرض الفيلم =====
function displayMovie(movie) {
  const posterImg = document.querySelector(".ruselt .poster img");
  const titleEl = document.querySelector(".ruselt .info h2");
  const genreEl = document.querySelector(".ruselt .info span");
  const calendarEl = document.querySelector(".ruselt .time span:nth-child(1)");
  const clockEl = document.querySelector(".ruselt .time span:nth-child(2)");
  const descEl = document.querySelector(".ruselt .info p");
  const linkEl = document.querySelector(".ruselt .info a");

  posterImg.src = movie.poster;
  posterImg.alt = movie.title;

  // fallback image 🔥
  posterImg.onerror = () => {
    posterImg.src = "img/default.jpg";
  };

  titleEl.textContent = movie.title;
  genreEl.textContent = `${movie.genre} | ${movie.theme}`;
  calendarEl.innerHTML = `<i class="fa-regular fa-calendar"></i> ${movie.year}`;
  clockEl.innerHTML = `<i class="fa-regular fa-clock"></i> ${movie.duration}`;
  descEl.textContent = movie.description;
  linkEl.href = movie.watchLink;
}


// ===== اختيار فيلم عشوائي بدون تكرار =====
function showRandomMovie() {
  let newIndex;

  do {
    newIndex = Math.floor(Math.random() * filteredMovies.length);
  } while (newIndex === currentIndex && filteredMovies.length > 1);

  currentIndex = newIndex;
  displayMovie(filteredMovies[currentIndex]);
}


// ===== الأزرار =====
document.querySelector(".rotate").addEventListener("click", showRandomMovie);
document.querySelector(".but button").addEventListener("click", showRandomMovie);