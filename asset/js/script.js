const cookie= document.cookie;
const username= cookie.replace("username=","")
const getUsers =  JSON.parse(localStorage.getItem("users"));

//check if user login or not as a require role
function isLogin(role){
  const user = getUsers.find(user=>user.username.toLowerCase() == username.toLowerCase())
  if(cookie == undefined || cookie == "" || cookie == null ||  cookie == "username="){
    return false;
  }
  else{
    if(user.role==role){
      return true;
    }
    else{
      return false;
    }
  }
}
//end login check

//logging out user
function logout(){
  const swalwithCss = Swal.mixin({
    customClass: {
      confirmButton: "sweet-btn confirm",
      cancelButton : "sweet-btn cancel"
    },
    buttonsStyling: false,

  });
  swalwithCss.fire({
    titleText : "Are you sure want to log out?",
    showCancelButton: true,
    confirmButtonText : "Yes",
    cancelButtonText : "No",
    focusConfirm : false,
    padding: "30px"
  }).then((result)=>{
    if(result.isConfirmed){
      document.cookie = "username=";
      location.reload();
    }
  })
}
// end logging out 

// display username login
const usernameBox = document.querySelector('.username');
const user = document.querySelector('.user');
const loginUser = document.querySelector('.dropdown');

if(isLogin("user")){
  usernameBox.innerHTML = username;
  user.style.display = "none";
  loginUser.style.display = "block"
}else{
  user.style.display = "block";
  loginUser.style.display = "none"
}
//end display username

const dropbtn = document.querySelectorAll(".dropbtn");
const myContent = document.querySelector(".dropdown-content");
// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    myContent.style.display = "none";
  }
}
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
dropbtn.forEach(btn=>{
  btn.addEventListener('click',function(){
    
    if(myContent.style.display == "block"){
      myContent.style.display = "none";
    }else{
      myContent.style.display = "block";
    };
  });
});

// data products
let Default_products = [
  {
    category : 'cookies',
    imageUrl : 'asset/cookies-chocolate.png',
    title : 'Chocolate',
    desc : 'Rich and indulgent, offering a deep cocoa flavor thats perfect for satisfying sweet cravings.',
    stock :  0,
    price : 3000,
    fav : false
  },
  {
    category : 'cookies',
    imageUrl : 'asset/cookies-cheese.png',
    title : 'Cheese',
    desc : 'Combining the savory taste of cheese with a hint of sweetness, creating a unique and addictive snack.',
    stock :  1,
    price : 3000,
    fav : false
  },
  {
    category : 'cookies',
    imageUrl : 'asset/cookies-matcha.png',
    title : 'Matcha',
    desc : 'Features the distinct, earthy flavor of green tea, providing a subtly sweet and slightly bitter taste experience.',
    stock :  0,
    price : 3000,
    fav : false
  },
  {
    category : 'Risoles',
    imageUrl : 'asset/Risoles-mayonaise.png',
    title : 'Mayonaise',
    desc : 'Rich and indulgent, offering a deep cocoa flavor thats perfect for satisfying sweet cravings.',
    stock :  2,
    price : 3000,
    fav : false
  },
  {
    category : 'Risoles',
    imageUrl : 'asset/risoles-ragout.png',
    title : 'Ragout',
    desc : 'Rich and indulgent, offering a deep cocoa flavor thats perfect for satisfying sweet cravings.',
    stock :  0,
    price : 3000,
    fav : false
  },
  {
    category : 'Risoles',
    imageUrl : 'asset/risoles-spicy.png',
    title : 'Spicy',
    desc : 'Rich and indulgent, offering a deep cocoa flavor thats perfect for satisfying sweet cravings.',
    stock :  0,
    price : 3000,
    fav : false
  }
]
const products = JSON.parse(localStorage.getItem("products"));
let users = [
  {
    username:"Muhammad",
    password:"user",
    role : "user"
  },
  {
    username:"ady",
    password:"admin",
    role : "admin"
  }
]
localStorage.setItem("users",JSON.stringify(users));
localStorage.setItem("products", JSON.stringify(products));
