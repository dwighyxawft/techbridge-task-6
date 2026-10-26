/* ==========================================================
   TechBridge Intern Dashboard (Task 6)
   Plain JavaScript: no frameworks.

   How it works, in one line:
   the 8 tasks live in one array of objects (section 1). Every time
   something changes, renderAll() redraws the progress numbers, the
   progress bar and the task cards from that array (section 4).

   What this file does:
   1. Task tracker .......... cards built from the tasks array
   2. Mark as Completed ..... updates the count, percentage and bar
   3. Filters ............... All / Completed / In Progress / Not Started
   4. View Task ............. a details dialog, no page refresh
   5. Technology explorer ... Next.js / Vue.js / Angular / Backend
   Extras: progress is saved in the browser (localStorage), a small
   notification, and a message when all 8 tasks are completed.
   ========================================================== */

"use strict";

/* ----------------------------------------------------------
   1. DATA
   Each task is an OBJECT; the tasks are an ARRAY of those objects.
   To change a task, edit it here and nothing else.
   status must be "Completed", "In Progress" or "Not Started".
   (The status written here is only the starting point: after a
   visitor changes tasks, their progress is saved in the browser.)
   ---------------------------------------------------------- */

// The sample intern shown in the welcome section.
const INTERN = { name: "Alex", track: "Web Development" };

// Details of the Challenge Hub (Task 5). Keep these in step with challenges.js.
const CHALLENGE_SUMMARY = { total: 10, data: 5, web: 5 };

const STORAGE_KEY = "techbridge-dashboard-progress";
const STATUSES = ["Completed", "In Progress", "Not Started"];

const tasks = [
  {
    number: 1,
    day: 1,
    title: "Build the TechBridge Homepage",
    description: "Create the first version of the TechBridge website using HTML and CSS.",
    difficulty: "Beginner",
    status: "Completed",
    build: [
      "A homepage that introduces TechBridge, its programs and its 30-day internship",
      "Clear navigation, a community call-to-action, contact details and a footer",
      "A layout that works on desktop, tablet and mobile"
    ],
    connects: null
  },
  {
    number: 2,
    day: 4,
    title: "Build the TechBridge Programs Experience",
    description: "Create a Programs experience presenting TechBridge's available learning programs.",
    difficulty: "Beginner",
    status: "Completed",
    build: [
      "A dedicated Programs page or experience for Data Analytics and Web Development",
      "Clear information on what each program is about and the skills it develops",
      "A clear next step for visitors"
    ],
    connects: "The website you built in Task 1."
  },
  {
    number: 3,
    day: 8,
    title: "Build the Internship Tasks Experience",
    description: "Create an interface that presents the TechBridge internship tasks and helps users understand the internship journey.",
    difficulty: "Beginner \u2192 Intermediate",
    status: "Completed",
    build: [
      "An introduction to the structured 30-day internship",
      "All 8 tasks, each with its number, title, day and a brief description",
      "A clear sense of the sequence and the increasing difficulty",
      "Built with HTML5 and CSS3, and responsive on desktop, tablet and mobile"
    ],
    connects: "The Home and Programs pages from Tasks 1 and 2."
  },
  {
    number: 4,
    day: 11,
    title: "Build an Interactive Internship Roadmap",
    description: "Use JavaScript to allow visitors to switch between the Data Analytics and Web Development internship tracks.",
    difficulty: "Beginner \u2192 Intermediate",
    status: "In Progress",
    build: [
      "A way for visitors to select the Data Analytics or Web Development track",
      "Task content that switches between the two tracks without a page refresh",
      "Built with HTML5, CSS3 and JavaScript, with no frameworks"
    ],
    connects: "The task experience from Task 3."
  },
  {
    number: 5,
    day: 15,
    title: "Build the TechBridge Challenge Hub",
    description: "Create an interactive Challenge Hub where visitors can browse, filter and explore challenges from the two TechBridge tracks.",
    difficulty: "Beginner \u2192 Intermediate",
    status: "Not Started",
    build: [
      "A Challenge Hub page where visitors can browse challenges from both tracks",
      "Filters for track and difficulty",
      "Challenge details that appear without a page refresh"
    ],
    connects: "The Home, Programs and roadmap pages from earlier tasks."
  },
  {
    number: 6,
    day: 19,
    title: "Build the TechBridge Intern Dashboard",
    description: "Create an interactive intern dashboard where an intern can see their progress, track their tasks and explore the Challenge Hub.",
    difficulty: "Intermediate",
    status: "Not Started",
    build: [
      "A welcome section, plus a progress bar and percentage that update as tasks are completed",
      "A task tracker with filters and task details",
      "A link to the Challenge Hub and a Modern Web Technologies explorer"
    ],
    connects: "The Challenge Hub from Task 5."
  },
  {
    number: 7,
    day: 22,
    title: "Build the Task Submission System",
    description: "Create an interface through which interns can prepare and submit their task work.",
    difficulty: "Intermediate",
    status: "Not Started",
    build: [
      "An interface where interns can prepare their task work",
      "A way for interns to submit that work"
    ],
    connects: null
  },
  {
    number: 8,
    day: 26,
    title: "Build the Complete TechBridge Internship Platform",
    description: "Combine the different components created during the internship into a complete TechBridge platform.",
    difficulty: "Intermediate",
    status: "Not Started",
    build: [
      "The components from the earlier tasks, combined",
      "A complete TechBridge internship platform"
    ],
    connects: "The components created across the internship."
  }
];

