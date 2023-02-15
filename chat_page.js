//YOUR FIREBASE LINKS
const firebaseConfig = {
  apiKey: "AIzaSyDggD5nWBQ9HSM8bKetSeYnkTBpJz8zmqE",
  authDomain: "chat-app-5b943.firebaseapp.com",
  databaseURL: "https://chat-app-5b943-default-rtdb.firebaseio.com",
  projectId: "chat-app-5b943",
  storageBucket: "chat-app-5b943.appspot.com",
  messagingSenderId: "996797610345",
  appId: "1:996797610345:web:4eb07c2822df7f06cba5f8",
  measurementId: "G-YFV8BY8ELN"
};
firebase.initializeApp(firebaseConfig);
user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");
function send() {
  msg = document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
    name: user_name,
    message: msg,
    like: 0
  });
  document.getElementById("msg").value = "";
}
function getData() {
  firebase.database().ref("/" + room_name).on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      childData = childSnapshot.val();
      if (childKey != "purpose") {
        firebase_message_id = childKey;
        message_data = childData; //Start code
        console.log(firebase_message_id);
        console.log(message_data);
        names = message_data['name'];
        message = message_data['message'];
        like = message_data['like'];
        A1 = "<h4>" + names + "<img class='user_tick' src='tick.png'>";
        A2 = "<h4 class='message_h4'>" + message + "</h4>";
        A3 = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick= 'updateLike(this.id)'>"; A4 = "<span class='glyphicon glyphicon-thumbs-up'> Like : " + like + "</span></button><hr>";
        apple = A1 + A2 + A3 + A4;
        document.getElementById("output").innerHTML += apple;
        //End code 
      }
    });
  });
}
getData();
function updateLike(message_id) {
  T1 = message_id;
  likes = document.getElementById(T1).value;
  updated_likes = Number(likes) + 1;
  console.log(updated_likes);
  firebase.database().ref(room_name).child(message_id).update({ like: updated_likes });
}
function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}