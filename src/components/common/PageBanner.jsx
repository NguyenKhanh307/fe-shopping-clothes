import React from 'react';
import { Link } from 'react-router-dom';

const PageBanner = ({ title, breadcrumb }) => {
    return (
        <section className="page_banner" style={{ background: 'url(/assets/images/page_banner_bg.jpg) center/cover no-repeat' }}>
            <div className="page_banner_overlay">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="page_banner_text wow fadeInUp">
                                <h1>{title}</h1>
                                <ul>
                                    {breadcrumb.map((item, index) => (
                                        <li key={index}>
                                            {item.link ? (
                                                <Link to={item.link}>
                                                    {/* Thêm icon nhà ở breadcrumb đầu tiên */}
                                                    {index === 0 && <i className="fa-solid fa-house me-2"></i>} 
                                                    {item.label}
                                                </Link>
                                            ) : (
                                                <span>{item.label}</span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PageBanner;