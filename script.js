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
 function addComment(postId) {
  const input = document.getElementById(`comment-${postId}`);
  const text = input.value.trim();
  if (!text) return;

  db.collection("comments").add({
    postId: postId,
    text: text,
    time: firebase.firestore.FieldValue.serverTimestamp()
  });

  input.value = "";
}
function loadComments(postId) {
  const box = document.getElementById(`comments-${postId}`);

  db.collection("comments")
    .where("postId", "==", postId)
    .orderBy("time")
    .onSnapshot(snapshot => {
      box.innerHTML = "";
      snapshot.forEach(doc => {
        box.innerHTML += `<p>💬 ${doc.data().text}</p>`;
      });
    });
}
db.collection("posts").doc(doc.id)
  .collection("comments")
  .orderBy("time")
  .onSnapshot(cmt => {
    const box = document.getElementById("comments-" + doc.id);
    box.innerHTML = "";
    cmt.forEach(c => {
      box.innerHTML += `<p>💬 ${c.data().text}</p>`;
    });
  });
function toggleMenu() {
  const menu = document.getElementById("mainMenu");
  menu.classList.toggle("show");
}

// tự đóng menu khi bấm link
document.querySelectorAll(".menu a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("mainMenu").classList.remove("show");
  });
});



