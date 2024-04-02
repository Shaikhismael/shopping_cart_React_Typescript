import { Button, Card } from "react-bootstrap"
import { FormatCurrency } from "../utilities/FormatCurrency"
import { useContext } from "react"
import useShoppingCartContext from "../context/ShoppinCartContext"

type StoreItemProps = {
    id: number,
    price: number
    name: string
    imgUrl: string
}


function StoreItem({id, price, name, imgUrl}: StoreItemProps) {

  const {getItemQuantity, increaseCartQuantity, decreaseCartQuantity,removeFromCart} = useShoppingCartContext()
  const quantity = getItemQuantity(id)


  return (
    <Card className="h-100">
        <Card.Img variant="top" src={imgUrl} height={"200px"} style={{objectFit: "cover"}}>
        </Card.Img>
        <Card.Body className="d-flex flex-column">
            <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                <span className="fs-2">{name}</span>
                <span className="ms-2 text-muted">{FormatCurrency(price)}</span>
            </Card.Title>
            <div className="mt-auto">
              {quantity === 0 ? (
                <Button className="w-100" onClick={()=>increaseCartQuantity(id)}>Add to Cart</Button>
              ) : (
                <div className="d-flex align-items-center flex-column" style={{gap: ".5rem"}} >
                  <div className="d-flex alaign-items-center justify-content-center" style={{gap: ".5rem"}}>
                    <Button onClick={()=>decreaseCartQuantity(id)}>-</Button>
                    <div className="fs-3">{quantity}</div>
                    <Button onClick={()=>increaseCartQuantity(id)}>+</Button>
                  </div>
                  <Button variant="danger" onClick={()=>removeFromCart(id)} >remove</Button>
                </div>
              )}
            </div>
        </Card.Body>
    </Card>
  )
}

export default StoreItem