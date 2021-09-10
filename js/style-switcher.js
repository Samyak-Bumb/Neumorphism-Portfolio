const styleSwitcherToggler = document.querySelector(".style-switcher-toggler");
styleSwitcherToggler.addEventListener("click",()=>{
    document.querySelector(".style-switcher").classList.toggle("open")
});
window.addEventListener("scroll",()=>{
    if(document.querySelector(".style-switcher").classList.contains("open")){
        document.querySelector(".style-switcher").classList.remove("open");
    }
});
const alternateStyles = document.querySelectorAll(".alternate-style");
function setActiveColor(color){
    localStorage.setItem("color",color);
    changeColor();
}
function changeColor(){
    alternateStyles.forEach((style)=>{
        if(localStorage.getItem("color") === style.getAttribute("title")){
            style.removeAttribute("disabled");
        }else{
            style.setAttribute("disabled","true");
        }
    })
}
if(localStorage.getItem("color") !== null){
    changeColor();
}
const nightDay = document.querySelector(".night-day");
nightDay.addEventListener("click",()=>{
    document.body.classList.toggle("dark");
    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme","dark")
    }else{
        localStorage.setItem("theme","light")
    }
    updateIcon();
});
function themeMode(){
    if(localStorage.getItem("theme") !== null){
        if(localStorage.getItem("theme") === "light"){
            document.body.classList.remove("dark")
        }
        else{
            document.body.classList.add("dark")
        }
    }
    updateIcon()
}
themeMode();
function updateIcon(){
    if(document.body.classList.contains("dark")){
        nightDay.querySelector("i").classList.remove("bxs-moon");
        nightDay.querySelector("i").classList.add("bxs-sun");
    }
    else{
        nightDay.querySelector("i").classList.remove("bxs-sun");
        nightDay.querySelector("i").classList.add("bxs-moon");
    }
}
// window.onload = ()=>{
//     if(document.body.classList.contains("dark")){
//         nightDay.querySelector("i").classList.remove("bxs-moon");
//         nightDay.querySelector("i").classList.add("bxs-sun");
//     }else{
//         nightDay.querySelector("i").classList.remove("bxs-sun");
//         nightDay.querySelector("i").classList.add("bxs-moon");
//     }
// }
