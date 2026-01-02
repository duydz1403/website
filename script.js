function sayHello() {
    document.getElementById("message").innerText =
        "🎉 Chào mừng bạn đến với website cá nhân của mình!";
}
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
    sections.forEach(sec => {
        const top = sec.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            sec.classList.add("show");
        }
    });
});
