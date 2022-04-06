import React, { useState, useEffect } from 'react'
import { getAllCartItems } from '../../api/products'
import { Card, Button } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'

const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const MyCart = (props) => {
    const [products, setProducts] = useState(null)
    const {userId} = useParams()
    const {user, msgAlert} = props

    useEffect(() => {
        getAllCartItems(userId, user)
            .then(res => {
                console.log('res: ', res)
                setProducts(res.data.orders)
            })
            .catch(console.error)
    }, [userId])
    console.log('this is the user id: ', userId)
    console.log('these are the products', products)
    console.log('this is the user\'s token', user.token)

    if (!products) {
        return <p>Loading...</p>
    }

    else if (products.length === 0) {
        return <p>Shopping Cart is Empty. Add an item!</p>
    }

    let productCards

    if(products.length > 0) {
        productCards = products.map(product => 
            (
                <Card key={product._id} style={{ width: '30%' }} className="m-2">
                    <Card.Img variant="top" src="" />
                    <Card.Title className='m-2'>{product.name}</Card.Title>
                    <Card.Body>
                        <Card.Text>Seller: {product.owner.username}</Card.Text>
                        <Link to={`/products/${product._id}`}>
                            <Card.Img
                            src={product.image}
                            alt='product image'
                            width='200px'
                            height='400px'
                            />
                        </Link>
                        <Card.Text>
                            <Button href={`/products/${product._id}`}>View {product.name}</Button>
                        </Card.Text>
                    </Card.Body>
                </Card>
            )
        )
    }

    return (
        <>
            <h3>My Shopping Cart</h3>
            <div style={cardContainerLayout}>
                {productCards}
            </div>
        </>
    )
}

export default MyCart