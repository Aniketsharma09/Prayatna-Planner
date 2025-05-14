let elems = document.querySelectorAll(".elem");
let fullElems = document.querySelectorAll(".fullElem");
let allCloseBtns = document.querySelectorAll(".close");
// Preview full task
elems.forEach(function (elem) {
  elem.addEventListener("click", function () {
    fullElems[elem.id].style.display = "block";
  });
});
// localStorage.clear()
// Close task preview
allCloseBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    fullElems[btn.id].style.display = "none";
  });
});
//mobile phone
let changeButttons = document.querySelector(".changeButttons");
let nav = document.querySelector("nav");
let open = false;
document.querySelector(".menu").addEventListener("click", function () {
  if (!open) {
    nav.style.height = "15vh";
    changeButttons.style.display = "flex";
    open = true;
  } else {
    nav.style.height = "8vh";
    changeButttons.style.display = "none";
    open = false;
  }
});

// home-page
function homePage() {
  let currDate = document.querySelector(".currDate");
  let currTime = document.querySelector(".currTime");
  let showCompeletedTask = document.querySelector(".showCompeletedTask");
  let totalProdSeconds = JSON.parse(localStorage.getItem("totalHourStudied"));
  let showProdHrs = document.querySelector(".showProdHrs");
  function getWeekNumber(date) {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDays = Math.floor((date - startOfYear) / 86400000);
    return Math.ceil((pastDays + startOfYear.getDay() + 1) / 7);
  }
  setInterval(() => {
    const now = new Date();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const time = now.toLocaleTimeString();
    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const year = now.getFullYear();
    const date = now.getDate();
    currDate.innerHTML = `${date} ${monthName}, ${year}`;
    currTime.innerHTML = `${dayName}, ${time}`;
    if (JSON.parse(localStorage.getItem("completeTasks"))) {
      showCompeletedTask.innerHTML = `${
        JSON.parse(localStorage.getItem("completeTasks")).length
      } tasks`;
    } else {
      showCompeletedTask.innerHTML = `${0} tasks`;
    }
    const disProduvtiveHours = Math.floor(totalProdSeconds / 3600);
    const disProductiveMinutes = Math.floor((totalProdSeconds % 3600) / 60);
    showProdHrs.innerHTML = `${disProduvtiveHours} hrs ${disProductiveMinutes} mins`;
  }, 1000);

  let city = localStorage.getItem("city") || "karnal";
  // change City
  function changeCity() {
    let changeCityPage = document.querySelector(".changeCityPage");
    let main = document.querySelector("#main");
    let cityName = document.querySelector(".cityName");
    document.querySelector(".city").addEventListener("click", function () {
      changeCityPage.style.display = "block";
      main.style.filter = `blur(20px)`;
    });
    document
      .querySelector(".close-city-display")
      .addEventListener("click", function () {
        changeCityPage.style.display = "none";
        main.style.filter = `blur(0px)`;
      });
    document
      .querySelector(".changeCityForm")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        city = cityName.value;
        localStorage.setItem("city", city);
        updateWeather();
        changeCityPage.style.display = "none";
        main.style.filter = `blur(0px)`;
        cityName.value = "";
      });
  }
  changeCity();

  // update weather data
  let apiKey = "cc2f85b660cc463d812104138251205";
  let temp = document.querySelector(".temp");
  let condition = document.querySelector(".condition");

  async function updateWeather() {
    try {
      let response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      let weatherData = await response.json();
      let currentCity = document.querySelector(".currentCity");
      currentCity.innerHTML = `${city}`;
      temp.innerHTML = `${weatherData.current.temp_c}°C`;
      condition.innerHTML = `${weatherData.current.condition.text}`;
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }
  updateWeather();
}

// change theme
function changeTheme() {
  let flag = 1;
  let rootEl = document.documentElement;
  document
    .querySelector(".change-theme")
    .addEventListener("click", function () {
      if (flag === 1) {
        rootEl.style.setProperty("--per", "#1b262c");
        rootEl.style.setProperty("--sec", "#d52941");
        rootEl.style.setProperty("--teri1", "#990d35");
        rootEl.style.setProperty("--teri2", "#ffffff");
        flag = 2;
      } else if (flag === 2) {
        rootEl.style.setProperty("--per", "#1b262c");
        rootEl.style.setProperty("--sec", "#0f4c75");
        rootEl.style.setProperty("--teri1", "#3282b8");
        rootEl.style.setProperty("--teri2", "#ffffff");
        flag = 0;
      } else {
        rootEl.style.setProperty("--per", "black");
        rootEl.style.setProperty("--sec", "#222831");
        rootEl.style.setProperty("--teri1", "#00adb5");
        rootEl.style.setProperty("--teri2", "#eeeeee");
        flag = 1;
      }
    });
}
changeTheme();

