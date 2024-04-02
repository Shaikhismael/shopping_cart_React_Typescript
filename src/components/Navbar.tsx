import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import CartIcon from "../Icons/Cart";
import useShoppingCartContext from "../context/ShoppinCartContext";
import ShoppingCart from "./ShoppingCart.tsx";

export default function Navbar() {

  const {isOpen, cartItems, openCart} = useShoppingCartContext()

  return (
    <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">            
            <Nav.Link as={NavLink} to="/store">
                Store
            </Nav.Link>           
        </Nav>
        <Button style={{width:"3rem", height:"3rem", position: "relative"}} onClick={openCart}>
            <CartIcon></CartIcon>
           { cartItems.length > 0 && <div className="rounded-circle bg-danger d-flex justify-content-center align-items-center" style={{
                color: "white",
                width: "1.5rem",
                height: "1.5rem",
                position: "absolute",
                bottom: 0,
                right: 0, 
                transform: "translate(25%, 25%)",
            }}>{cartItems.length}</div>}
        </Button>
      </Container>
      <ShoppingCart isOpen={isOpen}></ShoppingCart>
    </NavbarBs>
  )
}
