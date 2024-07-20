const carts = JSON.parse(localStorage.getItem('cart')) || [];

function populateCart() {
    const cartItemsContainer = document.querySelector('.cart-content');
    let cartContent = "";
    carts.forEach((item, index) => {
        cartContent += `
            <div class="tr cart-row">
                <div class="products">
                    <input type="checkbox" class="item-checkbox" data-index="${index}">
                    <img src="${item.imageUrl}" alt="">
                    <div>
                        <h1>Risoles</h1>
                        <h3 class="item-title">${item.title}</h3>
                        <i class="fa-solid fa-heart"></i>
                        <i class="fa-solid fa-trash" data-index="${index}"></i>
                    </div>
                </div>
                <div class="item-detail">
                    <h1 class="price cart-price">
                        Rp${item.price}
                    </h1>
                    <div class="counter">
                        <i class="fa-solid fa-minus"></i>
                        <h1 class="quantity cart-quantity-input">${item.quantity}</h1>
                        <i class="fa-solid fa-plus"></i>
                    </div>
                </div>
            </div>
        `;
    });
    cartItemsContainer.innerHTML = cartContent;

    // Call the function to add event listeners to newly created elements
    addEventListeners();
}

function addEventListeners() {
    const minusBtn = document.querySelectorAll('.fa-minus');
    const plusBtn = document.querySelectorAll('.fa-plus');
    let displayValues = document.querySelectorAll('.quantity');
    const checkboxItem = document.querySelectorAll('.item-checkbox');
    const itemTitle = document.querySelectorAll(".item-title");
    let cartTotalPrice = document.querySelector('.cart-total-price');
    const selectAllCheckbox = document.getElementById('selectAll');
    const purchase = document.querySelector('.btn-purchase');
    const trashBtn = document.querySelectorAll('.fa-trash');

    displayValues.forEach((displayValue, index) => {
        let item = carts.find(cart => cart.title === itemTitle[index].textContent);
        selectAllCheckbox.addEventListener('click', () => {
            if (selectAllCheckbox.checked == true) {
                checkboxItem.forEach(checkbox => {
                    checkbox.checked = true;
                });
                updateCartTotal();
            } else {
                checkboxItem.forEach(checkbox => {
                    checkbox.checked = false;
                });
                updateCartTotal();
            }
        });
        checkboxItem[index].addEventListener('click', function () {
            updateCartTotal();
        });
        minusBtn[index].addEventListener('click', function () {
            displayValue.textContent = parseInt(displayValue.textContent) - 1;
            if (parseInt(displayValue.textContent) <= 0) {
                displayValue.textContent = 0;
            }
            if (checkboxItem[index].checked == true) {
                updateCartTotal();
            }
        });
        plusBtn[index].addEventListener('click', function () {
            displayValue.textContent = parseInt(displayValue.textContent) + 1;
            if (checkboxItem[index].checked == true) {
                updateCartTotal();
            }
        });

        trashBtn[index].addEventListener('click', function () {
            removeCartItem(index);
        });
    });

    purchase.addEventListener('click', function () {
        purchaseClicked();
    });
}

function removeCartItem(index) {
    carts.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(carts));
    populateCart();
    updateCartTotal();
}

function updateCartTotal() {
    let total = 0;
    const cartRows = document.querySelectorAll('.cart-row');
    cartRows.forEach(row => {
        const checkbox = row.querySelector('.item-checkbox');
        if (checkbox.checked) {
            const price = parseFloat(row.querySelector('.cart-price').textContent.replace('Rp', ''));
            const quantity = parseInt(row.querySelector('.cart-quantity-input').textContent);
            total += price * quantity;
        }
    });
    document.querySelector('.cart-total-price').textContent = `Rp ${total}`;
}

function purchaseClicked() {
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
          title: `Thank you for your purchase!  `
        });
    // Clear the carts array and update local storage
    carts.length = 0;
    localStorage.setItem('cart', JSON.stringify(carts));
    // Clear the cart items from the UI
    populateCart();
    // Reset the total price
    document.querySelector('.cart-total-price').textContent = 'Rp 0';
}

// Populate the cart when the document is loaded
window.onload = populateCart;