import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { SERVER_URL } from "../constants/ServerConstant";
import { useNavigate, useParams } from "react-router-dom";
import { addItemsToCart } from "../actions/CartAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

const ProductDetail = () => {
  const { id } = useParams();
  const [showPreloader, setShowPreloader] = useState(true);
  const [productData, setProductData] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log(id);
        const response = await fetch(SERVER_URL + `/api/product/${id}`); // Update the URL to match your backend endpoint
        const data = await response.json();
        setProductData(data.product);
        setShowPreloader(false);
      } catch (error) {
        setError(error);
        setShowPreloader(false);
      }
    };

    fetchProducts();
  }, []);

  const BuyNow = (productId) => {
    const cartItemExist = cartItems.find((item) => item.product === productId);
    console.log("cartItemExist :", cartItemExist);

    if (cartItemExist) {
      const newQuantity = cartItemExist.quantity + 1;
      dispatch(addItemsToCart(productId, newQuantity));
      navigate("/shipping");
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      dispatch(addItemsToCart(productId, 1));
      navigate("/shipping");
    }
  };

  const handleAddToCart = (productId) => {
    // Add the product with the given id to the cart
    const selectedProduct = productData;

    const cartItemExist = cartItems.find((item) => item.product === productId);
    console.log("cartItemExist :", cartItemExist);

    if (cartItemExist) {
      const newQuantity = cartItemExist.quantity + 1;
      dispatch(addItemsToCart(productId, newQuantity));
      alert.success("Item quantity increased");
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      dispatch(addItemsToCart(productId, 1));
      alert.success("Item added to cart successfully");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const productDetailItem = {
    images: [
      "../images/gallery/img1.png",
      "../images/gallery/img2.png",
      "../images/gallery/img3.png",
      "../images/gallery/img4.png",
      "../images/gallery/img5.png",
    ],
    title: "Wedding Cake",
    rating: "4.4",
    category: "cake",
    price: 450,
    previousPrice: 599,
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem exercitationem voluptate sint eius ea assumenda provident eos repellendus qui neque! Velit ratione illo maiores voluptates commodi eaque illum, laudantium non!",
    ingredients:
      "All-purpose flour, Granulated sugar, Baking powder, Salt, Eggs, Butter or oil. Milk, Vanilla, Cocoa powder, Other flavorings",
  };
  return (
    <>
      {showPreloader && (
        <div className="preload" data-preaload>
          <div className="circle"></div>
          <p className="text">EIKO</p>
          <p>Patisserie & Bakehouse</p>
        </div>
      )}
      {!showPreloader && (
        <>
          {showBackToTop && (
            <button
              className="btn btn-primary back-to-top"
              title="Back to Top"
              onClick={scrollToTop}
            >
              <i className="bi bi-arrow-up"></i>
            </button>
          )}
          <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10">
            {/* image gallery */}
            <div className="row">
              <div
                className="container mx-auto col-md-4 mx-2"
                //   style={{ maxHeight: "300px" }}
              >
                <Carousel
                  showArrows={true}
                  autoPlay
                  infiniteLoop
                  showStatus={false}
                  style={{ maxHeight: "400px", overflow: "hidden" }}
                >
                  {/* {productData.?image.map((i) => ( */}
                  <div>
                    <img src={SERVER_URL + "/" + productData?.image} alt="" />
                  </div>
                  {/* ))}  */}
                </Carousel>
                {/* /image gallery  */}
              </div>
              {/* description  */}

              <div className="mx-auto mx-2 col-md-6 ">
                <h2 className="pt-3 text-2xl font-bold lg:pt-0">
                  {productData?.name}
                </h2>

                <p className="card-text product-rating">
                  <i className="bi bi-star-fill"></i>
                  <strong> {productData?.rating}</strong>
                </p>

                {/* price components */}
                <p className="mt-4 ">
                  <span className="product-price">₹{productData?.price} </span>
                  <span className="product-off-price">
                    ₹{productData?.offPrice}
                  </span>
                  <span className="product-discount-box">
                    {Math.round(
                      100 - (productData?.price / productData?.offPrice) * 100
                    )}
                    % off
                  </span>
                </p>
                {/* buy & Add To Cart components  */}
                <div className="d-flex justify-content-between mt-5">
                  <div
                    onClick={() => BuyNow(productData._id)}
                    className="buy-now-button"
                  >
                    BUY NOW
                  </div>
                  <div
                    onClick={() => handleAddToCart(productData._id)}
                    className="add-to-cart-button"
                  >
                    ADD TO CART
                  </div>
                </div>

                {/* Product Description */}
                <h5 className="mt-5 font-bold"> Product Description</h5>

                <p className="text-sm leading-5 text-gray-500">
                  {productData?.shortDescription}
                </p>

                <p>Category : {productData?.category} </p>
                {/* Product ingredients */}
                <h5 className="mt-5 font-bold"> Product ingredients</h5>

                <p className="text-sm leading-5 text-gray-500">
                  {productDetailItem?.ingredients}
                </p>
              </div>
            </div>
          </section>
          {error && <div>Error: {error?.message}</div>}
        </>
      )}
    </>
  );
};

export default ProductDetail;