// Difficulty label -> number of filled bars (1, 2 or 3)
const DIFFICULTY_LEVEL = {
  "Beginner": 1,
  "Beginner \u2192 Intermediate": 2,
  "Intermediate": 3
};

// Content for the Technology Explorer. One object per button.
const TECHNOLOGIES = {
  nextjs: {
    name: "Next.js",
    tagline: "A React framework for building full web applications",
    about: "Next.js is a React framework for building full-stack web applications. You write the interface with React components, and Next.js adds routing, server-side rendering, data fetching and build tools, so one project can show pages and also handle some server work.",
    usedFor: [
      "Business and marketing websites that need to load quickly and be easy to find on search engines",
      "E-commerce stores and content-heavy sites",
      "Dashboards and full web apps that need both a frontend and some server logic"
    ],
    facts: [
      ["Built on", "React"],
      ["Maintained by", "Vercel"],
      ["Good to know first", "JavaScript and React basics"]
    ],
    url: "https://nextjs.org",
    linkText: "Learn more about Next.js"
  },
  vue: {
    name: "Vue.js",
    tagline: "A friendly JavaScript framework for building interfaces",
    about: "Vue.js is a progressive JavaScript framework for building user interfaces. You describe what the page should look like for the current data, and Vue keeps the page in sync as that data changes. You can add it to one part of a page or build a complete single-page application.",
    usedFor: [
      "Interactive interfaces such as dashboards, forms and admin panels",
      "Single-page applications",
      "Adding interactivity to an existing website one piece at a time"
    ],
    facts: [
      ["Created by", "Evan You"],
      ["Language", "JavaScript (TypeScript is supported)"],
      ["Known for", "A gentle learning curve"]
    ],
    url: "https://vuejs.org",
    linkText: "Learn more about Vue.js"
  },
  angular: {
    name: "Angular",
    tagline: "A complete framework for large web applications",
    about: "Angular is a full-featured framework, built by Google, for creating web applications with TypeScript. Routing, forms, tools for talking to servers and testing support all come built in, so teams follow one consistent way of building an app.",
    usedFor: [
      "Large business and enterprise applications",
      "Complex internal tools and dashboards",
      "Projects with big teams that benefit from a strict, consistent structure"
    ],
    facts: [
      ["Maintained by", "Google"],
      ["Language", "TypeScript"],
      ["Known for", "Structure and a lot built in"]
    ],
    url: "https://angular.dev",
    linkText: "Learn more about Angular"
  },
  backend: {
    name: "Backend Development",
    tagline: "The part of a website that runs on a server",
    about: "Backend development is the work that happens on a server, out of the visitor's sight. The backend stores data in a database, applies business rules, handles logins and security, and sends information to the frontend through an API. The frontend is what the visitor sees and clicks in the browser: it asks the backend for data, then displays the answer.",
    flow: ["Frontend (browser)", "Backend (server)", "Database"],
    technologies: [
      ["Node.js", "Runs JavaScript on a server, so one language can power both frontend and backend."],
      ["Express.js", "A small, popular web framework for Node.js, often used to build APIs."],
      ["Django", "A Python framework with many tools included, such as an admin area and user accounts."],
      ["Flask", "A lightweight Python framework that gives you the basics and lets you choose the rest."],
      ["Laravel", "A PHP framework known for clear syntax and built-in features for web applications."],
      [".NET", "Microsoft's platform for building web apps and APIs, usually with C#."]
    ],
    url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps",
    linkText: "Learn more about the backend"
  }
};

