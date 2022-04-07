import { Modal } from 'bootstrap'
import React, { useState, useEffect } from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import { addReview, removeReview } from '../../api/reviews'

const ReviewForm = (props) => {
    
    const {handleChange, handleSubmit,review} = props

    return (
        <Container className="justify-content-center">
        <div className='fixed-left'>
        <Form onSubmit={handleSubmit}>
            <Form.Label >Leave an Anonymous Review</Form.Label>
            <Form.Control as='textarea' 
                placeholder="Leave a Review"        
                value={review.note}
                name='note'
                onChange={handleChange}
            />
            <Button type='submit' >Submit</Button>
        </Form>
        </div>
        </Container> 
    )
}

export default ReviewForm