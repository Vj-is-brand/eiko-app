import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import 'animate.css/animate.min.css';
import 'animate.css/animate.compat.css';
import { Link } from 'react-router-dom';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const Mainpage = () => {
    const [showPreloader, setShowPreloader] = useState(true);
    const [showBackToTop, setShowBackToTop] = useState(false);


    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const imageProps = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        delay: 200,
    });

    useEffect(() => {
        setShowPreloader(false);

        const handleScroll = () => {
            if (window.pageYOffset > 500) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }
            setShowPreloader(false);

        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="main-container">
            {showPreloader && (
                <div className="preload" data-preaload>
                    <div className="circle"></div>
                    <p className="text">EIKO</p>
                    <p>Patisserie & Bakehouse</p>
                </div>
            )}
            {!showPreloader && (

                <animated.div style={imageProps}>
                    {showBackToTop && (
                        <button
                            className="btn btn-primary back-to-top"
                            title="Back to Top"
                            onClick={scrollToTop}
                        >
                            <i className="bi bi-arrow-up"></i>
                        </button>
                    )}
                    {/* Header start */}
                    <Header />
                    {/* Header End */}

                    {/* Catogery section start */}
                    {/* <animated.div style={categoryProps}> */}
                    <section className="py-5  wow animate__zoomIn cat-blocks-display-theme-2" data-wow-delay="0.2s" style={{ 'visibility': 'visible', "backgroundColor":"#fffcfa"}}>
                        <div className="conatiner">
                            <h2 className="sectionhead line-height-50 sm-line-height-45 xs-line-height-30 no-margin-bottom text-center text-uppercase">
                                Our Menu
                            </h2>

                            <div
                                className="row justify-content-md-center items-cat-blocks-display-theme-2 row-cols-2 row-cols-lg-6 row-cols-sm-3"
                            >
                                <div className="col text-center mb-3 item-cat-blocks-display-theme-2 wow animate__zoomIn" data-wow-delay="0.2s" style={{ 'visibility': 'visible' }}>
                                    <div className="interactive-banners-style-06 card-hover">
                                        <Link to="/products">
                                            <div>
                                                <img className="d-block" src="images/catogery/cat1.png" alt="" data-no-retina />
                                            </div>
                                            <div className="mt-3 heading-catblocks">
                                                Desserts
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col text-center mb-3 item-cat-blocks-display-theme-2 wow animate__zoomIn" data-wow-delay="0.2s" style={{ 'visibility': 'visible' }}>
                                    <div className="interactive-banners-style-06 card-hover">
                                        <Link to="/products">
                                            <div>
                                                <img className="d-block" src="images/catogery/cat2.png" alt="" data-no-retina />
                                            </div>
                                            <div className="mt-3 heading-catblocks">
                                                Food
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col text-center mb-3 item-cat-blocks-display-theme-2 wow animate__zoomIn" data-wow-delay="0.2s" style={{ 'visibility': 'visible' }}>
                                    <div className="interactive-banners-style-06 card-hover">
                                        <Link to="/products">
                                            <div>
                                                <img className="d-block" src="images/catogery/cat3.png" alt="" data-no-retina />
                                            </div>
                                            <div className="mt-3 heading-catblocks">
                                                Beverages
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col text-center mb-3 item-cat-blocks-display-theme-2 wow animate__zoomIn" data-wow-delay="0.2s" style={{ 'visibility': 'visible' }}>
                                    <div className="interactive-banners-style-06 card-hover">
                                        <Link to="/products">
                                            <div>
                                                <img className="d-block" src="images/catogery/cat4.png" alt="" data-no-retina />
                                            </div>
                                            <div className="mt-3 heading-catblocks">
                                                Bakery
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col text-center mb-3 item-cat-blocks-display-theme-2 wow animate__zoomIn" data-wow-delay="0.2s" style={{ 'visibility': 'visible' }}>
                                    <div className="interactive-banners-style-06 card-hover">
                                        <Link to="/products">
                                            <div>
                                                <img className="d-block" src="images/catogery/cat5.png" alt="" data-no-retina />
                                            </div>
                                            <div className="mt-3 heading-catblocks">
                                                Cakes
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col text-center mb-3 item-cat-blocks-display-theme-2 wow animate__zoomIn" data-wow-delay="0.2s" style={{ 'visibility': 'visible' }}>
                                    <div className="interactive-banners-style-06 card-hover">
                                        <Link to="/products">
                                            <div>
                                                <img className="d-block" src="images/catogery/cat6.png" alt="" data-no-retina />
                                            </div>
                                            <div className="mt-3 heading-catblocks">
                                                Gifting
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* </animated.div> */}

                    {/* Catogery section end */}
                    {/* <animated.div style={aboutProps}> */}
                    <section id="about" className="bg-white padding-one-bottom m-md-5 m-3">
                        <div className="conatiner" style={{ 'background': '#fffcfa ', 'borderRadius': '15px ', 'padding': '3rem ' }}>
                            <div className="row justify-content-center">
                                <div className="col-12 col-sm-6 text-center " data-zanim-timeline='{"delay":0}' data-zanim-o="1">

                                    <h2 className="sectionhead mb-3  text-center text-uppercase" >Who we are</h2>
                                    <img src="images/about.png" className="mx-auto img-fluid mb-2" width="200" data-no-retina="" alt='about ' />
                                    <div style={{ 'lineHeight': '2rem', 'fontWeight': '100' }}>
                                        <p >
                                            The phrase "EIKO" translates to 'flourishing and prosperous'. It began with a sprinkle of dreams and a bowl brimming with passion. At EIKO, we meticulously create outstanding baked goods, employing only the finest ingredients, precision, and an abundance of love. Our creations are 100% eggless, yet they encapsulate sheer delight in every single bite.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* </animated.div> */}


                    {/* <section className="textblocks1">
                <div className="container">
                    <img className="border-radius-10px" src="https://assetdo1.urbandart.com/1701661273129.jpeg" alt="" data-no-retina="" />
                </div>
            </section> */}

                    <section className="textblocks1 d-flex align-items-center justify-content-center">
                        <animated.div style={imageProps}>
                            <img className="border-radius-10px mx-auto img-fluid" src="images/gallery/gallerymain.jpg" alt="" data-no-retina="" />
                        </animated.div>
                    </section>

                    <section id="gallery">
                        <div className="oplaycarousal">
                            <div className="-container">
                                <Slider
                                    className="slider-row slider-row-small" // Add the custom class here
                                    autoplay
                                    autoplaySpeed={2000}
                                    slidesToShow={5}
                                    slidesToScroll={1}
                                    arrows={false}
                                    fade={false}
                                    rtl={false}
                                    swipeToSlide={true}
                                    responsive={[
                                        { breakpoint: 1024, settings: { slidesToShow: 3 } },
                                        { breakpoint: 600, settings: { slidesToShow: 2 } },
                                        { breakpoint: 480, settings: { slidesToShow: 2.1 } },
                                    ]}
                                >
                                    {Array.from({ length: 14 }, (_, index) => (
                                        <div key={index} className="slick-slide">
                                            <img src={`/images/gallery/img${index + 1}.png`} alt="" />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                            <div className="slider-container">
                                <Slider
                                    className="slider-row slider-row-large" // Add the custom class here
                                    autoplay
                                    autoplaySpeed={2000}
                                    slidesToShow={4}
                                    slidesToScroll={1}
                                    arrows={false}
                                    fade={false}
                                    rtl={true}
                                    swipeToSlide={true}
                                    responsive={[
                                        { breakpoint: 1024, settings: { slidesToShow: 3.1 } },
                                        { breakpoint: 600, settings: { slidesToShow: 2.1 } },
                                        { breakpoint: 480, settings: { slidesToShow: 1.1 } },
                                    ]}
                                >
                                    {Array.from({ length: 11}, (_, index) => (
                                        <div key={index} className="slick-slide">
                                            <img src={`/images/gallery/image/img${index + 1}.png`} alt="" />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>

                    </section>

                    <Footer />



                </animated.div>
            )
            }
        </div >
    );
};

export default Mainpage;