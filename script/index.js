console.log("connected");

// spinner Loading
const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

//load vocabularies lesson
const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

const removeActive = () => {
  const lessonButton = document.querySelectorAll(".lesson-btn");
  lessonButton.forEach((btn) => btn.classList.remove("active"));
};

//load word
const loadLevelWord = (id) => {
  manageSpinner(true);
  fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then((res) => res.json())
    .then((json) => {
      removeActive();
      const clickedBtn = document.getElementById(`lesson-btn-${id}`);
      clickedBtn.classList.add("active");
      displayLevelWord(json.data);
    });
};
//load word details
const loadWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};

// modal synonyms
const createSynonyms = (arr) => {
  const newHtmlElement = arr.map((arr) => `<span class="btn">${arr}</span>`);
  return newHtmlElement.join(" ");
};
// display word details modal
const displayWordDetails = (details) => {
  console.log(details);
  const detailsContainer = document.getElementById("modal-container");
  detailsContainer.innerHTML = `<div class="">
              <h2 class="text-2xl font-bold">
${details.word}(<span><i class="fa-solid fa-microphone-lines"></i></span
                >:${details.pronunciation})
              </h2>
            </div>
            <div class="">
              <h2 class="font-bold">Meaning</h2>
              <p>${details.meaning}</p>
            </div>
            <div class="">
              <h2 class="font-bold">Example</h2>
              <p>${details.sentence}</p>
            </div>
            <div class="">
              <h2 class="font-bold">সমার্থক শব্দ গুলো</h2>
              <div class="">${createSynonyms(details.synonyms)}</div>
            </div>`;
  document.getElementById("word_modal").showModal();
};
// voice
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}
//display word
const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if (words.length === 0) {
    wordContainer.innerHTML = `
    <div class="text-center col-span-full space-y-2 bangla-font">
    <img class="mx-auto" src="./assets/alert-error.png" alt="">
          <p class="text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
          <h2 class="text-3xl font-bold">নেক্সট Lesson এ যান</h2>
        </div>
    `;
    manageSpinner(false);
    return;
  }
  words.forEach((eachWord) => {
    console.log(eachWord);
    const card = document.createElement("div");
    card.innerHTML = `
    <div
          class="bg-white rounded-xl shadow-sm text-center py-10 px-8 space-y-4 h-[100%]"
        >
          <h2 class="font-semibold text-2xl">${
            eachWord.word ? eachWord.word : "শব্দটি পাওয়া যায়নি"
          }</h2>
          <p>Meaning/ Pronounciation</p>
          <h2 class="bangla-font font-semibold text-2xl">"${
            eachWord.meaning ? eachWord.meaning : "অর্থ পাওয়া যায়নি"
          }"/ '${
      eachWord.pronunciation
        ? eachWord.pronunciation
        : "pronunciation পাওয়া যায়নি"
    }'</h2>
          <div class="flex justify-between mt-10">
            <button
              class="btn hover:bg-slate-200 bg-[#1A91FF10] cursor-pointer border-none"
              onclick="loadWordDetails(${eachWord.id})"
            >
              <i class="fa-solid fa-circle-info"></i>
            </button>
            <button
            onclick="pronounceWord('${eachWord.word}')"
              class="btn hover:bg-slate-200 bg-[#1A91FF10] cursor-pointer border-none"
            >
              <i class="fa-solid fa-volume-high"></i>
            </button>
          </div>
        </div>
    `;
    wordContainer.append(card);
  });
  manageSpinner(false);
};
//display vocabularies lesson
const displayLesson = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  for (let lesson of lessons) {
    // console.log(lesson);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
               <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn" href=""><span><i class="fa-solid fa-book-open"></i></span>Lesson-${lesson.level_no}</button>
    `;
    levelContainer.appendChild(btnDiv);
  }
};

// search
document.getElementById("btn-search").addEventListener("click", () => {
  removeActive();
  const input = document.getElementById("input-search");
  const searchWord = input.value.trim().toLowerCase();
  console.log(searchWord);
  fetch(`https://openapi.programming-hero.com/api/words/all`)
    .then((res) => res.json())
    .then((json) => {
      console.log(json.data);
      const allWords = json.data;
      const filterWord = allWords.filter((words) =>
        words.word.toLowerCase().includes(searchWord)
      );
      displayLevelWord(filterWord);
    });
});

loadLesson();
