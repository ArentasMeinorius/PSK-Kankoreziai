export function addToCart(item, quantity) {
    if (quantity <= 0) {
        throw new Error('Quantity must be greater than 0');
    }

    let cart = JSON.parse(localStorage.getItem('cart'));
    if (cart == null) {
        cart = [];
    }
    if (cart.some((cartItem) => cartItem.item.id === item.id)) {
        cart = cart.map((cartItem) => {
            if (cartItem.item.id === item.id) {
                cartItem.quantity += quantity;
            }
            return cartItem;
        });
        localStorage.setItem('cart', JSON.stringify(cart));
        return;
    }
    cart.push({ item: item, quantity: quantity });
    localStorage.setItem('cart', JSON.stringify(cart));
    return;
}

export function getCart() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart == null) {
        return [];
    }
    return cart;
}

export function removeFromCart(item) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (cart == null) {
        return;
    }
    cart = cart.filter((cartItem) => cartItem.item.id !== item.id);
    localStorage.setItem('cart', JSON.stringify(cart));
    return;
}
