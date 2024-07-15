document.addEventListener('DOMContentLoaded', ready);

function ready() {
    const selectAllCheckbox = document.getElementById('selectAll');
    let itemCheckboxes;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Populate cart items initially
    populateCart();

    // Add event listeners
    document.querySelectorAll('.btn-danger').forEach(button => {
        button.addEventListener('click', removeCartItem);
    });

    document.querySelectorAll('.cart-quantity-input').forEach(input => {
        input.addEventListener('change', quantityChanged);
    });

    document.querySelector('.btn-purchase').addEventListener('click', purchaseClicked);

    selectAllCheckbox.addEventListener('click', () => {
        itemCheckboxes.forEach(checkbox => {
            checkbox.checked = selectAllCheckbox.checked;
        });
        updateCartTotal();
    });

    function populateCart() {
        const cartItemsContainer = document.querySelector('.cart-items');
        cartItemsContainer.innerHTML = ''; // Clear existing items

        cart.forEach(item => {
            const cartRow = document.createElement('tr');
            cartRow.classList.add('cart-row');
            cartRow.innerHTML = `
                <td class="cart-item cart-column">
                    <input product-name="${item.title}" type="checkbox" class="item-checkbox">
                </td>
                <td class="cart-item cart-column">
                    <img class="cart-item-image" src="${item.imageUrl}" width="50" height="50">
                    <span class="cart-item-title">${item.title}</span> 
                </td>
                <td class="cart-item cart-column">
                    <span class="cart-price">${item.price}</span>
                </td>
                <td class="cart-item cart-column">
                    <input class="cart-quantity-input" type="number" value="${item.quantity}" style="width: 50px">
                    <button class="btn btn-danger" type="button">Remove</button>
                </td>
            `;
            cartItemsContainer.appendChild(cartRow);
        });

        itemCheckboxes = document.querySelectorAll('.item-checkbox');

        updateCartTotal();
    }

    function removeCartItem(event) {
        const button = event.target;
        const title = button.parentElement.parentElement.querySelector('.cart-item-title').textContent;

        // Remove from UI
        button.parentElement.parentElement.remove();

        // Remove from cart array
        cart.splice(cart.findIndex(item => item.title === title), 1);

        // Update local storage and totals
        updateCartTotal();
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function quantityChanged(event) {
        const input = event.target;
        const title = input.parentElement.parentElement.querySelector('.cart-item-title').textContent;
        const newQuantity = parseInt(input.value);

        // Update cart array with new quantity
        const itemIndex = cart.findIndex(item => item.title === title);
        if (itemIndex !== -1) {
            cart[itemIndex].quantity = newQuantity;
        }

        // Update local storage and totals
        updateCartTotal();
        localStorage.setItem('cart', JSON.stringify(cart));
    }

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

    function purchaseClicked() {
        alert('Thank you for your purchase!!!');
        const cartItemsContainer = document.querySelector('.cart-items');
        cartItemsContainer.innerHTML = ''; // Clear all items

        cart.length = 0; // Clear cart array
        updateCartTotal();
        localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
    }
}