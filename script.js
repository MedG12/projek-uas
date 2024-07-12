const btn = document.querySelectorAll(".radio-btn");  
const image = document.querySelectorAll(".slide"); 


//sliding image secara manual
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
    stock :  0,
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
    stock :  0,
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

localStorage.setItem("products", JSON.stringify(Default_products));

let products = JSON.parse(localStorage.getItem("products"));
//add to cart function
function addCart(item){
    let product_cart = products.find(product=>product.title == item);
    cart.push(product_cart);
    console.log(cart)
    if(product_cart.stock ==0 ){
      document.querySelector(".popup").style.display = 'block';
      document.querySelector(".overlay").style.opacity = '1';
    }
    
}
//end ad to cart

//Adding item to favorite localsotrage
function like(title){
    products.forEach(product=>{
      if(product.title== title){
        product.fav = true ;
      }
      localStorage.setItem("products",JSON.stringify(products));
    })
}

//end like product

// Start load products
let productsContent = "";
const containerProducts =document.querySelector(".products");

function showProducts(){
    products.forEach(product => {
        let index = 0;
        productsContent += `<div class="card-product">`;
        productsContent += `<div class="photo">`;
        productsContent += `<i onclick="" class="fa-solid fa-heart"></i>`;
        productsContent += `<img src="${product.imageUrl}" alt="">`;
        productsContent += `</div>`;
        productsContent += `<div class="desc-product">`;
        productsContent += `<h1>${product.title}</h1>`;
        productsContent += `<p>${product.desc}</p>`;
        productsContent += `<button onclick="addCart('${product.title}')">Add To cart</button>`
        productsContent += `</div>`;
        productsContent += `</div>`;     
        index++;
    });
    containerProducts.innerHTML = productsContent;
}
document.onload = showProducts();

const likeBtn = document.querySelectorAll('.fa-heart');
for(let i = 1; i<likeBtn.length;i++){
  
  likeBtn[i].addEventListener('click',function(){
    if(this.className.includes('liked')){
      products[i-1].fav =  false;
      this.classList.remove('liked');
    }
    else{
      products[i-1].fav =  true;
      this.classList.add("liked")
    };
    localStorage.setItem("products", JSON.stringify(products)); 
  });
}
// end load products

