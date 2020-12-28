//registerServiceWorker() // to get the chache data
// First create table
let size = 3; // default size
tableCreate();

let keys = document.querySelectorAll('.box');
console.log(keys)
var isRecording = false;

const audioChunks = [] // to get the audio after finish recording
document.getElementById("recordButton").className = "notRec"
document.getElementById("table")
keys.forEach(key =>{
    key.addEventListener('click',() => playDrum(key))
})

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
    console.log("key pressed:");
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
    keyPad.animate({ background: ["yellow", "cyan"] }, 500)
}

//#region  Record and Save Audio
function record(){
    if(navigator.mediaDevices){
        let mediaRecorder;
        navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);

            if(!isRecording){
                console.log(mediaRecorder)
                startRecording(mediaRecorder)
                isRecording = true
                console.log("KAYIT SONRASI BİLGİSİ")
                console.log(mediaRecorder)
            }
            else{
                document.getElementById("recordButton").classList.remove("Rec");
                document.getElementById("recordButton").classList.add("notRec")
                isRecording = false

                
                const audioBlob = new Blob(audioChunks);
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);
                const play = () => audio.play();
            }

        });
    }
}

function startRecording(mediaRecorder){
    mediaRecorder.start()
    document.getElementById("recordButton").classList.remove("notRec");
    document.getElementById("recordButton").classList.add("Rec")
    console.log("START RECORDING :");
    console.log(mediaRecorder.state)
    
    mediaRecorder.addEventListener("dataavailable", event => {
      audioChunks.push(event.data)
    });
}

function stopRecording(mediaRecorder){
    
    mediaRecorder.stop();
    document.getElementById("recordButton").classList.remove("Rec");
    document.getElementById("recordButton").classList.add("notRec")
    saveRecording()
    
    console.log(mediaRecorder.state)
}

function saveRecording(mediaRecorder){
    if(mediaRecorder.state == "recording"){
        // ask to user save recording
    }
}


//#endregion 