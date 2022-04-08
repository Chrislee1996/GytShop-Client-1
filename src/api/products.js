import apiUrl from '../apiConfig'
import axios from 'axios'

// GET -> Index function
export const getAllProducts = () => {
    return axios(`${apiUrl}/products`)
}

//GET -> MINE index
export const getMyProducts = (user) => {
    return axios({
        url:`${apiUrl}/products/mine`,
        method: 'GET',
        headers: {
            Authorization:`Token token=${user.token}`
        }
    })
}

// GET -> Electronics category
export const getAllElectronics = () => {
    return axios(`${apiUrl}/products/electronics`)
}

// GET -> Collectibles category
export const getAllCollectibles = () => {
    return axios(`${apiUrl}/products/collectibles`)
}

// GET -> Clothing category
export const getAllClothing = () => {
    return axios(`${apiUrl}/products/clothing`)
}


// GET -> Show function
export const getOneProduct = (productId) => {
    return axios(`${apiUrl}/products/${productId}`)
}

// POST -> Create function
export const createProduct = (user, newProduct) => {
    console.log('user in creating a product', user)
    return axios({
        url: `${apiUrl}/products`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },  
        data: { product: newProduct }
    })
}

// PATCH -> Update function
export const updateProduct = (user, updatedProduct ) => {
    console.log('user in editing product' ,user)
    return axios({
        url: `${apiUrl}/products/${updatedProduct._id}/edit`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { product: updatedProduct }
    })
}

// DELETE -> Remove function
export const removeProduct = (user, productId) => {
    console.log('user in deleting product', user)
    return axios({
        url: `${apiUrl}/products/${productId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}


// *************** SHOPPING CART AXIOS CALLS ***************

// GET -> Shopping Cart of currently logged in user
export const getAllCartItems = (userId, user) => {
    return axios({
        url: `${apiUrl}/orders/${userId}`,
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`
        },
    })
}

// POST -> Add to Cart
export const addToCart = (productId, user, addProduct) => {
    console.log({ productId })
    return axios({
        url: `${apiUrl}/products/${productId}`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { product: addProduct }
    })
}

// PATCH -> Update cart
export const updateCart = (user, updatedProduct) => {
    console.log('this is the updated Product', updatedProduct)
    return axios({
        url: `${apiUrl}/products/${updatedProduct.id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { product: updatedProduct }
    })
}

// DELETE -> Remove Cart Product
export const removeCartProducts = (user) => {
    console.log( user , 'in delete many')
    return axios({
        url: `${apiUrl}/orders/${user._id}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { product: '' }
    })
}

// PATCH -> Update Address
export const updateAddress = (user, updatedOrder, orderId) => {
    console.log('ORDER ID: ', orderId)
    return axios({
        url: `${apiUrl}/products/${orderId}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: {order: updatedOrder}
    })
}


// DELETE -> Remove One Cart Product
export const removeOneCartProduct = (user, product) => {
    return axios({
        url: `${apiUrl}/orders/${user._id}/${product._id}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { product: '' }
    })
} 
// *************** ORDER / CHECKOUT AXIOS API CALLS ***************

// PUT -> update Order
// export const updateOrder = (user, updatedOrder) => {
//     return(axios({
//         url: `${apiUrl}/products/${updatedOrder.id}`,
//         method: 'PUT',
//         headers: {
//             Authorization: `Token token=${user.token}`
//         },
//         data: { order: updatedOrder }
//     }))
// }

// GET -> Checkout
// export const getAllCheckoutItems = (user, userId) => {
//     return axios({
//         url: `${apiUrl}/orders/${userId}/payment`,
//         method: 'GET',
//         headers: {
//             Authorization: `Token token=${user.token}`
//         }
//     })
// }

// GET -> Confirmation
export const getConfirmation = (user, userId) => {
    return axios({
        url: `${apiUrl}/orders/${userId}/confirmation`,
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}