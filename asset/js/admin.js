const cookie =document.cookie
function isLogin(){
    if(cookie == undefined || cookie == "" || cookie == null ||  cookie == "username="){
      return false;
    }
    else{
      return true;
    }
  }
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

const editbtn = document.querySelectorAll('.fa-pen-to-square');
editbtn.forEach(btn=>{
    btn.addEventListener('click', function(){
        console.log("masuk")
        const popup = Swal.mixin({
            customClass: {
              confirmButton: "sweet-btn confirm",
              cancelButton : "sweet-btn cancel"
            },
        
            // cancelButtonColor : "white",
            buttonsStyling: false,
        
          });
          popup.fire({
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
    })
})