// To Do
function todo() {
  let createTask = document.querySelector(".create-task-btn");
  let tasks = document.querySelector(".create-task");
  let taskForm = document.querySelector(".task-form");
  let createTaskClose = document.querySelector(".close-task");
  let taskDis = document.querySelector(".discription");
  let taskName = document.querySelector(".taskName");
  let impTask = document.querySelector(".mark");
  let remainingTask = document.querySelector(".remainingTasks");
  let toDoFullPage = document.querySelector(".to-do-full-page");
  let completedTask = document.querySelector(".completed-task");
  let completeed = document.querySelector(".comleted");
  let blurBg = document.querySelector(".blur-bg");

  let allTasks = [];
  let completeTasks = [];

  // Load from localStorage
  if (localStorage.getItem("allTasks")) {
    allTasks = JSON.parse(localStorage.getItem("allTasks"));
  }
  if (localStorage.getItem("completeTasks")) {
    completeTasks = JSON.parse(localStorage.getItem("completeTasks"));
  }

  // Show task creation form
  createTask.addEventListener("click", function () {
    tasks.style.display = "initial";
    blurBg.style.display = "initial";
  });

  // Hide task creation form
  createTaskClose.addEventListener("click", function () {
    tasks.style.display = "none";
    blurBg.style.display = "none";
  });

  // Render completed tasks
  function renderCompleteTasks() {
    let compTasks = "";
    completeTasks.forEach(function (obj, idx) {
      compTasks += `<div class="com-task">
                      <span>${obj.task}</span>
                      <i class="ri-check-fill"></i>
                      <i id="${idx}" class="ri-delete-bin-line task-del"></i>
                    </div>`;
    });
    completeed.innerHTML = compTasks;

    // Attach delete handlers (scoped to tasks)
    let delBtn = document.querySelectorAll(".task-del");
    delBtn.forEach(function (btn) {
      btn.addEventListener("click", function () {
        completeTasks.splice(btn.id, 1);
        localStorage.setItem("completeTasks", JSON.stringify(completeTasks));
        renderCompleteTasks();
      });
    });
  }

  // Render current tasks
  function renderTasks() {
    let clutter = "";
    allTasks.forEach(function (obj, idx) {
      clutter += `<div class="task">
                    <h3>${obj.task}
                      ${obj.imp ? `<span class="imp-tag">imp</span>` : ""}
                    </h3>
                    <input class="task-completeBox" id="${idx}" type="checkbox">
                  </div>`;
    });
    remainingTask.innerHTML = clutter;

    // Attach complete handlers (scoped to tasks)
    let completeBtn = document.querySelectorAll(".task-completeBox");
    completeBtn.forEach(function (btn) {
      btn.addEventListener("click", function () {
        completeTasks.push(allTasks[btn.id]);
        allTasks.splice(btn.id, 1);
        localStorage.setItem("allTasks", JSON.stringify(allTasks));
        localStorage.setItem("completeTasks", JSON.stringify(completeTasks));
        renderTasks();
        renderCompleteTasks();
      });
    });
  }

  // Handle task form submission
  taskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let title = taskName.value.trim();
    if (!title) {
      alert("Task name cannot be empty!");
      return;
    }

    allTasks.push({
      task: title,
      detail: taskDis.value,
      imp: impTask.checked,
    });
    localStorage.setItem("allTasks", JSON.stringify(allTasks));

    // Reset form
    taskName.value = "";
    taskDis.value = "";
    impTask.checked = false;

    renderTasks();
    tasks.style.display = "none";
    blurBg.style.display = "none";
  });

  // Initial render
  renderTasks();
  renderCompleteTasks();
}
// Daily Planner
function dailyPlanner() {
  let Planner = document.querySelector(".planner");

  let dailyPlansData = JSON.parse(localStorage.getItem("dailyPlansData")) || {};
  // localStorage.clear()

  let hours = Array.from({ length: 18 }, (_, idx) => {
    return `${06 + idx}:00 - ${07 + idx}:00`;
  });
  let dailyPlanns = "";
  hours.forEach(function (hour, idx) {
    dailyPlanns += `<div class="hour">
                <h3> ${hour} </h3>
                <input id="${idx}" class="hourInput" type="text" value="${
      dailyPlansData[idx] || ""
    }" placeholder="...">
              </div>`;
  });
  Planner.innerHTML = dailyPlanns;
  let dailyPlannsInput = document.querySelectorAll(".hourInput");
  dailyPlannsInput.forEach(function (plans, idx) {
    plans.addEventListener("input", function () {
      dailyPlansData[idx] = plans.value;
      localStorage.setItem("dailyPlansData", JSON.stringify(dailyPlansData));
    });
  });
}
// Fecth Motivational Quote
async function motivationQuote() {
  let responce = await fetch("https://quotes-api-self.vercel.app/quote");
  let quoteData = await responce.json();
  let quote = document.querySelector(".quote");
  let author = document.querySelector(".author");
  quote.innerHTML = quoteData.quote;
  author.innerHTML = quoteData.author;
}
// Pomodoro Timer
function pomodoroTimer() {
  let totalSecond = 25 * 60;
  let workStartedSession = 0;
  const hourText = document.querySelector(".hourText");
  const minuteText = document.querySelector(".minute");
  const secondText = document.querySelector(".second");
  let session = document.querySelector(".session");
  let workSession = true;
  function calMintHourAndSec(totalSecond) {
    const hours = Math.floor(totalSecond / 3600);
    const minutes = Math.floor((totalSecond % 3600) / 60);
    const seconds = totalSecond % 60;
    return { hours, minutes, seconds };
  }
  // localStorage.clear()
  // Store total hour work session after timer is finish
  let totalHourStudied =
    JSON.parse(localStorage.getItem("totalHourStudied")) || 0;
  // Update the Productive hour
  function updateProductivehour() {
    let prodCart = document.querySelector(".productive-hours");
    let totalProdutiveSeconds = JSON.parse(
      localStorage.getItem("totalHourStudied")
    );
    const produvtiveHours = Math.floor(totalProdutiveSeconds / 3600);
    const productiveMinutes = Math.floor((totalProdutiveSeconds % 3600) / 60);
    prodCart.innerHTML = `${produvtiveHours} hrs ${productiveMinutes} mins`;
  }
  updateProductivehour();
  // Start Stop And Reset Timer
  let intervalId = null;
  function startInterval() {
    if (workSession) {
      workStartedSession = totalSecond;
      totalHourStudied += workStartedSession;
    }
    updateProductivehour();
    if (!intervalId) {
      intervalId = setInterval(function () {
        totalSecond--;
        updateUI();
      }, 1000);
    }
  }
  // localStorage.clear()
  function stopInterval() {
    clearInterval(intervalId);
    intervalId = null;
  }
  document.querySelector(".start").addEventListener("click", startInterval);
  document.querySelector(".pause").addEventListener("click", stopInterval);
  document.querySelector(".reset").addEventListener("click", function () {
    totalSecond = 25 * 60;
    stopInterval();
    updateUI();
  });

  function updateUI() {
    if (totalSecond > 0) {
      const { hours, minutes, seconds } = calMintHourAndSec(totalSecond);
      hourText.innerHTML = String(hours).padStart(2, "0");
      minuteText.innerHTML = String(minutes).padStart(2, "0");
      secondText.innerHTML = String(seconds).padStart(2, "0");
    } else {
      if (workSession) {
        // store the total time in local storage after work session  is finished
        localStorage.setItem("totalHourStudied", totalHourStudied);
        // set work session to false to start the break
        updateProductivehour();
        workSession = false;
        totalSecond = 300;
        minuteText.innerHTML = String(5).padStart(2, "0");
        session.innerHTML = "Take a break";
      } else {
        totalSecond = 25 * 60;
        workSession = true;
        minuteText.innerHTML = String(25).padStart(2, "0");
        session.innerHTML = "Work Session";
      }
      stopInterval();
      hourText.innerHTML = String(0).padStart(2, "0");
      secondText.innerHTML = String(0).padStart(2, "0");
    }
  }
  // Initial update
  updateUI();

  document
    .querySelector(".decrement-time")
    .addEventListener("click", function () {
      if (totalSecond <= 300) totalSecond = Math.max(0, totalSecond - 60);
      else totalSecond = Math.max(0, totalSecond - 300);
      // calMintHourAndSec(totalSecond)// prevent negative
      updateUI();
    });
  document
    .querySelector(".increment-time")
    .addEventListener("click", function () {
      totalSecond += 300;
      // calMintHourAndSec(totalSecond)
      updateUI();
    });
  // localStorage.clear()
  // open and close productive cart
  let displayDetails = document.querySelector(".display-details");
  document.querySelector(".details").addEventListener("click", function () {
    displayDetails.style.display = "flex";
  });
  document
    .querySelector(".close-hour-display")
    .addEventListener("click", function () {
      displayDetails.style.display = "none";
    });
}
// Daily goals
function dailyGoals() {
  // DOM elements from your HTML
  const openGoalFormBtn = document.querySelector(".create-goal-btn");
  const goalFormSection = document.querySelector(".add-goal");
  const blurBackground = document.querySelector(".goal-blur-bg");
  const closeGoalFormBtn = document.querySelector(".close-goal");
  const goalForm = document.querySelector(".goal-form");

  const goalNameInput = document.querySelector(".goalName");
  const goalDescriptionInput = document.querySelector(".goal-discription");
  const goalImportanceCheckbox = document.querySelector(".goal-mark");

  const todayGoalsContainer = document.querySelector(".todayGoal");
  const achievedGoalsContainer = document.querySelector(".achieved");

  let todayGoals = JSON.parse(localStorage.getItem("todayGoals")) || [];
  let achievedGoals = JSON.parse(localStorage.getItem("achievedGoals")) || [];

  // Show goal creation form
  openGoalFormBtn.addEventListener("click", function () {
    goalFormSection.style.display = "initial";
    blurBackground.style.display = "initial";
  });

  // Hide goal creation form
  closeGoalFormBtn.addEventListener("click", function () {
    goalFormSection.style.display = "none";
    blurBackground.style.display = "none";
  });

  // Render achieved goals
  function renderAchievedGoals() {
    let achievedHTML = "";
    achievedGoals.forEach(function (goal, index) {
      achievedHTML += `<div class="com-task">
                          <span>${goal.name}</span>
                          <i class="ri-check-fill"></i>
                          <i id="${index}" class="ri-delete-bin-line del"></i>
                       </div>`;
    });
    achievedGoalsContainer.innerHTML = achievedHTML;

    const deleteButtons = document.querySelectorAll(".del");
    deleteButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        achievedGoals.splice(btn.id, 1);
        localStorage.setItem("achievedGoals", JSON.stringify(achievedGoals));
        renderAchievedGoals();
      });
    });
  }

  // Render today's goals
  function renderTodayGoals() {
    let goalsHTML = "";
    todayGoals.forEach(function (goal, index) {
      goalsHTML += `<div class="task">
                      <h3>${goal.name}
                        ${
                          goal.important
                            ? `<span class="imp-tag">imp</span>`
                            : ""
                        }
                      </h3>
                      <input class="completeBox" id="${index}" type="checkbox">
                    </div>`;
    });
    todayGoalsContainer.innerHTML = goalsHTML;

    const completeCheckboxes = document.querySelectorAll(".completeBox");
    completeCheckboxes.forEach(function (checkbox) {
      checkbox.addEventListener("click", function () {
        achievedGoals.push(todayGoals[checkbox.id]);
        todayGoals.splice(checkbox.id, 1);
        localStorage.setItem("todayGoals", JSON.stringify(todayGoals));
        localStorage.setItem("achievedGoals", JSON.stringify(achievedGoals));
        renderTodayGoals();
        renderAchievedGoals();
      });
    });
  }

  // Handle goal form submission
  goalForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const goalName = goalNameInput.value.trim();
    const goalDescription = goalDescriptionInput.value.trim();
    const isImportant = goalImportanceCheckbox.checked;

    if (!goalName) {
      alert("Goal name cannot be empty!");
      return;
    }

    todayGoals.push({
      name: goalName,
      description: goalDescription,
      important: isImportant,
    });

    localStorage.setItem("todayGoals", JSON.stringify(todayGoals));

    // Reset form
    goalNameInput.value = "";
    goalDescriptionInput.value = "";
    goalImportanceCheckbox.checked = false;

    renderTodayGoals();
    goalFormSection.style.display = "none";
    blurBackground.style.display = "none";
  });

  // Initial render
  renderTodayGoals();
  renderAchievedGoals();
}
// clear local storage after 24 hour
function clearLocalStorageAfter24Hours() {
  const STORAGE_KEY = "lastClearTime";
  const CLEAR_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  const now = Date.now();
  const lastClear = localStorage.getItem(STORAGE_KEY);

  if (!lastClear || now - parseInt(lastClear, 10) > CLEAR_INTERVAL) {
    localStorage.clear();
    localStorage.setItem(STORAGE_KEY, now.toString());
    console.log("Local storage cleared.");
  } else {
    console.log("Local storage not cleared yet.");
  }
}
// Call this on app start
clearLocalStorageAfter24Hours();
homePage();
todo();
dailyPlanner();
motivationQuote();
pomodoroTimer();
dailyGoals();
