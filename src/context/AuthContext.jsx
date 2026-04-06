import React, { createContext, useState, useContext, useEffect } from 'react';

// Context để chia sẻ trạng thái đăng nhập toàn app
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // Khởi tạo state từ localStorage (để giữ đăng nhập sau khi reload)
    const [user, setUser] = useState(() => {
        try {
            const stored = localStorage.getItem('zenis_user');
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    });

    // Hàm đăng nhập — lưu thông tin user vào state và localStorage
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('zenis_user', JSON.stringify(userData));
    };

    // Hàm đăng xuất — xóa thông tin user
    const logout = () => {
        setUser(null);
        localStorage.removeItem('zenis_user');
        localStorage.removeItem('zenis_token');
    };

    // Kiểm tra trạng thái đăng nhập
    const isLoggedIn = !!user;

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook tiện lợi để dùng AuthContext trong component con
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth phải được dùng trong AuthProvider');
    }
    return context;
};

export default AuthContext;
