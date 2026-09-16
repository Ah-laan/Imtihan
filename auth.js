function loginStudent(id,password){
 const s=getStudents().find(x=>x.id.toLowerCase()===id.toLowerCase() && x.password===password);
 if(!s) return false;
 localStorage.setItem("barey_current_student",s.id); return true;
}
function getCurrentStudent(){return getStudents().find(s=>s.id===localStorage.getItem("barey_current_student"))}
function requireStudent(){if(!getCurrentStudent()) location.href="login.html"}
function logout(){localStorage.removeItem("barey_current_student"); location.href="index.html"}
document.getElementById("loginForm")?.addEventListener("submit",e=>{
 e.preventDefault();
 const ok=loginStudent(document.getElementById("studentId").value.trim(),document.getElementById("password").value);
 const err=document.getElementById("loginError");
 if(ok) location.href="student-dashboard.html";
 else {err.textContent="Invalid Student ID or password.";err.classList.remove("hidden")}
});

function requireAdmin(){if(sessionStorage.getItem("barey_admin")!=="true")location.href="admin-login.html";}
function adminLogout(){sessionStorage.removeItem("barey_admin");location.href="index.html";}
