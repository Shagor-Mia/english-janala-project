console.log("connected");

const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

const loadLevelWord = (id) => {
  fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then((res) => res.json())
    .then((json) => displayLevelWord(json.data));
};
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
            >
              <i class="fa-solid fa-circle-info"></i>
            </button>
            <button
              class="btn hover:bg-slate-200 bg-[#1A91FF10] cursor-pointer border-none"
            >
              <i class="fa-solid fa-volume-high"></i>
            </button>
          </div>
        </div>
    `;
    wordContainer.append(card);
  });
};

const displayLesson = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  for (let lesson of lessons) {
    // console.log(lesson);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
               <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary" href=""><span><i class="fa-solid fa-book-open"></i></span>Lesson-${lesson.level_no}</button>
    `;
    levelContainer.appendChild(btnDiv);
  }
};

loadLesson();
