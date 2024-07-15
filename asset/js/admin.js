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

if(isLogin("admin")){
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

//show products item in local storage
const products = JSON.parse(localStorage.getItem("products"));
let productsContent = "";
const containerProducts =document.querySelector(".products");

function showProducts(){
    products.forEach(product => {
        productsContent += `<div class="card-product">`;
        productsContent += `<div class="photo">`;
        productsContent += `<i class="fa-regular fa-pen-to-square"></i>`;
        productsContent += `<img src="${product.imageUrl}" alt="">`;
        productsContent += `</div>`;
        productsContent += `<div class="desc-product">`;
        productsContent += `<h1>${product.title}</h1>`;
        productsContent += `<p>${product.desc}</p>`;
        productsContent += `</div>`;
        productsContent += `</div>`;     
    });
    containerProducts.innerHTML = productsContent;
}
document.onload = showProducts();
//end show products item in local storage


//admin edit products 
const editbtn = document.querySelectorAll('.fa-pen-to-square');

editbtn.forEach((btn,index)=>{
    btn.addEventListener('click', function(){
        if(isLogin("admin")){;
          const popup = Swal.mixin({
              customClass: {
                confirmButton: "sweet-btn",
                cancelButton : "sweet-btn "
              },
              buttonsStyling: false,
          
            });
            popup.fire({
              titleText : "Edit Poducts",
              showCancelButton: true,
              confirmButtonText : "Save",
              cancelButtonText : "Cancel",
              focusConfirm : false,
              padding: "30px",
              html :
                `
                <label>Title</label>
                <input class = "product-title" value="${products[index].title}"> <br>
                <label>Description</label>
                <input class = "product-desc" value="${products[index].desc}"> <br>
                <label>ImageUrl</label> 
                <input class = "product-img" value="${products[index].imageUrl}"> <br> 
                <label>Price</label>
                <input class = "product-price" value="${products[index].price}"> <br> 
                <label>Stock</label>
                <input class = "product-stock" value="${products[index].stock}"> 
                `
            }).then((result)=>{
              console.log(products[index]);
              let title = document.querySelector('.product-title');
              let desc  = document.querySelector('.product-desc');
              let img  = document.querySelector('.product-img');
              let stock  = document.querySelector('.product-stock');
              let price  = document.querySelector('.product-price');
              if(result.isConfirmed){
                products[index].title = title.value;
                products[index].desc = desc.value;
                products[index].imageUrl = img.value;
                products[index].stock = stock.value;
                products[index].price = price.value;
                localStorage.setItem("products",JSON.stringify(products));
                location.reload();
              }
            })
        }else{
          location.href="login.html";
        }
    })
})
//end admin edit products