/* ----------------------------------------------------------
   2. STATE AND PAGE ELEMENTS
   ---------------------------------------------------------- */

let currentFilter = "All";      // the task filter the visitor chose
let currentTech = "nextjs";     // the technology shown in the explorer
let lastTaskNumber = null;      // the task whose dialog was opened, so focus can return to it
let toastTimer = null;

const taskList = document.getElementById("task-list");
const noTasks = document.getElementById("no-tasks");
const taskCount = document.getElementById("task-count");
const filterButtons = document.querySelectorAll(".seg-btn");
const dialog = document.getElementById("task-dialog");
const dialogContent = document.getElementById("task-dialog-content");
const dialogActions = document.getElementById("task-dialog-actions");
const toast = document.getElementById("toast");
const techTabs = document.querySelectorAll(".tech-tabs .tab");
const techPanel = document.getElementById("tech-panel");

/* ----------------------------------------------------------
   3. SMALL HELPER FUNCTIONS
   ---------------------------------------------------------- */

function icon(name) {
  return `<svg class="icon" aria-hidden="true"><use href="#${name}"/></svg>`;
}

// "In Progress" -> "in-progress" (used for CSS class names)
function slug(status) {
  return status.toLowerCase().replace(" ", "-");
}

function getLevel(difficulty) {
  return DIFFICULTY_LEVEL[difficulty] || 0;
}

function buildPips(difficulty) {
  return `<span class="level" data-level="${getLevel(difficulty)}" aria-hidden="true"><i></i><i></i><i></i></span>`;
}

function countByStatus(status) {
  return tasks.filter(function (task) { return task.status === status; }).length;
}

// 3 of 8 -> 37.5, 4 of 8 -> 50, 8 of 8 -> 100
function getPercent() {
  const done = countByStatus("Completed");
  return Math.round((done / tasks.length) * 1000) / 10;
}

// The overall status for the welcome section (conditional logic).
function getInternStatus() {
  const done = countByStatus("Completed");
  if (done === tasks.length) {
    return "Completed";
  } else if (done === 0 && countByStatus("In Progress") === 0) {
    return "Not Started";
  } else {
    return "In Progress";
  }
}

function findTask(number) {
  return tasks.find(function (task) { return task.number === number; });
}

/* Keep one task marked "In Progress": the earliest task that is not done.
   If nothing is in progress, the first "Not Started" task moves up. */
function updateCurrentTask() {
  const hasCurrent = tasks.some(function (task) { return task.status === "In Progress"; });
  if (!hasCurrent) {
    const next = tasks.find(function (task) { return task.status === "Not Started"; });
    if (next) {
      next.status = "In Progress";
    }
  }
}

/* ----------------------------------------------------------
   Saving progress in the browser (localStorage).
   Wrapped in try/catch because storage can be blocked.
   ---------------------------------------------------------- */
function saveProgress() {
  try {
    const statuses = tasks.map(function (task) { return task.status; });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(statuses));
  } catch (error) {
    /* storage unavailable: the dashboard still works, it just will not remember */
  }
}

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const valid = Array.isArray(saved) && saved.length === tasks.length &&
      saved.every(function (status) { return STATUSES.includes(status); });
    if (valid) {
      tasks.forEach(function (task, index) { task.status = saved[index]; });
    }
  } catch (error) {
    /* nothing saved, or storage unavailable: keep the starting statuses */
  }
}

/* ----------------------------------------------------------
   4. SHOWING THE DASHBOARD
   ---------------------------------------------------------- */

function renderWelcome() {
  document.getElementById("intern-name").textContent = INTERN.name;
  document.getElementById("intern-track").textContent = INTERN.track;
  document.getElementById("avatar").textContent = INTERN.name.charAt(0).toUpperCase();

  const status = getInternStatus();
  const badge = document.getElementById("intern-status");
  badge.textContent = status;
  badge.dataset.state = slug(status);
}

