const btn = document.querySelector('.talk');
const gif = document.querySelector('.gif')
const content = document.querySelector('.content');

class person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    setName(name) {
        this.name = name
    }
}

class assistant {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    setName(name) {
        this.name = name
    }
}

var Person = new person("Boss");
var Explodion = new assistant("Explodion");

function speak(sentence) {
    const text_speak = new SpeechSynthesisUtterance(sentence);

    text_speak.rate = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    var day = new Date();
    var hr = day.getHours();

    if(hr >= 0 && hr < 12) {
        speak("Good Morning "+Person.name);
    }

    else if(hr == 12) {
        speak("Good Noon "+Person.name);
    }

    else if(hr > 12 && hr <= 17) {
        speak("Good Afternoon "+Person.name);
    }

    else {
        speak("Good Evening "+Person.name);
    }
}

window.addEventListener('load', ()=>{
    speak("Activating Explodion");
    speak("Going online");
    wishMe();
})

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    content.textContent = transcript;
    speakThis(transcript.toLowerCase());
}

btn.addEventListener('click', ()=>{
    recognition.start();
})

gif.addEventListener('click', ()=>{
    console.log("hello")
    recognition.start();
})

function startRecognition() {
    recognition.start();
}

function speakThis(message) {
    const speech = new SpeechSynthesisUtterance();
    
    speech.text = "I did not understand what you said, please try again";

    if(message.includes('hey') || message.includes('hello') || message.includes('hi')) {
        greetings = ["Hey, how can I help you"+Person.name, "Hey, what's up?"+Person.name, "I'm listening"+Person.name, "How can I help you?"+Person.name, "Hello"+Person.name]
        greet = greetings[Math.floor(Math.random() * greetings.length)];
        const finalText = greet
        speech.text = finalText;
    }

    else if(message.includes('how are you')) {
        const finalText = "I am fine "+Person.name+" tell me how can i help you";
        speech.text = finalText;
    }

    else if(message.includes('what is your name') || message.includes("what's your name") || message.includes('tell me your name')) {
        let finalText
        if (Person.name !== "Boss") {
            finalText = "My name is "+Explodion.name+", "+Person.name
        }
        else {
            finalText = "My name is "+Explodion.name+". what's your name?"
        }
        speech.text = finalText;
    }

    else if(message.includes('call me') || message.includes('my name is')) {
        if (message.includes("me")) {
            Person.setName(message.split('me').pop())
        }
        else {
            Person.setName(message.split('is').pop())
        }
        const finalText = "Okay, i will remember that " + Person.name;
        speech.text = finalText;
    }

    else if(message.includes('your name is') || message.includes('your name should be')) {
        if (message.includes("is")) {
            Explodion.setName(message.split('is').pop())
        }
        else {
            Explodion.setName(message.split('be').pop())
        }
        const finalText = "Okay, i will remember that my name is "+Explodion.name;
        speech.text = finalText;
    }

    else if(message.includes('what is my location') || message.includes('where am i') || message.includes('find my location')) {
        const finalText = "As per Google Maps, it seems that you are in "+geoplugin_city()+", "+geoplugin_region()+" in "+geoplugin_countryName();
        speech.text = finalText;
        window.open("https://www.google.com/maps/search/Where+am+I+?/", "_blank");
    }

    else if(message.includes('who has the best onlyfans')) {
        const finalText = "Lohit";
        speech.text = finalText;
    }

    /*else if(message.includes('make me laugh') || message.includes('tell me a joke')) {
        const getJoke = async() => {
            let joke
            await fetch("https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single")
            .then(response => response.json())
            .then(json =>{
                speech.text = `${json.joke}`;
            });
        }
        getJoke();
    }*/

    /*else if(message.includes('take a screenshot')) {
        const capture = async () => {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            const video = document.createElement("video");
            
            try {
                const captureStream = await navigator.mediaDevices.getDisplayMedia();
                video.srcObject = captureStream;
                context.drawImage(video, 0, 0, window.width, window.height);
                const frame = canvas.toDataURL("image/png");
                captureStream.getTracks().forEach(track => track.stop());
                window.location.href = frame;
            } catch (err) {
                console.error("Error: " + err);
            }
        };

        capture();
        finalText = "Allow to share screen for a screenshto"
    }*/

    /*else if(message.includes('what is the weather in')) {
        places = message.split('in').pop()
        const inputVal = places.replace(" ", ",")
        inputVal.toLowerCase();
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=f4dc5f1fdf6f60490cbe65cfa20fcf28&units=metric`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("testing 1")
            const { main, name, sys, weather } = data;
            let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
            const temperature = Math.round(main.temp)
            const cityName = name
            const countryName = regionNames.of(sys.country)
            console.log("testing 2")
            let finalText = "In "+cityName+", "+countryName+" the temperature is "+temperature+" degrees, and the weather is "+weather[0]["description"]
            console.log("testing 3")
            speech.text = finalText
        })
        .catch(() => {
            console.log("testing 4")
            let finalText = "Please search for a valid city";
            speech.text = finalText
        });
    }*/

    else if(message.includes('open google')) {
        window.open("https://google.com", "_blank");
        const finalText = "Opening Google";
        speech.text = finalText;
    }

    else if(message.includes('open instagram')) {
        window.open("https://instagram.com", "_blank");
        const finalText = "Opening Instagram";
        speech.text = finalText;
    }

    else if(message.includes('open facebook')) {
        window.open("https://facebook.com", "_blank");
        const finalText = "Opening Facebook";
        speech.text = finalText;
    }

    else if(message.includes('what is') || message.includes('who is') || message.includes('what are') || message.includes('when did')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what i found on internet regarding " + message;
        speech.text = finalText;
    }

    else if(message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "_blank");
        const finalText = "This is what i found on wikipedia regarding " + message;
        speech.text = finalText;
    }

    else if(message.includes('time')) {
        const time = new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric"})
        const finalText = time;
        speech.text = finalText;
    }

    else if(message.includes('date')) {
        const date = new Date().toLocaleString(undefined, {month: "short", day: "numeric"})
        const finalText = date;
        speech.text = finalText;
    }

    else if(message.includes('calculator')) {
        window.open('calc/calculator.html')
        const finalText = "Opening Calculator";
        speech.text = finalText;
    }

    else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on google";
        speech.text = finalText;
    }

    speech.volume = 1;
    speech.pitch = 1;
    speech.rate = 1;

    window.speechSynthesis.speak(speech);
}