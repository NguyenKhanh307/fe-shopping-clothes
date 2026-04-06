import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Layout from './components/layout/Layout';
import AboutUs from './pages/AboutUs';
import Category from './pages/Category';
import Brand from './pages/Brand';
import Blog from './pages/Blog';
import Error404 from './pages/Error404';
import ContactUs from './pages/ContactUs';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ShopDetails from './pages/ShopDetails';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <BrowserRouter>
      {/* AuthProvider bọc toàn bộ app để mọi component đều truy cập được trạng thái đăng nhập */}
      <AuthProvider>
        <Routes>
          {/* Tất cả các route nằm trong Layout sẽ có chung Header và Footer */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/category" element={<Category />} />
            <Route path="/brand" element={<Brand />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/shop/:id" element={<ShopDetails />} />
            <Route path="*" element={<Error404 />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
