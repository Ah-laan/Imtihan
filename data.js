const DEFAULT_STUDENTS = [
 {id:"ST001",name:"Ahmed Ali",grade:"Grade 12",section:"A",password:"1234"},
 {id:"ST002",name:"Fatima Hassan",grade:"Grade 12",section:"A",password:"1234"},
 {id:"ST003",name:"Mohamed Ibrahim",grade:"Grade 12",section:"B",password:"1234"},
 {id:"ST004",name:"Asha Noor",grade:"Grade 11",section:"A",password:"1234"},
 {id:"ST005",name:"Abdi Yusuf",grade:"Grade 11",section:"B",password:"1234"},
 {id:"ST006",name:"Hodan Omar",grade:"Grade 10",section:"A",password:"1234"},
 {id:"ST007",name:"Ali Warsame",grade:"Grade 10",section:"A",password:"1234"},
 {id:"ST008",name:"Maryan Abdullahi",grade:"Grade 9",section:"A",password:"1234"},
 {id:"ST009",name:"Said Ahmed",grade:"Grade 9",section:"B",password:"1234"},
 {id:"ST010",name:"Rahma Ismail",grade:"Grade 12",section:"B",password:"1234"}
];

const DEFAULT_EXAMS = [
 {id:"BIO01",title:"Biology Test",subject:"Biology",grade:"Grade 12",duration:40,passMark:50,published:true,
 questions:[
  ["What is the basic unit of life?","Tissue","Cell","Organ","System","B",1],
  ["Which organelle is responsible for photosynthesis?","Mitochondria","Chloroplast","Ribosome","Nucleus","B",1],
  ["Which molecule carries genetic information?","Protein","Lipid","DNA","Glucose","C",1],
  ["What process do plants use to make food?","Respiration","Photosynthesis","Digestion","Transpiration","B",1],
  ["Which gas is released during photosynthesis?","Carbon dioxide","Nitrogen","Oxygen","Hydrogen","C",1],
  ["What is the powerhouse of the cell?","Nucleus","Mitochondrion","Cell wall","Vacuole","B",1],
  ["Which blood cells fight infection?","Red blood cells","White blood cells","Platelets","Plasma","B",1],
  ["Which organ pumps blood around the body?","Lung","Kidney","Heart","Liver","C",1],
  ["What is the largest organ of the human body?","Heart","Skin","Liver","Brain","B",1],
  ["Which vitamin is mainly produced in skin by sunlight?","Vitamin A","Vitamin B","Vitamin C","Vitamin D","D",1]
 ].map(q=>({id:crypto.randomUUID(),question:q[0],options:q.slice(1,5),correctAnswer:q[5],marks:q[6]}))},
 {id:"MATH01",title:"Mathematics Test",subject:"Mathematics",grade:"Grade 12",duration:30,passMark:50,published:true,
 questions:[
  ["What is 2 + 2?","3","4","5","6","B",1],
  ["What is 5 × 6?","11","25","30","36","C",1],
  ["What is the square root of 81?","7","8","9","10","C",1],
  ["What is 10% of 200?","10","20","30","40","B",1],
  ["If x + 5 = 12, what is x?","5","6","7","8","C",1],
  ["What is the value of π approximately?","2.14","3.14","4.14","5.14","B",1],
  ["A triangle has how many sides?","2","3","4","5","B",1],
  ["What is 12²?","124","144","154","164","B",1],
  ["What is 100 ÷ 4?","20","25","30","40","B",1],
  ["What is the perimeter of a square with side 5?","10","15","20","25","C",1]
 ].map(q=>({id:crypto.randomUUID(),question:q[0],options:q.slice(1,5),correctAnswer:q[5],marks:q[6]}))}
];

function initData(){
 if(!localStorage.getItem("barey_students")) localStorage.setItem("barey_students",JSON.stringify(DEFAULT_STUDENTS));
 if(!localStorage.getItem("barey_exams")) localStorage.setItem("barey_exams",JSON.stringify(DEFAULT_EXAMS));
 if(!localStorage.getItem("barey_results")) localStorage.setItem("barey_results","[]");
}
initData();
function getStudents(){return JSON.parse(localStorage.getItem("barey_students")||"[]")}
function getExams(){return JSON.parse(localStorage.getItem("barey_exams")||"[]")}
function saveExams(x){localStorage.setItem("barey_exams",JSON.stringify(x))}
function getResults(){return JSON.parse(localStorage.getItem("barey_results")||"[]")}
function saveResults(x){localStorage.setItem("barey_results",JSON.stringify(x))}
function getExam(id){return getExams().find(e=>e.id===id)}
function gradeFor(p){return p>=90?"A+":p>=80?"A":p>=70?"B":p>=60?"C":p>=50?"D":"F"}
