// Global scope variables
const nameInput = document.getElementById("nameInput");
const teamInput = document.getElementById("teamInput");
const textOutput = document.querySelector("#textOutput");
const clearBtn = document.querySelector("#clear");
const clearConvo = document.querySelector("#clearConvo");
const form = document.querySelector("#form");
const btnDiv = document.querySelector(".btnDiv");
const btnDiv2 = document.querySelector(".btnDiv2");
const conversationForm = document.querySelector("#conversationForm");
const enterNote = document.querySelector("#enterNote");
const noteArea = document.querySelector("#textarea");
const conversationOutput = document.querySelector("#conversationOutput");

// Local Storage for the attendance log
let attendanceLog;
let data = localStorage.getItem("storedAttendance");
if (data) {
  attendanceLog = JSON.parse(data);
  loadStoredAttendance(attendanceLog);
} else {
  attendanceLog = [];
}

function loadStoredAttendance(array) {
  array.forEach(function(item) {
    addInputs(item.name, item.team, item.time);
  });
}
// Local Storage for the conversation log
let conversationLog;
let data2 = localStorage.getItem("storedNotes");
if (data2) {
  conversationLog = JSON.parse(data2);
  loadStoredNotes(conversationLog);
} else {
  conversationLog = [];
}

function loadStoredNotes(array) {
  array.forEach(function(item) {
    addNotes(item.time, item.notes);
  });
}

// Load event listeners
loadEventListeners();

function loadEventListeners() {
  // Press enter to append the name, team, and time
  form.addEventListener("keyup", enterInputs);
  // Clear all inputs
  clearBtn.addEventListener("click", snap);
  clearConvo.addEventListener("click", snap2);
  // Form prevent default submit
  form.addEventListener("submit", formSubmit);
  // Conversation Log Area
  conversationForm.addEventListener("keyup", enterNotes);
}

function addInputs(name, team, time) {
  let text = `<li class="collection-item"><span class="capitalize">${name}</span> <span class="capitalize">(${team})</span> joined the call at ${time}.</li>`;

  let position = "beforeend";
  textOutput.insertAdjacentHTML(position, text);
}
// Form prevent default submit
function formSubmit(e) {
  e.preventDefault();
}

function enterInputs(event) {
  if (event.keyCode == 13) {
    if (nameInput && nameInput.value && teamInput && teamInput.value) {
      // declare scope variables
      let name = nameInput.value;
      let team = teamInput.value;
      let options = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        month: "numeric",
        day: "numeric",
        year: "2-digit"
      };
      let currentTime = new Date();
      let time = currentTime.toLocaleTimeString("en-US", options);
      if ((name, team, time)) {
        addInputs(name, team, time);
        attendanceLog.push({
          name: name,
          team: team,
          time: time
        });
      }
      nameInput.value = "";
      teamInput.value = "";
      nameInput.focus();
      // Local Storage
      localStorage.setItem("storedAttendance", JSON.stringify(attendanceLog));
    }
  }
}

// Copy texts to clipboard
const clipboard = new ClipboardJS("#copy");
clipboard.on("success", function() {
  M.toast({
    html: "Ready to paste",
    classes: "blue"
  });
});
// Tooltips for copy
tippy(".copy", {
  content: "Copy All",
  placement: "left",
  arrow: true,
  arrowType: "sharp"
});

// Tooltips for Remove
tippy(".clear", {
  content: "Clear All",
  placement: "right",
  arrow: true,
  arrowType: "sharp"
});

// Clear Inputs
function snap() {
  let dialog = confirm("Are you sure? There's no recovery.");
  if (dialog == true) {
    textOutput.innerHTML = "";
    localStorage.removeItem("storedAttendance");
  }
}

function snap2() {
  let dialog = confirm("Are you sure? There's no recovery.");
  if (dialog == true) {
    conversationOutput.innerHTML = "";
    localStorage.removeItem("storedNotes");
  }
}

//
// Conversation Log Area
//
function addNotes(time, notes) {
  let text = `<li class="collection-item">${time} - <span class="">${notes}</span></li>`;
  let position = "beforeend";
  conversationOutput.insertAdjacentHTML(position, text);
}

// Enter notes
function enterNotes(event) {
  if (event.keyCode == 13) {
    if (noteArea && noteArea.value) {
      let notes = noteArea.value;
      let options = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        month: "numeric",
        day: "numeric",
        year: "2-digit"
      };
      let currentTime = new Date();
      let time = currentTime.toLocaleTimeString("en-US", options);
      if ((time, notes)) {
        addNotes(time, notes);
        conversationLog.push({
          time: time,
          notes: notes
        });
      }
      noteArea.value = "";
      noteArea.focus();
      localStorage.setItem("storedNotes", JSON.stringify(conversationLog));
    }
  }
}
