registerServiceWorker() // to get the chache data

const keys = document.querySelectorAll('.box');
var isRecording = false;

keys.forEach(key =>{
    key.addEventListener('click',() => playDrum(key))
})

function playDrum(key){
    addAnimationToPads(key)
    const audio = document.getElementById(key.dataset.note)
    audio.currentTime = 0
    audio.play()
    key.classList.add('active')
    audio.addEventListener('ended', ()=>{
        key.classList.remove('active')
    })
}

function addAnimationToPads(keyPad){
    keyPadColor = {background : ["yellow,green,cyan,magneta,yellow"]}
    keyPad.animate({ background: ["yellow", "cyan"] }, 1000)
}

function record(){
    if(navigator.mediaDevices){
        let mediaRecorder;
        navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);

            if(!isRecording){
                recorder.animate({ background: ["yellow", "cyan"] }, 1000)
                console.log(mediaRecorder)
                startRecording(mediaRecorder)
                isRecording = true
            }
            else{
                stopRecording(mediaRecorder)
                isRecording = false
            }

        });
    }
}

function startRecording(mediaRecorder){
    
    mediaRecorder.start()
    console.log(mediaRecorder.state)
    const audioChunks = []
    mediaRecorder.addEventListener("dataavailable", event => {
      audioChunks.push(event.data)
    });
}

function stopRecording(mediaRecorder){
    if(mediaRecorder.state == "recording"){
        mediaRecorder.stop();
        saveRecording()
    }
    console.log(mediaRecorder.state)
}

function saveRecording(mediaRecorder){
    if(mediaRecorder.state == "recording"){
        // ask to user save recording
    }
}

async function registerServiceWorker(){
    if('serviceWorker' in navigator){
        try{
            await navigator.serviceWorker.register('sw.js')
        }
        catch(e){
            console.log("Service worker registration has failed")
        }
    }
}