import { Stack } from "react-bootstrap"
import useShoppingCartContext from "../context/ShoppinCartContext"
import storeItems from '../data/items'
import { FormatCurrency } from "../utilities/FormatCurrency"

type CartItemsProps = {
    id: number
    quantity: number
}


function CartItem({id , quantity}: CartItemsProps) {

    const {removeFromCart} = useShoppingCartContext()
    const item = storeItems.find(item => item.id === id)
    if (item == null) {
        return null
    }

  return (
    <Stack direction="horizontal" gap={3}>
        <img src={item.imgUrl} style={{width: "125px", height:"75px", objectFit:"cover", marginBottom: "10px"}}/>
        <div className="me-auto fs-4">
            <div style={{fontSize: "1.5rem"}}>
            {item.name} {quantity > 1 && <span className="text-muted" style={{fontSize: "1rem"}}>x{quantity}</span>}
            </div>
            <div className="tetx-muted" style={{fontSize: ".950rem"}}>{FormatCurrency(item.price)}</div>
        </div>
        <div className="ms-auto">{`${item.price * quantity}`}</div>
        <div className="btn btn-outline-danger" onClick={()=> removeFromCart(item.id)}>X</div>
    </Stack>
  )
}

export default CartItem