// Dark mode
document.getElementById("darkToggle").onclick = () => {
    document.body.classList.toggle("dark");
};

// Scroll animation
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            el.classList.add("show");
        }
    });
});
// 🔥 Firebase config (DÁN CỦA BẠN VÀO ĐÂY)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 📝 Đăng bài
function addPost() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  if (!title || !content) {
    alert("Nhập đủ nội dung");
    return;
  }
  function savePost(title, content, imageUrl) {
  db.collection("posts").add({
    title: title,
    content: content,
    imageUrl: imageUrl,
    likes: 0,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });

  // Xóa ô nhập sau khi đăng
  document.getElementById("title").value = "";
  document.getElementById("content").value = "";
  document.getElementById("image").value = "";
}


  db.collection("posts").add({
    title: title,
    content: content,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });

  document.getElementById("title").value = "";
  document.getElementById("content").value = "";
}

// 📥 Lấy bài cho mọi người
db.collection("posts")
  .orderBy("createdAt", "desc")
  .onSnapshot(snapshot => {
    const postsDiv = document.getElementById("posts");
    postsDiv.innerHTML = "";

    snapshot.forEach(doc => {
      const post = doc.data();
      postsDiv.innerHTML += `
        <div class="post">
          <h3>${post.title}</h3>
          <p>${post.content}</p>
        </div>
      `;
    });
  });
