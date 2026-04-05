import React, { useState } from 'react';
import NavCategories from './NavCategories'; // Component chứa Menu danh mục bên trái
import NavMenu from './NavMenu';             // Component map dữ liệu từ menuData.js
import NavIcons from './NavIcon';
import MiniCart from './MiniCart';

const Navbar = () => {
    // Quản lý trạng thái đóng/mở của Giỏ hàng mini
    const [showCart, setShowCart] = useState(false);

    return (
        <>
            <nav className="main_menu_2 main_menu d-none d-lg-block">
                <div className="container">
                    <div className="row">
                        <div className="col-12 d-flex flex-wrap">
                            <div className="main_menu_area">
                                
                                {/* 1. Cột Categories (Tôi comment lại để code ngắn gọn, bạn tự tạo file nhé) */}
                                <NavCategories />

                                {/* 2. Menu Link chính (Sử dụng data từ file menuData.js) */}
                                <NavMenu />

                                {/* 3. Khu vực Icon */}
                                <NavIcons onOpenCart={() => setShowCart(true)} />

                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* 4. Mini Cart Offcanvas */}
            <MiniCart show={showCart} handleClose={() => setShowCart(false)} />
        </>
    );
};

export default Navbar;