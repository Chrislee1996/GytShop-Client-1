import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOneProduct,updateProduct, removeProduct } from "../../api/products";
import { Spinner, Container, Card, Button, Form } from "react-bootstrap";
import { addToCart } from "../../api/products";
import EditProductsModel from './EditProductsModel'
// import ReviewForm from '../reviews/ReviewForm'
import ShowReview from '../reviews/ShowReview'
import GiveReview from '../reviews/GiveReview'

const ShowProduct = (props) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [updated, setUpdated] = useState(false)
    const [reviewModalOpen, setReviewModalOpen] = useState(false)
    const [product, setProduct] = useState(null)
    const [quantity, setQuantity] = useState(0)
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

    console.log('product: ', product)

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
        console.log(typeof productId)

        addToCart(productId, user)
            // Then we send success message
            .then( () =>
                msgAlert({
                    heading: 'Product Added to cart! Success!',
                    message: 'Product added to cart',
                    variant: 'success',
            }))
            // if there is an error, we'll send an error message
            .catch( () =>
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Product could not be added to cart',
                    variant: 'danger',
            }))
        console.log('submitted!')
    }

    const removeTheProduct = () => {
        removeProduct(user, product._id)
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


    let reviews
    
    if(product) {
        if(product.reviews.length>0){
            reviews = product.reviews.map(review=> (
                <ShowReview key={review._id} updated={updated} review={review} product={product} user={user}
                triggerRefresh={()=> setUpdated(prev=> !prev)}
                />
            ))
        }
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
        <div className="userNameT">
            <Container>
                <Card.Body>
                    {
                    user && (product.owner == user._id)
                    ?
                    <>
                        <Button onClick={() => setModalOpen(true)} className="m-2" variant="warning">
                            Edit Product
                        </Button>
                        <Button onClick={() => removeTheProduct()} className="m-2" variant="danger">
                            Delete Product
                        </Button>
                    </>
                    :
                    null
                    }                    
                </Card.Body>
                    <h3><b>{product.name}</b></h3>
                    <Card.Img className='imgSP' style={{width:'18rem'}}
                        src={product.image}
                        alt='product image'
                    />
                    <p>${product.price}</p>
                    {product.stock === 0 ? <p>Out-of-stock</p> : <p>In-stock: {product.stock}</p>}
                    <p>{product.description}</p>
                    <Form onSubmit={handleSubmit}>
                        {product.stock === 0 ? 
                        <Button className="m-2" variant="primary" disabled>Add To Cart</Button>
                        :
                        <button className="signInB" type='submit'>Add To Cart</button>
                        }
                    </Form>
                    <button className="reviewB" onClick={()=> setReviewModalOpen(true)}> Leave a Review</button>
            </Container>
            
            <h3>Reviews: </h3>
                {reviews}
                <GiveReview
                    user={user}
                    show= {reviewModalOpen}
                    product={product}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                    handleClose={()=> setReviewModalOpen(false)}
                />
            <EditProductsModel 
                product={product}
                show={modalOpen}
                user={user}
                triggerRefresh={() => setUpdated(prev => !prev)}
                updateProduct={updateProduct}
                handleClose={() => setModalOpen(false)}
            />
        </div>
        </>
    )
}

export default ShowProduct