
// response block
const responseShow = document.querySelector(".js-showResponse");
const responseTime = 2000;

const showResponse = (message) => {
    responseShow.classList.add("active");
    responseShow.textContent = message;
    setTimeout(function () {
        responseShow.classList.remove("active");
    }, responseTime);
}