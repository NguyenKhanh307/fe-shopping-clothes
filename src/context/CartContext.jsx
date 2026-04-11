import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { getCart, addToCart, updateQuantity, removeItem, clearCart } from '../services/cartService';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const { user, isLoggedIn } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [cartId, setCartId] = useState(null);
    const [subTotal, setSubTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    // Tính tổng phụ tự động
    useEffect(() => {
        const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        setSubTotal(total);
    }, [cartItems]);

    // Fetch giỏ hàng
    const refreshCart = useCallback(async () => {
        if (!isLoggedIn || !user?.id) {
            setCartItems([]);
            setCartId(null);
            return;
        }

        setIsLoading(true);
        try {
            const response = await getCart(user.id);
            const cartData = response.data;
            if (cartData) {
                setCartId(cartData.id);
                setCartItems(cartData.items || []);
            }
        } catch (error) {
            console.error("Failed to fetch cart:", error);
        } finally {
            setIsLoading(false);
        }
    }, [user, isLoggedIn]);

    // Load giỏ hàng lần đầu khi vào trang / đổi trạng thái login
    useEffect(() => {
        refreshCart();
    }, [refreshCart]);

    // Thêm vào giỏ hàng
    const addItemToCart = async (productId, quantity, color) => {
        if (!isLoggedIn || !user?.id) return false;
        try {
            await addToCart(user.id, productId, quantity, color);
            await refreshCart();
            return true; // Báo hiệu thành công để hiển thị toast notification
        } catch (error) {
            console.error("Failed to add to cart:", error);
            return false;
        }
    };

    // Update quantity
    const updateItemQuantity = async (itemId, quantity) => {
        if (quantity < 1) return;
        try {
            await updateQuantity(itemId, quantity);
            
            // Lạc quan (optimistic update) để UX mượt
            setCartItems(prev => prev.map(item => 
                item.id === itemId ? { ...item, quantity } : item
            ));
            
            // Xong thì fetch lại cho chắc chắn
            await refreshCart();
        } catch (error) {
            console.error("Failed to update cart quantity:", error);
        }
    };

    // Remove from cart
    const removeCartItem = async (itemId) => {
        try {
            await removeItem(itemId);

            // Optimistic UX
            setCartItems(prev => prev.filter(item => item.id !== itemId));

            await refreshCart();
        } catch (error) {
            console.error("Failed to remove item:", error);
        }
    };

    // Clear entire cart
    const clearCartItems = async () => {
        if (!isLoggedIn || !user?.id) return;
        setIsLoading(true);

        // Lưu trữ tạm items để xóa thủ công nếu API clearCart chưa có
        const currentItems = [...cartItems];

        try {
            setCartItems([]); // Lạc quan UX: reset frontend ngay lập tức
            
            try {
                await clearCart(user.id);
            } catch (apiError) {
                // Fallback: Nếu backend chưa được restart và API /clear trả về 404
                // Dùng vòng lặp gọi API xóa từng phần tử cũ đã có sẵn
                console.warn("API clearCart chưa hoạt động, chuyển sang mode fallback xóa từng sản phẩm...");
                const deletePromises = currentItems.map(item => removeItem(item.id));
                await Promise.all(deletePromises);
            }
        } catch (error) {
            console.error("Failed to clear cart:", error);
            await refreshCart(); // Hoàn tác lại nếu mọi cách đều lỗi
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            cartId,
            subTotal,
            isLoading,
            refreshCart,
            addItemToCart,
            updateItemQuantity,
            removeCartItem,
            clearCartItems
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart phải được dùng trong CartProvider');
    }
    return context;
};

export default CartContext;
