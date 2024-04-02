import { Offcanvas, Stack } from "react-bootstrap"
import useShoppingCartContext from "../context/ShoppinCartContext"
import CartItem from "./CartItem"
import storeItems from '../data/items'
import { FormatCurrency } from "../utilities/FormatCurrency"

type ShoppingCartProps = {
    isOpen: boolean
}

function ShoppingCart({isOpen}: ShoppingCartProps) {

    const {closeCart, cartItems} = useShoppingCartContext()

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Stack gap={3}>
                {cartItems.map((item)=>(
                    <CartItem {...item} key={item.id}/>
                ))}
                <div className="ms-auto fw-bold fs-5">
                    Total{" "}
                    {FormatCurrency(cartItems.reduce((total,cartItem)=>{
                        const item = storeItems.find((item)=>(item.id === cartItem.id))
                        return total + item.price * cartItem.quantity
                    },0))}
                </div>
            </Stack>
        </Offcanvas.Body>
    </Offcanvas>
  )
}

export default ShoppingCart