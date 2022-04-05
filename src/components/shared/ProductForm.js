import React, { useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'

const ProductForm = (props) => {
    const {product, handleChange, handleSubmit, heading} = props

    return(
        <Container className="justify-content-center">
             <h3>{heading}</h3>

            <Form onSubmit={handleSubmit}>
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                    placeholder="Product name"
                    value={product.name}
                    name='name'
                    onChange={handleChange}
                />
                <Form.Label>Description of Product</Form.Label>
                    <Form.Control as='textarea'
                        placeholder="Product description"
                        value={product.description}
                        name='description'
                        onChange={handleChange}
                    />
                <Form.Label>Category of Product</Form.Label>
                    <Form.Control
                        placeholder="Category"
                        value={product.category}
                        name='category'
                        onChange={handleChange}
                    />
                <Form.Label>Price of Product</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder="Price of Product"
                        value={product.price}
                        name='price'
                        onChange={handleChange}
                    />
                <Form.Label>Current Stock</Form.Label>
                    <Form.Control
                        type='number'   
                        placeholder="Number in Stock"
                        value={product.stock}
                        name='stock'
                        onChange={handleChange}
                    />
                <Form.Label>Picture of Product</Form.Label>
                    <Form.Control
                        type='url'   
                        value={product.image}
                        name='image'
                        onChange={handleChange}
                    />
                <Button type='submit'>Submit</Button>
            </Form>
        </Container>
    )
}

export default ProductForm