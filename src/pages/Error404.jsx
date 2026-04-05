import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Error404 = () => {
    // Sử dụng hook useNavigate để điều hướng
    const navigate = useNavigate();

    // Hàm xử lý khi nhấn nút "Quay lại"
    const handleGoBack = (e) => {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ Link
        navigate(-1);       // -1 có nghĩa là quay lại 1 trang trong lịch sử trình duyệt
    };

    return (
        <section
            className="error_page"
            style={{ background: 'url(/assets/images/error_bg.jpg) center/cover no-repeat' }}
        >
            <div className="container">
                <div className="row">
                    <div className="col-xl-7 m-auto">
                        <div className="error_text wow fadeInUp">
                            <h2>404</h2>
                            <h4>Không Tìm Thấy Trang</h4>
                            <p>
                                Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
                                Vui lòng kiểm tra lại địa chỉ URL hoặc quay về trang trước đó.
                            </p>
                            {/* Gọi hàm handleGoBack khi click */}
                            <Link to="#" onClick={handleGoBack} className="common_btn">
                                quay lại <i className="fa-solid fa-arrow-right ms-2"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Error404;