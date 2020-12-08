"use strict";
class Student {
    constructor(id, name, gpa, ...list) {
        if (!id) throw "Undefined Student id"
        this.id = id; this.name = name;
        this.gpa = gpa.padEnd(4,'0'); 
        this.list = list
    }
    toString() {
        return this.id+' '+this.name+' '+this.gpa
    }
    static fromString(s) {
        return new Student(...s.split('\t'))
    }
}
class Course { //implement this
    constructor(id, time, date, ...rooms) {
        if (!id) throw "Undefined Course id"
        this.id = id;
        this.time = time
        this.date = date
        this.rooms = rooms
    }
    toString() {
        return this.id + ' ' + this.time + ' ' + this.date
    } 
    static fromString(s) {
        return new Course(...s.split('\t'))
    }
}

function report(msg, id, list) {
    msg += " "; let txt = "<br>\n"+msg;
    if (id) {
        msg += id; txt += "<span class=link>"+id
        if (list)  txt += "<span class=liste>"
                    +list.join("<br>")+"</span>"
        txt += "</span>"
    }
    console.log(msg); out.innerHTML += txt; 
}
const stdMap = new Map(), crsMap = new Map(); //global

function makeData(txt, Maker, map) {
    map.clear()
    for (let line of txt.split('\n')) {
        if (!line) continue
        let std = Maker.fromString(line)
        map.set(std.id, std)
    }
    report(map.size+" items");
    return map;
}
function doClick(evt) {
    let s = evt.target.innerText;
    //if s contains only digits
    if (/^\d+$/.test(s)) showStudent(s); 
}
function showStudent(id) {
    let std = stdMap.get(id);
    if (!std) return report(id+" not found");
    let t = std.toString()
    report(t, "("+std.list.length+" courses)", std.list);
    return std
}
function showCourse(id) {
    id = id.toUpperCase();
    let a = [];
    for (let std of stdMap.values()) 
        if (std.list.includes(id)) 
            a.push(std.id+" "+std.name);
    if (a.length > 0){
        report(id+": ", a.length+" students", a);
        report("time: " + crsMap.get(id).time + "\ndate: " +  crsMap.get(id).date)
    }
        
    else report("No students in "+id);
    return a
}


function studentExamSchedule(id)
{
    let studentExists = false;
    for (let std of stdMap.values()){
        if (std.id == id){
            studentExists = true;    
            report(std.name+"'s Courses:\n")
            console.log(std.list)
            for (let x of std.list) {
                for (let crs of crsMap.values()) {
                        if(x == crs.id)
                            report(crs.id + " " +crs.time + " " + crs.date)
                }
            }
            return
        }
    } 
    
    if(!studentExists){
        report("There is no student with this ID ("+id+")");
    }
}
function courseStudents(id){
    let studentExists = false;
    report(id+"'s Students : \n")
    for (let std of stdMap.values()){
        if (std.list.includes(id)){
            studentExists = true;
            report(std.id+" "+std.name);
        } 
    }
    if(!studentExists){
        report("There is no student in this course ("+id+")")
    }
}
function examCourseList(id){
    let courseExists = false;
    report(id+" exam room courses : \n")
    for (let crs of crsMap.values()) {
        for (let x of crs.rooms) {
            if(id == x){
                courseExists= true;
                report(crs.id)
            }
        }   
    }
    if(!courseExists){
        report("There is no courses in this exam room\n")
    }
}
function roomCoursesNumber(id){
    let number = 0
    for (let crs of crsMap.values()) {
        for (let x of crs.rooms) {
            if(id == x){
                number++
            }
        }   
    }
    totalCourseNumber.innerText += ' '+number+ " courses"
    report(number)
}
function extraQuery(date){
    // This query gets the students avarage gpa from classes' in a certain date 
    let sum = 0 
    let count = 0
    for (let c of crsMap.values()) {
        if(c.date == date ){
            for (let s of stdMap.values()){
                if(s.list.includes(c.id)){
                    //console.log(s.gpa)
                    sum += Number(s.gpa)
                    count++
                }
            }
        }
    }
    
    avarage.innerText += ' '+(sum/count).toFixed(2)
    //report("Avarage gpa is : "+sum/count)
}

function question2(){
    let keys = []; 
    for (let x of stdMap.values()) {
        keys.push(x.id)
    }
    let number = 215170000;
    // for key and map 
    let number1 = number;
    let number2 = number;
    // total match count for key and map
    let totalMatch = 0;
    let totalMatch1 = 0;
    
    var first =  Date.now();
    let counter1 = 0
    while(counter1 <= 10000){
        
        if(keys.includes(number1.toString())){
            totalMatch++;
        }
        number1++
        counter1++
    }
    report(totalMatch+" students has found in student id's (KEYS) \n")
    let time = (Date.now()-first)
    report("HAS LOOPED IN TIME(KEYS) :",time)

    let counter2 = 0
    var first1 = Date.now();
    while(counter2 <= 10000){
        if(stdMap.has(number2.toString())){
            totalMatch1++;
        }
        number2++
        counter2++
    } 
    report(totalMatch1+" students has found in student id's (MAP) \n")
    let time1 = (Date.now()-first1)
    report("HAS LOOPED IN TIME(MAP) :",time1)

}

const LINK = "https://maeyler.github.io/JS/data/"
function readStudents() {
    fetch(LINK+"Students.txt").then(r => r.text())
    .then(t => makeData(t, Student, stdMap))
}
function readCourses() {
    fetch(LINK+"Courses.txt").then(r => r.text())
    .then(t => makeData(t, Course, crsMap))
}
title.innerText = document.title
sample.innerText = studentExamSchedule+"\n"+courseStudents+
                "\n"+examCourseList+"\n"+roomCoursesNumber+
                "\n"+extraQuery+"\n"+question2
readStudents(); readCourses();