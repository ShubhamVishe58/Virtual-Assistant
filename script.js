let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
  let text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1;
  text_speak.pitch = 1;
  text_speak.volume = 1;
  //   text_speak.voice=
  text_speak.lang = "hi-GB";
  window.speechSynthesis.speak(text_speak);
}

function wishMe() {
  let day = new Date();
  let hours = day.getHours();
  if (hours >= 0 && hours <= 12) {
    speak("Good Morning Boss");
  } else if (hours >= 12 && hours < 16) {
    speak("Good Afternoon Boss");
  } else {
    speak("Good Evening Boss");
  }
}

window.addEventListener("load", () => {
  speak("Initializing Eva");
  wishMe();
});

let speechRecognition =
  window.speechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();
recognition.onresult = (event) => {
  let currentIndex = event.resultIndex;
  let transcript = event.results[currentIndex][0].transcript;
  content.innerText = transcript;
  takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
  recognition.start();
  btn.style.display = "none";
  voice.style.display = "block";
});

function takeCommand(message) {
  btn.style.display = "flex";
  voice.style.display = "none";
  if (
    message.includes("hello") ||
    message.includes("hey") ||
    message.includes("hii")
  ) {
    speak("hello shubham, how can i help you?");
  } else if (message.includes("who are you")) {
    speak("hello shubham, I am you virtual assistant eva");
  } else if (message.includes("open youtube")) {
    speak("opening Youtube...");
    window.open("https://www.youtube.com", "_blank");
  } else if (message.includes("open google")) {
    speak("opening Google...");
    window.open("https://www.google.com", "_blank");
  } else if (message.includes("open facebook")) {
    speak("opening Facebook...");
    window.open("https://www.facebook.com", "_blank");
  } else if (message.includes("open instagram")) {
    speak("opening Instagram...");
    window.open("https://www.instagram.com", "_blank");
  } else if (message.includes("open calculator")) {
    speak("opening calculator...");
    window.open("calculator://");
  } else if (message.includes("open whatsapp")) {
    speak("opening whatsapp...");
    window.open("whatsapp://");
  } else if (message.includes("time")) {
    let time = new Date().toLocaleString(undefined, {
      hour: "numeric",
      minute: "numeric",
    });
    speak(time);
  } else if (message.includes("date")) {
    let date = new Date().toLocaleString(undefined, {
      day: "numeric",
      month: "short",
    });
    speak(date);
  } else {
    speak(
      `this is what i know regarding ${
        message.replace("rose", "") || message.replace("roze", "")
      }`
    );
    window.open(`https://www.google.com/search?q=${message}`);
  }
}
