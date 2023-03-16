const timerElement = document.querySelector("#timer");

const secsPerMinute = 60;
const secsPerHour = 60 * secsPerMinute;
const secsPerDay = 24 * secsPerHour;

//launch time is 9 days later
const launchTime = Date.now() + days2sec(9);

function days2sec(days) {
  return days * secsPerDay * 1000;
}

function miliSecs2secs(milisecs) {
  return Math.floor(milisecs / 1000);
}

function existSeconds() {
  const res = launchTime - Date.now();
  //return 0 if time has passed
  return res > 0 ? miliSecs2secs(res) : 0;
}

function sec2timerObject(sec) {
  var existSec = sec;

  const d = Math.floor(existSec / secsPerDay);
  existSec -= d * secsPerDay;

  const h = Math.floor(existSec / secsPerHour);
  existSec -= h * secsPerHour;

  const m = Math.floor(existSec / secsPerMinute);

  const s = existSec - m * secsPerMinute;

  return {
    days: d,
    hours: h,
    minutes: m,
    seconds: s,
  };
}

function generateTimeBox(label, time) {
  return `<div class="time__box">
    <div class="time">${time >= 10 ? time : `0${time}`}</div>
    <p class="label">${label}</p>
  </div>`;
}

var existSecondsChache = existSeconds();

function updateTimerElement() {
  existSecondsChache -= 1;
  const timerObject = sec2timerObject(existSecondsChache);

  timerElement.innerHTML = "";
  for (label in timerObject) {
    timerElement.innerHTML += generateTimeBox(label, timerObject[label]);
  }
}

updateTimerElement();

setInterval(() => {
  updateTimerElement();
}, 1000);
