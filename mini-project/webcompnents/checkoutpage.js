function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    quantityInput.value = parseInt(quantityInput.value) +1;
}

function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput.value >= 1) {
        quantityInput.value = parseInt(quantityInput.value) -1;
    }
}
let cartCount = 0; // Initial cart count

// Function to increase quantity and update cart count
function increaseQuantity() {
    let quantityInput = document.getElementById("quantity");
    let quantityValue = parseInt(quantityInput.value);
    quantityValue++;
    quantityInput.value = quantityValue;
    updateCartCount(quantityValue);  // Update cart count
}

// Function to decrease quantity and update cart count
function decreaseQuantity() {
    let quantityInput = document.getElementById("quantity");
    let quantityValue = parseInt(quantityInput.value);
    if (quantityValue > 0) {  // Ensure quantity doesn't go below 1
        quantityValue--;
        quantityInput.value = quantityValue;
        updateCartCount(quantityValue);  // Update cart count
    }
}
// Function to update cart count based on quantity value
function updateCartCount(quantity) {
    cartCount = quantity;
    document.getElementById('cart-count').textContent = cartCount;
}

// Event Listener for 'Add to Cart' Button
document.querySelector('.add-to-cart').addEventListener('click', function() {
    let quantityValue = parseInt(document.getElementById("quantity").value);
    cartCount += quantityValue;  // Add selected quantity to cart count
    document.getElementById('cart-count').textContent = cartCount;
    alert('Item added to cart!');
});
function selectAge(age) {
    const buttons = document.querySelectorAll('.age-category');
    buttons.forEach(button => {
        button.classList.remove('selected'); // Remove selected class from all buttons
    });

    // Find the clicked button and add the selected class
    const selectedButton = Array.from(buttons).find(button => button.textContent === age);
    selectedButton.classList.add('selected');

    console.log('Selected Age Category:', age); // Log the selected age
}
// script.js

// Function to update the displayed quantity when a radio button is selected
function updateQuantity(value) {
    document.getElementById('quantity-display').textContent = value; // Update displayed quantity
}

// Function to handle adding to cart (you can customize this function as needed)
function addToCart() {
    const selectedQuantity = document.querySelector('input[name="quantity"]:checked'); // Get selected quantity

    if (selectedQuantity) {
        alert(`Added ${selectedQuantity.value} to cart!`); // Show alert with selected quantity
        // You can add more logic here to update the cart in your application
    } else {
        alert('Please select a quantity before adding to cart.'); // Alert if no quantity is selected
    }
}
function changeMainImage(src) {
        const mainImage = document.getElementById("mainImage");
        mainImage.src = src; // Change the main image source to the thumbnail's source
    }
    let cartCount1 = 0;

function toggleCart1() {
    cartCount1++;
    document.getElementById("cart-count1").innerText = cartCount1;
}
function showPopup(card) {
    const popup = card.querySelector('.popup-info');
    popup.style.display = 'block';
}

function hidePopup(card) {
    const popup = card.querySelector('.popup-info');
    popup.style.display = 'none';
}
function buyNow() {
    alert("Thanks for your interest, but unfortunately, you cannot buy this item. We are working to update the site as soon as possible.");
}

function changeMainImage(src) {
    document.getElementById("mainImage").src = src;
}