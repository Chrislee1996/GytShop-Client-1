import React, { useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'

const CheckoutForm = (props) => {
    const {handleChange, handleSubmit, heading} = props

    return (
        <Container className="justify-content-center">
             <h3>{heading}</h3>

            <Form onSubmit={handleSubmit}>
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                    placeholder="Full Name"
                    onChange={handleChange}
                />
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                    placeholder="Phone Number"
                    onChange={handleChange}
                />
                <Form.Label>Shipping Address</Form.Label>
                <Form.Control
                    placeholder="Category"
                    value={product.category}
                    name='shippingAddress'
                    onChange={handleChange}
                />
                <Button type='submit'>Submit</Button>
            </Form>
        </Container>
    )
}

export default CheckoutForm 