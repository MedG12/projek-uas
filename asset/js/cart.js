
const carts = JSON.parse(localStorage.getItem('cart')) || [];

// document.addEventListener('DOMContentLoaded', ready);
function populateCart() {
    const cartItemsContainer = document.querySelector('.cart-content');
    let cartContent = "";
    carts.forEach(item => {
        cartContent += `
                <div class="tr">
                    <div class="products">
                        <input type="checkbox" class="item-checkbox">
                        <img src="${item.imageUrl}" alt="">
                        <div>
                            <h1>Risoles</h1>
                            <h3 class="item-title">${item.title}</h3>
                        </div>
                    </div>
                    <div class="item-detail">
                        <h1 class="price">
                            Rp${item.price}
                        </h1>
                        <div class="counter">
                            <i class="fa-solid fa-minus"></i>
                            <h1 class="quantity">${item.quantity}</h1>
                            <i class="fa-solid fa-plus"></i>
                        </div>
                    </div>
                </div>
        `;
    });
    cartItemsContainer.innerHTML = cartContent;
}
document.onload = populateCart();

const minusBtn = document.querySelectorAll('.fa-minus');
const plusBtn = document.querySelectorAll('.fa-plus');
let displayValues = document.querySelectorAll('.quantity');
const checkboxItem = document.querySelectorAll('.item-checkbox')
const itemTitle = document.querySelectorAll(".item-title");
let cartTotalPrice = document.querySelector('.cart-total-price');
const trashBtn = document.querySelectorAll('.fa-trash-can');


const selectAllCheckbox = document.getElementById('selectAll');



displayValues.forEach((displayValue,index)=>{
    let item = carts.find(cart => cart.title == itemTitle[index].textContent)
    selectAllCheckbox.addEventListener('click', () => {
        if(selectAllCheckbox.checked==true){
            checkboxItem.forEach(checkbox => {
                checkbox.checked = true; 
            });
            cartTotalPrice.textContent = eval(`${item.price}*${displayValue.textContent}+${cartTotalPrice.textContent.replace("Rp","")}`);
        }else{
            checkboxItem.forEach(checkbox => {
                checkbox.checked = false;  
            });
        }
    });
    checkboxItem[index].addEventListener('click', function(){
        if(checkboxItem[index].checked == true){
            cartTotalPrice.textContent = eval(`${item.price}*${displayValue.textContent}+${cartTotalPrice.textContent.replace("Rp","")}`);
        }else{
            cartTotalPrice.textContent = eval(`${cartTotalPrice.textContent.replace("Rp","")} - ${item.price}*${displayValue.textContent}`);
        }
    })
    minusBtn[index].addEventListener('click',function(){
        displayValue.textContent = parseInt(displayValue.textContent)-1;
        if(checkboxItem[index].checked==true){
            console.log("masuk");
            if(parseInt(displayValue.textContent)>0){
                cartTotalPrice.textContent  = eval(`${cartTotalPrice.textContent}-${item.price}`)
            }
        }

    });
    plusBtn[index].addEventListener('click',function(){
        displayValue.textContent = parseInt(displayValue.textContent)+1;
        if(checkboxItem[index].checked==true){
            if(parseInt(displayValue.textContent)>0){
                cartTotalPrice.textContent  = eval(`${cartTotalPrice.textContent}+${item.price}`)
            }
        } 
     
    });
    // trashBtn[index].addEventListener('click',function(){
    //     console.log(carts)
    //     carts.splice(index,1);
    //     localStorage.setItem("cart",JSON.stringify("carts"))
    //     console.log(carts)``
    // })
// }

})


function updateCartTotal() {
    let total = 0;
    const cartRows = document.querySelectorAll('.cart-row');
    cartRows.forEach(row => {
        const checkbox = row.querySelector('.item-checkbox');
        if (checkbox.checked) {
            const price = parseFloat(row.querySelector('.cart-price').textContent);
            const quantity = parseInt(row.querySelector('.cart-quantity-input').value);
            total += price * quantity;
        }
    });

    document.querySelector('.cart-total-price').textContent = `Rp ${total}`;
}

// function purchaseClicked() {
//     alert('Thank you for your purchase!!!');
//     const cartItemsContainer = document.querySelector('.cart-items');
//     cartItemsContainer.innerHTML = ''; // Clear all items

//     cart.length = 0; // Clear cart array
//     updateCartTotal();
//     localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
// }
// }