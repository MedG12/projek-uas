const users = JSON.parse(localStorage.getItem("users"));

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function validate(){
    const username = document.querySelector(".Username").value;
    const password = document.querySelector(".Password").value;
    const user = users.find(user =>user.username.toLowerCase() ==  username.toLowerCase().trim());
    if(user != null || user != undefined){
      if(password == user.password){
        console.log('masuk')
        setCookie("username",username,3);
        window.location.href = "index.html"
      }
    }else{

    }
}

