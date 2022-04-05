import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOneProduct, updateProduct, removeProduct} from "../../api/products";
import { Spinner, Container, Card, Button, Form } from "react-bootstrap";
import EditProductsModal from './EditProductsModal'


const ShowProduct = (props) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [updated, setUpdated] = useState(false)
    const [product, setProduct] = useState(null)
    const {productId} = useParams()
    const { user, msgAlert } = props
    const navigate = useNavigate()

    const formControlStyle = {
        width: '4%'
    }

    console.log('product ID', productId)

    useEffect( () => {
        getOneProduct(productId)
            .then( res => setProduct(res.data.product))
            .catch(console.error)
    }, [updated])

    // console.log('product: ', product)
    const deleteProduct = () => {
        removeProduct(user, product.id)
        .then(() => {
            msgAlert({
                heading: 'Product Removed!',
                message: 'Product Successfully deleted',
                variant: 'success',
            })
        })
            .then(()=> {navigate('/')})
            .catch(() => {
                msgAlert({
                    heading: 'Something Went Wrong',
                    message: 'Unable to delete',
                    variant: 'danger',
                })
            })
    }


    const handleChange = (e) => {
        e.persist()

        setProduct(prevProduct => {
            const name = e.target.name
            let value = e.target.value
            
            const updatedValue = { [name]:value }

            return {...prevProduct, ...updatedValue}
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // createProduct(user, product)
        //     .then(res => {navigate(`/products/${res.data.product._id}`)})
        //     // .then(res => console.log('product id: ', res.data.product.))
        //     // Then we send success message
        //     .then( () =>
        //         msgAlert({
        //             heading: 'Product Added to cart! Success!',
        //             message: 'Product added to cart',
        //             variant: 'success',
        //     }))
        //     // if there is an error, we'll send an error message
        //     .catch( () =>
        //         msgAlert({
        //             heading: 'Oh No!',
        //             message: 'Product could not be added to cart',
        //             variant: 'danger',
        //     }))
        console.log('submitted!')
    }

    if(!product)
    {
        return (
            <Container fluid className="justify-content-center">
                <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        )
    }

    // When you click 'Add To Cart' you need to send the productId to an order route to push it to productsOrdered array

    return(
        <>
            <Button onClick={() => setModalOpen(true)} className="m-2" variant="warning">
                Edit Product
            </Button>

            <Button onClick={() => deleteProduct()} className="m-2" variant="danger">
                Delete Product
            </Button>
            <Container>
                <h3><b>{product.name}</b></h3>
                <Card style={{width:'18rem'}}>
                <Card.Img
                    src={product.image}
                    alt='product image' 
                />
                </Card>
                <p>${product.price}</p>
                <p>In-stock: {product.stock}</p>
                <p>{product.description}</p>
                <Form onSubmit={handleSubmit}>
                    <Form.Label>Qty:</Form.Label>
                    <Form.Control 
                        onChange={handleChange} 
                        type='number'   
                        value={product.stock}
                        name='stock'
                        style={formControlStyle}
                    />
                    <Button className="m-2" variant="primary" type='submit'>Add To Cart</Button>
                </Form>
            </Container>
            <EditProductsModal
                    product={product}
                    show={modalOpen}
                    user={user}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                    updateProduct={updateProduct}
                    handleClose={() => setModalOpen(false)}
                />
        </>
    )
}

export default ShowProduct