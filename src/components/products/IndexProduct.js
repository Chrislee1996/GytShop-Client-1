import React, { useState, useEffect } from 'react'
import { Card, Dropdown,DropdownButton, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getAllProducts } from '../../api/products'

const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const categoryLinks = {
    color: 'black',
    textDecoration: 'none'
}

const IndexProducts = (props) => {
    const [products, setProducts] = useState(null)
    

    useEffect(() => {
        getAllProducts()
            .then(res => {
                setProducts(res.data.products)
            })
            .catch(console.error)
    }, [])

    if (!products) {
        return <p>loading...</p>
    }
    else if (products.length === 0) {
        return <p>Add a product.</p>
    }

    let productCards

    if(products.length > 0) {
        productCards = products.map(product => (
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
                        <Link to={`/products/${product._id}`}><Button>View {product.name}</Button></Link>
                    </Card.Text>
                </Card.Body>
            </Card>
        ))
    }

    

    return (
        <>
            <h3>Browse Some Products</h3>
            <DropdownButton id="dropdown-basic-button" title="Categories" >
				<Dropdown.Item><Link to='/products/clothing' style={categoryLinks}>Clothing</Link></Dropdown.Item>
				<Dropdown.Item><Link to='/products/electronics' style={categoryLinks}>Electronics</Link></Dropdown.Item>
				<Dropdown.Item><Link to='/products/collectibles' style={categoryLinks}>Collectibles</Link></Dropdown.Item>
			</DropdownButton>
            
            <div style={cardContainerLayout}>
                {productCards}
            </div>
        </>
    )
}

export default IndexProducts