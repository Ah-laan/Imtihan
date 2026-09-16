function resultsForStudent(id){return getResults().filter(r=>r.studentId===id)}
function renderStudentDashboard(id){
 const results=resultsForStudent(id), exams=getExams().filter(e=>e.published);
 document.getElementById("availableCount").textContent=exams.length;
 document.getElementById("completedCount").textContent=results.length;
 document.getElementById("averageScore").textContent="—";
 document.getElementById("latestResult").textContent="Hidden";
 document.getElementById("examList").innerHTML=exams.map(e=>`<div class="exam-item"><div><h3>${e.title}</h3><p>${e.subject} · ${e.grade} · ${e.questions.length} questions · ${e.duration} min</p></div><a class="btn primary small" href="exam.html?id=${encodeURIComponent(e.id)}">Start Exam</a></div>`).join("")||'<p class="empty">No exams are currently available.</p>';
}
function renderResultPage(){
 const id=new URLSearchParams(location.search).get("id")||localStorage.getItem("barey_last_result");
 const r=getResults().find(x=>x.id===id); const s=getStudents().find(x=>x.id===r?.studentId); const e=getExam(r?.examId);
 if(!r||!s||!e){location.href="student-dashboard.html";return}
 document.getElementById("examTitle").textContent=r.examTitle;
 document.getElementById("studentLine").textContent=`${r.candidateName||s.name} · ${r.candidateId||s.id} · ${s.grade} · ${r.subject}`;
 ["total","correct","wrong","unanswered"].forEach(k=>document.getElementById(k).textContent=r[k==="total"? "totalQuestions":k]);
 document.getElementById("score").textContent=`${r.obtainedMarks}/${r.totalMarks}`;
 document.getElementById("percentage").textContent=r.percentage+"%";
 document.getElementById("grade").textContent=r.grade;
 document.getElementById("status").textContent=r.status;
 document.getElementById("status").className=r.status==="PASS"?"success-text":"danger-text";
 const letters=["A","B","C","D"];
 document.getElementById("review").innerHTML=e.questions.map((q,i)=>{
   const a=r.answers[i], correct=a===q.correctAnswer;
   return `<div class="review ${correct?"correct":"wrong"}"><div><b>${i+1}. ${escapeHtmlResult(q.question)}</b><p>Your answer: <strong>${a||"Unanswered"}</strong> · Correct answer: <strong>${q.correctAnswer}</strong></p></div><span class="status ${correct?"pass":"fail"}">${correct?"Correct":"Wrong"}</span></div>`
 }).join("");
}
function escapeHtmlResult(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function formatDate(x){return new Date(x).toLocaleString()}
function csvEscape(v){return `"${String(v??"").replace(/"/g,'""')}"`}
function downloadCSV(rows,name){
 const blob=new Blob([rows.map(r=>r.map(csvEscape).join(",")).join("\n")],{type:"text/csv;charset=utf-8"});
 const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=name;a.click();URL.revokeObjectURL(a.href);
}
function exportMyResults(){
 const s=getCurrentStudent(); downloadCSV([["Exam","Subject","Score","Percentage","Grade","Status","Date"],...resultsForStudent(s.id).map(r=>[r.examTitle,r.subject,`${r.obtainedMarks}/${r.totalMarks}`,r.percentage,r.grade,r.status,formatDate(r.date)])],"my-results.csv");
}
function exportAllResults(){downloadCSV([["Candidate Name","Candidate ID","Account ID","Exam","Score","Percentage","Grade","Status","Date"],...getResults().map(r=>{const s=getStudents().find(x=>x.id===r.studentId);return[r.candidateName||s?.name,r.candidateId||"",r.studentId,r.examTitle,`${r.obtainedMarks}/${r.totalMarks}`,r.percentage,r.grade,r.status,formatDate(r.date)]})],"all-results.csv")}
