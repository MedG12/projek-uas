//sliding image secara manual
const btn = document.querySelectorAll(".radio-btn");  
const image = document.querySelectorAll(".slide"); 
function currentSlide(number){ 
  if(number == 0){
    btn[1].classList.remove("active-btn");
    btn[0].className += " active-btn" ;
    image[0].style.marginLeft= "0";

  }else if(number == 1){
    btn[0].classList.remove("active-btn");
    btn[1].className += " active-btn";
    image[0].style.marginLeft= "-50%";

  }
}

// sliding image secara otomatis
let counter=0;
setInterval(function(){
  currentSlide(counter);
  counter++;
  if(counter>1){
    counter=0;
  }
},3000)


//add to cart function
function addCart(itemTitle) {
  let carts = JSON.parse(localStorage.getItem("cart")) || [];
  const productToAdd = products.find(product => product.title === itemTitle);
  
  if (isLogin("user")) {
    //check if products exist
    if (productToAdd){
      let cart = carts.find(cart => cart.title == itemTitle)
      //check if item is already on cart table
      if(cart){
        cart.quantity +=1;
      }else{
        productToAdd.quantity = 1;
        carts.push(productToAdd);
      }
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
        });
        Toast.fire({
          icon: "success",
          title: `Adding ${itemTitle} to Cart`
        });
      localStorage.setItem("cart", JSON.stringify(carts));
    }else{
      alert("Product not found!");
    }
  }else {
    location.href= "login.html"
  }
}
//end ad to cart


//Adding favorite to localsotrage
function like(title){
    products.forEach(product=>{
      if(product.title== title){
        product.fav = true ;
      }
      localStorage.setItem("products",JSON.stringify(products));
    })
}
//end adding favorite

// Start load products

let productsContent = "";
const containerProducts =document.querySelector(".products");

function showProducts(){
    products.forEach(product => {
        productsContent += `<div class="card-product">`;
        productsContent += `<div class="photo">`;
        productsContent += `<i onclick="" class="fa-solid fa-heart ${isLogin("user")? product.fav== true? "liked":"" :""}"></i>`;
        productsContent += `<img src="${product.imageUrl}" alt="">`;
        productsContent += `</div>`;
        productsContent += `<div class="desc-product">`;
        productsContent += `<h1>${product.title}</h1>`;
        productsContent += `<p>${product.desc}</p>`;
        productsContent += `<button onclick="addCart('${product.title}')">Add To cart</button>`
        productsContent += `</div>`;
        productsContent += `</div>`;     
    });
    containerProducts.innerHTML = productsContent;
}
document.onload = showProducts();
// end load products

// like function---> addd to favorite
const likeBtn = document.querySelectorAll('.fa-heart');
for(let i = 0; i<likeBtn.length;i++){
  likeBtn[i].addEventListener('click',function(){
    if(this.className.includes('liked')){
      products[i-1].fav =  false;
      this.classList.remove('liked');
    }
    else{
      if(isLogin("user")){
        products[i-1].fav =  true;
        this.classList.add("liked");
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
          });
          Toast.fire({
            icon: "success",
            title: "Add to Favorite"
          });
      }else{
        window.location.href = "login.html";
      }

    };
    localStorage.setItem("products", JSON.stringify(products)); 
  });
}
//end like function
