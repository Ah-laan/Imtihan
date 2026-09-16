requireStudent();
const params=new URLSearchParams(location.search), examId=params.get("id"), exam=getExam(examId), student=getCurrentStudent();
if(!exam){alert("Exam not found.");location.href="student-dashboard.html";}
const identityKey=`barey_identity_${student.id}_${exam.id}`;
let identity=JSON.parse(sessionStorage.getItem(identityKey)||"null");
if(!identity){
 const fullName=prompt("Enter your full three-part name (First, Father, Grandfather):");
 const idNo=prompt("Enter your Student ID number:");
 if(!fullName || fullName.trim().split(/\s+/).length<3 || !idNo || !idNo.trim()){alert("A complete three-part name and Student ID are required before the exam starts.");location.href="student-dashboard.html";}else{identity={fullName:fullName.trim(),idNo:idNo.trim()};sessionStorage.setItem(identityKey,JSON.stringify(identity));}
}
const attemptKey=`barey_attempt_${student.id}_${exam.id}`;
let attempt=JSON.parse(localStorage.getItem(attemptKey)||"null");
if(!attempt){
 attempt={startedAt:Date.now(),answers:{},submitted:false};
 localStorage.setItem(attemptKey,JSON.stringify(attempt));
}
let current=0;
const letters=["A","B","C","D"];
const $=id=>document.getElementById(id);
$("examTitle").textContent=exam.title;
$("subject").textContent=exam.subject;
$("examMeta").textContent=`${exam.grade} · ${exam.questions.length} questions · ${exam.duration} minutes · Pass mark ${exam.passMark}%`;

function renderNav(){
 $("questionNav").innerHTML=exam.questions.map((q,i)=>`<button class="${i===current?"current ":""}${attempt.answers[i]?"answered":""}" onclick="go(${i})">${i+1}</button>`).join("");
}
function renderQuestion(){
 const q=exam.questions[current];
 $("questionNumber").textContent=`Question ${current+1} of ${exam.questions.length}`;
 $("questionText").textContent=q.question;
 $("markBadge").textContent=`${q.marks} ${q.marks===1?"Mark":"Marks"}`;
 $("progressText").textContent=`${current+1} / ${exam.questions.length}`;
 $("progressBar").style.width=`${((current+1)/exam.questions.length)*100}%`;
 $("options").innerHTML=q.options.map((o,i)=>`<label class="option ${attempt.answers[current]===letters[i]?"selected":""}"><input type="radio" name="answer" value="${letters[i]}" ${attempt.answers[current]===letters[i]?"checked":""}><span class="letter">${letters[i]}</span><span>${escapeHtml(o)}</span></label>`).join("");
 document.querySelectorAll('input[name="answer"]').forEach(r=>r.addEventListener("change",()=>{
   attempt.answers[current]=r.value; localStorage.setItem(attemptKey,JSON.stringify(attempt)); renderQuestion(); renderNav();
 }));
 $("prevBtn").disabled=current===0;
 $("nextBtn").textContent=current===exam.questions.length-1?"Submit Exam":"Next →";
 renderNav();
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function go(i){current=i;renderQuestion()}
$("prevBtn").onclick=()=>{if(current>0){current--;renderQuestion()}}
$("nextBtn").onclick=()=>{if(current<exam.questions.length-1){current++;renderQuestion()}else submitExam()}
function submitExam(){
 const unanswered=exam.questions.filter((_,i)=>!attempt.answers[i]).length;
 if(unanswered && !confirm(`You have ${unanswered} unanswered question(s). Submit anyway?`)) return;
 if(!confirm("Are you sure you want to submit the exam?")) return;
 const result=calculateResult();
 const results=getResults().filter(r=>!(r.studentId===student.id&&r.examId===exam.id));
 results.push(result); saveResults(results);
 attempt.submitted=true; localStorage.removeItem(attemptKey);
 localStorage.setItem("barey_last_result",result.id);
 location.href=`result.html?id=${result.id}`;
}
function calculateResult(){
 let total=0,obtained=0,correct=0,wrong=0,unanswered=0;
 exam.questions.forEach((q,i)=>{
   total+=Number(q.marks)||1;
   const a=attempt.answers[i];
   if(!a) unanswered++;
   else if(a===q.correctAnswer){correct++;obtained+=Number(q.marks)||1}
   else wrong++;
 });
 const pct=total?Math.round(obtained/total*10000)/100:0;
 return {id:"R"+Date.now(),studentId:student.id,candidateName:identity.fullName,candidateId:identity.idNo,examId:exam.id,examTitle:exam.title,subject:exam.subject,totalMarks:total,obtainedMarks:obtained,totalQuestions:exam.questions.length,correct,wrong,unanswered,percentage:pct,grade:gradeFor(pct),status:pct>=exam.passMark?"PASS":"FAIL",date:new Date().toISOString(),answers:{...attempt.answers}};
}
let endTime=attempt.startedAt+exam.duration*60000;
function tick(){
 let left=Math.max(0,endTime-Date.now());
 let sec=Math.floor(left/1000),m=Math.floor(sec/60),s=sec%60;
 $("timer").textContent=`${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
 if(left<=600000 && left>599000){$("examAlert").textContent="10 minutes remaining."; $("examAlert").classList.remove("hidden")}
 if(left<=0){clearInterval(timer); alert("Time is up. Your exam will be submitted automatically."); submitExam()}
}
const timer=setInterval(tick,1000);tick();renderQuestion();
