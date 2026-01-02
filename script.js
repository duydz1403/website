function sayHello() {
    document.getElementById("message").innerText =
        "🎉 Chào mừng bạn đến với website cá nhân của mình!";
    document.getElementById("darkToggle").onclick = () => {
    document.body.classList.toggle("dark");
};
    
}