function renderProgress() {
  const total = tasks.length;
  const done = countByStatus("Completed");
  const percent = getPercent();

  document.getElementById("done-count").textContent = done;
  document.getElementById("total-count").textContent = total;
  document.getElementById("percent").textContent = percent + "%";
  document.getElementById("stat-total").textContent = total;
  document.getElementById("stat-done").textContent = done;
  document.getElementById("stat-left").textContent = total - done;

  // the bar
  document.getElementById("bar-fill").style.width = percent + "%";
  const bar = document.getElementById("bar");
  bar.setAttribute("aria-valuenow", percent);
  bar.setAttribute("aria-valuetext", percent + " percent complete, " + done + " of " + total + " tasks");

  // one little numbered dot per task
  let dots = "";
  tasks.forEach(function (task) {
    dots += `<li class="dot dot-${slug(task.status)}" title="Task ${task.number}: ${task.status}">${task.number}</li>`;
  });
  document.getElementById("task-dots").innerHTML = dots;

  // the "current task" box
  const current = tasks.find(function (task) { return task.status === "In Progress"; });
  const currentBox = document.getElementById("current-task");
  if (current) {
    currentBox.innerHTML = `
      <div>
        <p class="current-label">Current task</p>
        <p class="current-title">Task ${current.number} &middot; ${current.title}</p>
      </div>
      <button type="button" class="btn btn-primary btn-sm" data-action="view" data-number="${current.number}">Continue Task ${icon("i-arrow-right")}</button>`;
  } else {
    currentBox.innerHTML = `
      <div>
        <p class="current-label">Current task</p>
        <p class="current-title">No task in progress</p>
      </div>`;
  }

  // the celebration message
  document.getElementById("celebrate").hidden = done !== total;
}

function renderFilters() {
  filterButtons.forEach(function (button) {
    const filter = button.dataset.filter;
    const count = filter === "All" ? tasks.length : countByStatus(filter);
    button.setAttribute("aria-pressed", filter === currentFilter ? "true" : "false");
    button.querySelector(".count").textContent = count;
  });
}

function buildTaskCard(task, index, changedNumber) {
  const state = slug(task.status);
  const isDone = task.status === "Completed";
  const justDone = task.number === changedNumber ? " just-completed" : "";

  const mainButton = isDone
    ? `<button type="button" class="btn-text" data-action="undo" data-number="${task.number}">Undo</button>`
    : `<button type="button" class="btn btn-primary btn-sm" data-action="complete" data-number="${task.number}">Mark as Completed</button>`;

  return `
    <li class="task" id="task-${task.number}" data-status="${state}" style="--i:${index}">
      <article class="task-card${justDone}">
        <div class="task-head">
          <span class="task-num">TASK ${task.number}</span>
          <span class="pill pill-${state}"><span class="pill-icon">${isDone ? icon("i-check") : ""}</span><span class="sr-only">Status: </span>${task.status}</span>
        </div>
        <h3>${task.title}</h3>
        <p class="task-desc">${task.description}</p>
        <p class="task-meta"><span>Day ${task.day}</span>${buildPips(task.difficulty)}<span>${task.difficulty}</span></p>
        <div class="task-actions">
          <button type="button" class="btn btn-outline btn-sm" data-action="view" data-number="${task.number}" aria-haspopup="dialog" aria-label="View Task ${task.number}: ${task.title}">View Task</button>
          ${mainButton}
        </div>
      </article>
    </li>`;
}

// Draw the task cards that match the current filter.
function renderTasks(animate, changedNumber) {
  const visible = tasks.filter(function (task) {
    return currentFilter === "All" || task.status === currentFilter;
  });

  let html = "";
  visible.forEach(function (task, index) {
    html += buildTaskCard(task, index, changedNumber);
  });
  taskList.innerHTML = html;
  taskList.classList.toggle("is-animated", animate === true);

  noTasks.hidden = visible.length !== 0;
  taskCount.textContent = "Showing " + visible.length + " of " + tasks.length + " tasks";
}

// Redraw everything that depends on the task statuses.
function renderAll(animate, changedNumber) {
  renderWelcome();
  renderProgress();
  renderFilters();
  renderTasks(animate, changedNumber);
}

/* ----------------------------------------------------------
   5. CHANGING A TASK (Mark as Completed, Undo, Reset)
   ---------------------------------------------------------- */

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 3000);
}

function focusTaskButton(number) {
  const button = document.querySelector(`#task-${number} [data-action="view"]`);
  if (button) {
    button.focus();
  }
}

