import { BrowserRouter, Routes, Route } from "react-router-dom";
// import UsersPage from './pages/UserPage';
// import HomePage from './pages/HomePage';
import Home from './pages/Home';
import Layout from './components/layout/Layout';
// import AppRouter from './routes/AppRouter';
import AboutUs from './pages/AboutUs';
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
            {/* Các route khác thêm sau: /shop, /cart, /checkout... */}
          </Route>
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
