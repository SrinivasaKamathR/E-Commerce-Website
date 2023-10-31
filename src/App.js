import { useContext, useEffect, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./footer/Footer";
// import About from "./pages/About";
// import Home from "./pages/Home";
// import Store from "./pages/Store";
// import ContactUs from "./pages/ContactUs";
import { ShowCartContextProvider } from "./store/showCart-context";
import { ProductContextProvider } from "./store/product-context";
// import ProductDetail from "./pages/ProductDetail";
// import Login from "./pages/Login";
import loginContext from "./store/login-context";
import LoadingSpinner from "./UI/LoadingSpinner";
import cartContext from "./store/cart-Context";

const Home = React.lazy(() => import("./pages/Home"));
const Store = React.lazy(() => import("./pages/Store"));
const About = React.lazy(() => import("./pages/About"));
const Login = React.lazy(() => import("./pages/Login"));
const ContactUs = React.lazy(() => import("./pages/ContactUs"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));

function App() {
  const loginCtx = useContext(loginContext);
  const cartCtx = useContext(cartContext);

  const { loginCartHandler } = cartCtx;
  const { isloggedIn } = loginCtx;

  useEffect(() => {
    if (isloggedIn) {
      console.log("called");
      loginCartHandler();
    }
  }, [loginCartHandler, isloggedIn]);

  const productsArr = [
    {
      title: "Colors",
      price: 100,
      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
    },

    {
      title: "Black and white Colors",
      price: 50,
      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
    },

    {
      title: "Yellow and Black Colors",
      price: 70,
      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
    },

    {
      title: "Blue Color",
      price: 100,
      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
    },
  ];

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ShowCartContextProvider>
        <Header />
      </ShowCartContextProvider>
      <Route path="/" exact>
        <Redirect to="/home" />
      </Route>

      <Route path="/home">
        <Home />
      </Route>

      <Switch>
        <ProductContextProvider>
          <ShowCartContextProvider>
            <Route path="/product" exact>
              {loginCtx.isloggedIn && <Store productList={productsArr} />}
              {!loginCtx.isloggedIn && <Redirect to="/login" />}
            </Route>
          </ShowCartContextProvider>

          <Route path="/product/:productId">
            {loginCtx.isloggedIn && <ProductDetail />}
            {!loginCtx.isloggedIn && <Redirect to="/login" />}
          </Route>
        </ProductContextProvider>
      </Switch>

      <Route path="/about">
        <About />
      </Route>

      <Route path="/contact">
        <ContactUs />
      </Route>

      {/* <Route path="*">
        <Redirect to="/home" />
      </Route> */}
      <Route path="/login">
        {!loginCtx.isloggedIn && <Login />}
        {loginCtx.isloggedIn && <Redirect to="/product" />}
      </Route>
      {/* <Section productList={productsArr} /> */}
      <Footer />
    </Suspense>
  );
}

export default App;
