import React, { useState, useEffect } from 'react';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Lắng nghe sự kiện scroll chuột
    useEffect(() => {
        const toggleVisibility = () => {
            // Lấy tổng chiều cao của trang
            const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            // Vị trí scroll hiện tại
            const currentScroll = document.documentElement.scrollTop;
            
            // Tính % cuộn
            const progress = (currentScroll / totalHeight) * 100;
            setScrollProgress(progress);

            // Hiện nút khi cuộn quá 300px
            if (currentScroll > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    // Hàm click cuộn lên mượt mà
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div 
            className={`progress-wrap ${isVisible ? 'active-progress' : ''}`} 
            onClick={scrollToTop}
        >
            <svg 
                className="progress-circle svg-content" 
                width="100%" 
                height="100%" 
                viewBox="-1 -1 102 102"
            >
                <path 
                    d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" 
                    style={{
                        strokeDasharray: '307.919, 307.919',
                        strokeDashoffset: 307.919 - (307.919 * scrollProgress) / 100 // Hiệu ứng vòng tròn đầy dần
                    }}
                />
            </svg>
        </div>
    );
};

export default ScrollToTop;