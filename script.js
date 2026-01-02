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
  apiKey: "AIzaSyBqPs-bJ6rG1F-hmFQY5sXERDe6xm_mnBg",
  authDomain: "website-9e9c1.firebaseapp.com",
  projectId: "website-9e9c1",
  storageBucket: "website-9e9c1.firebasestorage.app",
  messagingSenderId: "365849339720",
  appId: "1:365849339720:web:adfbce6b9632177c06b57d",
  measurementId: "G-J4816DN8TX"
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
