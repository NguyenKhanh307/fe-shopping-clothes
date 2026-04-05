import { BrowserRouter, Routes, Route } from "react-router-dom";
// import UsersPage from './pages/UserPage';
// import HomePage from './pages/HomePage';
import Home from './pages/Home';
import Layout from './components/layout/Layout';
// import AppRouter from './routes/AppRouter';
import AboutUs from './pages/AboutUs';
import Category from './pages/Category';
import Brand from './pages/Brand';
import Blog from './pages/Blog';
import Error404 from './pages/Error404';
import ContactUs from './pages/ContactUs';
// Thêm vào trong Routes:

function App() {
  return (
    <>
      {/* <AppRouter /> */}
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UsersPage />} />
          {/* Thêm các route khác sau */}
      {/* </Routes> */}

      {/* </BrowserRouter> */}
      <BrowserRouter>

        <Routes>
          {/* Tất cả các route nằm trong Layout sẽ có chung Header và Footer */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/category" element={<Category />} />
            <Route path="/brand" element={<Brand />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="*" element={<Error404 />} />
          </Route>
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