function completeTask(number) {
  const task = findTask(number);
  if (!task || task.status === "Completed") {
    return;
  }
  task.status = "Completed";
  updateCurrentTask();
  saveProgress();
  renderAll(false, number);

  const left = tasks.length - countByStatus("Completed");
  showToast(left === 0
    ? "All 8 tasks completed. Well done!"
    : "Task " + number + " marked as completed. " + left + " to go.");
}

function undoTask(number) {
  const task = findTask(number);
  if (!task || task.status !== "Completed") {
    return;
  }
  task.status = "Not Started";
  updateCurrentTask();
  saveProgress();
  renderAll(false);
  showToast("Task " + number + " moved back to your list.");
}

function resetProgress() {
  tasks.forEach(function (task, index) { task.status = DEFAULT_STATUSES[index]; });
  currentFilter = "All";
  try { localStorage.removeItem(STORAGE_KEY); } catch (error) { /* ignore */ }
  renderAll(true);
  showToast("Progress reset to the starting point.");
}

/* ----------------------------------------------------------
   6. TASK DETAILS (the dialog)
   ---------------------------------------------------------- */

function openTask(number) {
  const task = findTask(number);
  if (!task) {
    return;
  }
  lastTaskNumber = number;
  const state = slug(task.status);

  let items = "";
  task.build.forEach(function (item) {
    items += `<li>${icon("i-check")}${item}</li>`;
  });
  const connects = task.connects
    ? `<p class="connects"><strong>Connects to:</strong> ${task.connects}</p>`
    : "";

  dialogContent.innerHTML = `
    <div class="dialog-badges">
      <span class="task-num">TASK ${task.number}</span>
      <span class="pill pill-${state}">${task.status}</span>
    </div>
    <h2 id="task-dialog-title">${task.title}</h2>
    <p class="dialog-lead">${task.description}</p>
    <p class="task-meta"><span>Day ${task.day}</span>${buildPips(task.difficulty)}<span>${task.difficulty}</span></p>
    <h3 class="dialog-h">What you're expected to create</h3>
    <ul class="fit-list">${items}</ul>
    ${connects}`;

  const mainButton = task.status === "Completed"
    ? `<button type="button" class="btn btn-outline" data-action="undo" data-number="${task.number}">Undo completion</button>`
    : `<button type="button" class="btn btn-primary" data-action="complete" data-number="${task.number}">Mark as Completed</button>`;
  dialogActions.innerHTML = `${mainButton}<button type="button" class="btn btn-outline" data-close>Close</button>`;

  dialogContent.scrollTop = 0;
  document.documentElement.classList.add("modal-open");
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }
}

function closeTask() {
  if (typeof dialog.close === "function") {
    dialog.close();
  } else {
    dialog.removeAttribute("open");
    afterClose();
  }
}

function afterClose() {
  document.documentElement.classList.remove("modal-open");
  if (lastTaskNumber !== null) {
    focusTaskButton(lastTaskNumber);   // put the keyboard back on that task
  }
}

/* ----------------------------------------------------------
   7. TECHNOLOGY EXPLORER
   ---------------------------------------------------------- */

function buildTechnology(tech) {
  let body = "";

  if (tech.technologies) {
    // The backend panel: a simple flow, then the technologies.
    let flow = "";
    tech.flow.forEach(function (step, index) {
      flow += `<li class="flow-step">${step}</li>`;
      if (index < tech.flow.length - 1) {
        flow += `<li class="flow-arrow" aria-hidden="true">${icon("i-arrow-right")}</li>`;
      }
    });

    let cards = "";
    tech.technologies.forEach(function (item) {
      cards += `<li class="tech-card"><h4>${item[0]}</h4><p>${item[1]}</p></li>`;
    });

    body = `
      <div class="tech-main">
        <p class="tech-about">${tech.about}</p>
        <h3 class="tech-h">How the frontend and backend connect</h3>
        <ol class="flow" aria-label="Request flow">${flow}</ol>
        <p class="flow-note">The frontend sends a request, the backend reads or saves data in the database, and the answer travels back to the page.</p>
      </div>
      <div class="tech-wide">
        <h3 class="tech-h">Backend technologies</h3>
        <ul class="tech-cards">${cards}</ul>
      </div>`;
  } else {
    let used = "";
    tech.usedFor.forEach(function (item) {
      used += `<li>${icon("i-check")}${item}</li>`;
    });
    let facts = "";
    tech.facts.forEach(function (fact) {
      facts += `<div class="tech-fact"><dt>${fact[0]}</dt><dd>${fact[1]}</dd></div>`;
    });
    body = `
      <div class="tech-main">
        <p class="tech-about">${tech.about}</p>
        <h3 class="tech-h">Commonly used for</h3>
        <ul class="fit-list">${used}</ul>
      </div>
      <dl class="tech-facts">${facts}</dl>`;
  }

  return `
    <div class="tech-body">
      <h3 class="tech-title">${tech.name}</h3>
      <p class="tech-tagline">${tech.tagline}</p>
      <div class="tech-columns">${body}</div>
      <a class="btn btn-primary" href="${tech.url}" target="_blank" rel="noopener noreferrer">${tech.linkText} ${icon("i-external")}</a>
    </div>`;
}

