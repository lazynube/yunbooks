// menu bar for smaller screen
const menu = document.getElementById('menu')
const navLinks = document.querySelector('.navLinks')

menu.addEventListener('click', () => {
    navLinks.classList.toggle('active')
})

// sticky navigation bar
const navbar = document.querySelector('.navbar')

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        navbar.classList.add('scrolled')
    } else {
        navbar.classList.remove('scrolled')
    }
})

// Get elements
const loginBtn = document.getElementById('login');
const loginOverlay = document.getElementById('loginOverlay');
const loginClose = document.getElementById('loginClose');
const goToSignUp = document.getElementById('goToSignUp');
const goToLogin = document.getElementById('goToLogin');
const loginForm = document.getElementById('loginForm');
const signUpForm = document.getElementById('signUpForm');


// Show the overlay when login button is clicked
loginBtn.addEventListener('click', function() {
    loginOverlay.style.display = 'flex';
})

// Close the overlay when the close button (×) is clicked
loginClose.addEventListener('click', function() {
    loginOverlay.style.display = 'none';
})

// Close the overlay if the user clicks outside the overlay content
window.addEventListener('click', function(event) {
    if (event.target === loginOverlay) {
        loginOverlay.style.display = 'none';
    }
})

// Switch to Sign Up form
goToSignUp.addEventListener('click', function() {
    loginForm.style.display = 'none';
    signUpForm.style.display = 'block';
});
    
    // Switch to Login form
goToLogin.addEventListener('click', function() {
    signUpForm.style.display = 'none';
    loginForm.style.display = 'block';
});
    

// cart overlay
let cart = []; // This will hold the items added to the cart
let cartTotal = 0; // This will hold the total price of the cart

document.querySelector('#cart').addEventListener('click', () => {
    document.getElementById('cartOverlay').style.display = 'flex'
})

document.getElementById('closeCart').addEventListener('click', () => {
    document.getElementById('cartOverlay').style.display = 'none'
})

// Function to add items to the cart
function addToCart(productElement) {
    const title = productElement.querySelector('#title').innerText;
    const price = parseFloat(productElement.querySelector('#price').innerText);
    const image = productElement.querySelector('.books_card img').src;

    // Check if the product is already in the cart
    const existingProduct = cart.find(item => item.title === title);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({title: title, price: price, quantity: 1, image: image });
    }
    cartTotal += price; // Add price to the total
    renderCart();
    updateCartButton();
}

// Function to render the cart items in the overlay
function renderCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = ''; // Clear the current items

    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
        <li>
            <img src="${item.image}">
            <span> ${item.title} </span><br>
            <span> x${item.quantity} </span><br>
            <span> ₱${item.price * item.quantity.toFixed(2)} </span><br>
            <button class="remove-btn" data-name="${item.title}"> Remove </button>
        </li>
        `
        cartItems.appendChild(li);
    })

    // Update total amount
    const totalAmount = document.getElementById('totalAmount');
    totalAmount.innerText = cartTotal.toFixed(2);
}

// Function to remove an item from the cart
function removeFromCart(title) {
    const productIndex = cart.findIndex(item => item.title === title);
    if (productIndex !== -1) {
        cartTotal -= cart[productIndex].price * cart[productIndex].quantity;
        cart.splice(productIndex, 1)
        renderCart()
        updateCartButton()
    }
}

// Function to clear the cart
function clearCart() {
    cart = [];
    cartTotal = 0;
    renderCart();
    updateCartButton();
}

// Function to update the Cart button to show the number of items in the cart
function updateCartButton() {
    const cartHover = document.querySelector('#cart');

    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartHover.innerHTML = `<img id = "cartIcon" src = "cart.png"> <span><sup>${itemCount}</sup></span>`;
}

// Adding event listeners to the product add-to-cart buttons
document.querySelectorAll('.addBtn').forEach(button => {
    button.addEventListener('click', () => {
        const productElement = button.closest('.books_card'); // Get the product container
        addToCart(productElement);
    });
});

// Adding event listeners to the "Remove" buttons in the cart
document.getElementById('cartItems').addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-btn')) {
        const title = event.target.getAttribute('data-name');
        removeFromCart(title);
    }
});

// function to handle checkout 
function checkout() {
    if (cart.length > 0) {
        alert('Proceeding to checkout. Total amount is $${totalAmount.toFixed(2)}')
        cart = []
        totalAmount = 0
        updateCartButton()
        document.getElementById(cartOverlay).style.display = 'none'
    } else {
        alert('Cart is empty.')
    }
}

// Adding event listeners for the "Clear Cart" and "Close" buttons
document.getElementById('clearCart').addEventListener('click', clearCart);
document.getElementById('.checkout').addEventListener('click', checkout)