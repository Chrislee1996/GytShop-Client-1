import apiUrl from '../apiConfig'
import axios from 'axios'


// POST -> create function
export const addReview = (user, productId, newReview) => {
    return axios({
        url: `${apiUrl}/reviews/${productId}`,
        method: 'POST',
        header: {
            Authorization:`Token token=${user.token}`
        },
        data: { review: newReview }
    })
}

// PATCH -> update function
export const updateReview = (user, productId, reviewId, updatedReview) => {
    return axios({
        url: `${apiUrl}/reviews/${productId}/${reviewId}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { review: updatedReview }
    })
}



// DELETE -> remove function
export const removeReview = (user, productId, reviewId) => {
    return axios({
        url: `${apiUrl}/reviews/${productId}/${reviewId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}