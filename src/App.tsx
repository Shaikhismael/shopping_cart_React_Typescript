import "bootstrap/dist/css/bootstrap.min.css"
import { Route, Routes } from "react-router-dom"
import Store from "./pages/Store.tsx"
import Navbar from "./components/Navbar.tsx"
import { ShoppingCartProvider } from "./context/ShoppinCartContext.tsx"

function App() {
  return (
    <ShoppingCartProvider>
      <div className="container mb-4">
        <Navbar />
        <Routes>
          <Route path="/" element={<Store/>}></Route>
        </Routes>
      </div>
    </ShoppingCartProvider>
  )
}

export default App