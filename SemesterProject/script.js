//registerServiceWorker() // to get the chache data
// First create table
let size = 3; // default size
tableCreate();

let audio
let start_time // recording start time
let notes = [] // notes array that will keep the pushed drum pad nodes
let keys = document.querySelectorAll('.box');
var isRecording = false
var isPlaying = false
let mediaRecorder;
const audioChunks = [] // to get the audio after finish recording
document.getElementById("pauseButton").className = "pause-button-hide"
document.getElementById("recordButton").className = "notRec"
document.getElementById("playButton").className = "stoppedPlay"

keys.forEach(key =>{
    key.addEventListener('click',() => playDrum(key))
})

const keyMap = [...keys].reduce((map, key) =>{
    map[key.dataset.note] = key
    return map
},{})

function tableCreate(){

    for(let i=1; i<= size;i++){
        var tr = document.createElement('tr');
        tr.className = "tRow"
        
        let content = document.createElement('td')
        let padType= content.appendChild(document.createElement('div'))
        padType.className = "pad-title"
        let title = document.createElement('h3')
        title.className = "text-title"
        content.className = "tBox"
        let text = decideContent(padType,i);
        title.textContent = text
        padType.appendChild(title)
        tr.appendChild(content)
        
        for(let j=1; j<=3;j++)
        {
            var td = document.createElement('td')
            td.className = "tBox"
            let pad=td.appendChild(document.createElement('div'))
            pad.className = "box pad-"+i.toString();
            
            addSound(pad,i,j)
            tr.appendChild(td)
        }
        document.getElementById("table").appendChild(tr);
    }
}

function decideContent(div,number){
    if(number == 1){
        div.style.backgroundImage = "url(photos/drumElements/melody.png)";
        return "MELODY";
    }
    else if(number == 2){
        div.style.backgroundImage = "url(photos/drumElements/clap.png)";
        return "CLAP";
    }
    else if(number == 3){
        div.style.backgroundImage = "url(photos/drumElements/ride.png)";
        return "RIDE";
    }
    else if(number == 4){
        div.style.backgroundImage = "url(photos/drumElements/snare.jpg)";
        return "SNARE";
    }
    else if(number == 5){
      div.style.backgroundImage = "url(photos/drumElements/kick.jpg)";
      return "KICK";  
    }
    else if(number == 6){
        div.style.backgroundImage = "url(photos/drumElements/hihat.jpg)";
        return "HI HAT";
    }
    else{
        console.log("title couldnt added")
    }
}

function sizeChanged(){
    var e = document.getElementById("padSize");
    size = parseInt(e.value);
    console.log(size);
    console.log(typeof(size))
    var Table = document.getElementById("table");
    Table.innerHTML = "";
    tableCreate();
    // update keys
    keys = document.querySelectorAll('.box');
    keys.forEach(key =>{
        key.addEventListener('click',() => playDrum(key))
    })
    // update keys
}

function addSound(pad,row,column){
    if(row == 1){
        pad.dataset.note = "melodi"+(column).toString()
    }
    else if(row == 2){
        pad.dataset.note = "clap"+column.toString()
    }
    else if(row == 3){
        pad.dataset.note = "ride"+column.toString()
    }
    else if(row == 4){
        pad.dataset.note = "snare"+column.toString()
    }
    else if(row == 5){
        pad.dataset.note = "kick"+column.toString()
    }
    else if(row == 6){
        pad.dataset.note = "hihat"+column.toString()
    }
}

function playDrum(key){
    if(isRecording) record(key.dataset.note)
    isPlaying = true
    audio = document.getElementById(key.dataset.note)
    audio.currentTime = 0
    audio.play()
    key.classList.add('active')
    audio.addEventListener('ended', ()=>{
        key.classList.remove('active')
    })
    audio.addEventListener('pause', ()=>{
        key.classList.remove('active')
    })
}

//#region  Record and Save Audio
function controlRecording(){
    if(isRecording == false){
        isRecording = true
        document.getElementById("pauseButton").classList.remove("pause-button-hide")
        document.getElementById("pauseButton").classList.add("pause-button")
        startRecording()
    }
    else{
        document.getElementById("pauseButton").classList.remove("pause-button")
        document.getElementById("pauseButton").classList.add("pause-button-hide")
        isRecording = false
        stopRecording()
    }
}

function startRecording(){
    start_time = Date.now();
    notes = []
    console.log(notes)
    document.getElementById("recordButton").classList.remove("notRec")
    document.getElementById("recordButton").classList.add("Rec")
}

function stopRecording(){
    document.getElementById("recordButton").classList.remove("Rec");
    document.getElementById("recordButton").classList.add("notRec")
}

function pause(){
    if(isPlaying == true){
        audio.pause()
        audio.currentTime = 0
        document.getElementById("recordButton").className = "notRec"
    }
       
}

function record(note){
    notes.push({
        key:note, 
        startTime : Date.now()-start_time
    })
}

function playSong(){
    if(notes.length==0) return;
    console.log(notes)
    notes.forEach(note =>{
        setTimeout(()=>{
            playDrum(keyMap[note.key])
        },note.startTime)
    })
}

//#endregion 