function renderTech(key) {
  currentTech = key;
  techTabs.forEach(function (tab) {
    const selected = tab.dataset.tech === key;
    tab.setAttribute("aria-selected", selected ? "true" : "false");
    tab.tabIndex = selected ? 0 : -1;
  });
  techPanel.setAttribute("aria-labelledby", "tech-tab-" + key);
  techPanel.innerHTML = buildTechnology(TECHNOLOGIES[key]);
}

/* ----------------------------------------------------------
   8. EVENT LISTENERS
   ---------------------------------------------------------- */

// Buttons inside the page (task cards and the current-task box).
document.addEventListener("click", function (event) {
  const button = event.target.closest("[data-action]");
  if (!button || dialog.contains(button)) {
    return;
  }
  const number = Number(button.dataset.number);

  if (button.dataset.action === "view") {
    openTask(number);
  } else if (button.dataset.action === "complete") {
    completeTask(number);
    focusTaskButton(number);
  } else if (button.dataset.action === "undo") {
    undoTask(number);
    focusTaskButton(number);
  }
});

// Buttons inside the dialog, and a click on the dark area behind it.
dialog.addEventListener("click", function (event) {
  const action = event.target.closest("[data-action]");
  if (action) {
    const number = Number(action.dataset.number);
    if (action.dataset.action === "complete") {
      completeTask(number);
    } else if (action.dataset.action === "undo") {
      undoTask(number);
    }
    closeTask();
    return;
  }
  if (event.target === dialog || event.target.closest("[data-close]")) {
    closeTask();
  }
});

// Runs when the dialog closes by any route (buttons, backdrop or the Esc key).
dialog.addEventListener("close", afterClose);

// Filters.
document.querySelector(".tracker-bar .seg").addEventListener("click", function (event) {
  const button = event.target.closest(".seg-btn");
  if (!button) {
    return;
  }
  currentFilter = button.dataset.filter;
  renderFilters();
  renderTasks(true);
});

document.getElementById("show-all").addEventListener("click", function () {
  currentFilter = "All";
  renderFilters();
  renderTasks(true);
});

document.getElementById("reset-progress").addEventListener("click", resetProgress);

// Technology explorer: click a button, or use the arrow keys.
techTabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    renderTech(tab.dataset.tech);
  });
});

document.querySelector(".tech-tabs").addEventListener("keydown", function (event) {
  const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
  if (!keys.includes(event.key)) {
    return;
  }
  event.preventDefault();

  const list = Array.from(techTabs);
  const position = list.findIndex(function (tab) { return tab.dataset.tech === currentTech; });
  let next;
  if (event.key === "ArrowRight") {
    next = (position + 1) % list.length;
  } else if (event.key === "ArrowLeft") {
    next = (position - 1 + list.length) % list.length;
  } else if (event.key === "Home") {
    next = 0;
  } else {
    next = list.length - 1;
  }
  renderTech(list[next].dataset.tech);
  list[next].focus();
});

/* ----------------------------------------------------------
   9. START
   ---------------------------------------------------------- */

// Remember the starting statuses so "Reset progress" can restore them.
const DEFAULT_STATUSES = tasks.map(function (task) { return task.status; });

document.getElementById("challenge-total").textContent = CHALLENGE_SUMMARY.total;
document.getElementById("challenge-data").textContent = CHALLENGE_SUMMARY.data;
document.getElementById("challenge-web").textContent = CHALLENGE_SUMMARY.web;

loadProgress();
updateCurrentTask();
renderAll(false);
renderTech(currentTech);