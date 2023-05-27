import { useState, useEffect } from 'react';
import { useAuth } from '../authentication/useAuth.js';

export function useCart() {
    const [cart, setCart] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [isAuthenticated, credentials, authKey, callLogin, callLogout] = useAuth();
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    function addToCart(item, quantity = 1) {
        if (cart == null) {
            return;
        }

        if (typeof quantity === 'string') {
            quantity = parseInt(quantity);
        }
        const index = cart.findIndex((cartItem) => cartItem.productId === item.id);
        if (index === -1) {
            cart.push({
                ...{
                    productId: item.id,
                    quantity: {
                        units: quantity,
                    },
                },
            });
        } else {
            cart[index].quantity.units += quantity;
        }
        setCart([...cart]);
        updateRemoteCart();
    }

    function setQuantity(item, quantity) {
        if (cart == null) {
            return;
        }
        if (typeof quantity === 'string') {
            quantity = parseInt(quantity);
        }
        const index = cart.findIndex((cartItem) => cartItem.productId === item.productId);
        if (index === -1) {
            return;
        }
        cart[index].quantity.units = quantity;
        setCart([...cart]);
        updateRemoteCart();
    }

    function removeFromCart(item) {
        if (cart == null) {
            return;
        }
        const index = cart.findIndex((cartItem) => cartItem.id === item.id);
        if (index === -1) {
            return;
        }
        cart.splice(index, 1);
        setCart([...cart]);
        updateRemoteCart();
    }

    function updateRemoteCart() {
        console.log('useEffect: cart changed');
        if (isAuthenticated) {
            if (cart == null) {
                return;
            }
            console.log('Setting cart with auth key ' + authKey);
            fetch('http://localhost:5000/cart', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authKey}`,
                },
                body: JSON.stringify({
                    cartItems: cart,
                }),
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Could not set cart');
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setError(error);
                });
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            console.log('Fetching cart with auth key ' + authKey);
            fetch('http://localhost:5000/cart', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authKey}`,
                },
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Could not get cart');
                    }
                })
                .then((data) => {
                    console.log('Got cart: ' + JSON.stringify(data));
                    setCart(data.cartItems);
                    setIsLoaded(true);
                })
                .catch((error) => {
                    console.log(error);
                    setError(error);
                    setIsLoaded(true);
                });
        }
    }, [isAuthenticated, authKey]);

    return [cart, isLoaded, error, addToCart, removeFromCart, setQuantity];
}
