import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { removeReview } from '../../api/reviews'

const ShowReview = (props) => {
    const {review, user, product, triggerRefresh} = props




    const destroyReview = () => {
        removeReview(user, product._id, review._id)
            .then(() => triggerRefresh())
            // if there is an error, we'll send an error message
            .catch(console.error)
    }


// console.log('here is our review owner', review.owner) 
// console.log('here is our review owner username', review.owner.username) 

    return (
        <>
            <Card className="m-2">
                <Card.Body>
                        <h4>{review.note}<br/></h4>
                    {
                        user && (user.id === product.owner.id)
                        ?
                        <>
                    <Button onClick={()=> destroyReview()}variant="outline-danger" size='sm'>
                        Delete Review    
                    </Button>
                    </>
        :
        null
        }
        </Card.Body>
    </Card>
    </>
    )
}

export default ShowReview