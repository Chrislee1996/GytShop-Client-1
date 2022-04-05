import React, { useState } from 'react'
import {Modal} from 'react-bootstrap'
import { updateProduct } from '../../api/products'
import ProductForm from '../shared/ProductForm'

const EditProductsModel = (props) => {
    const { user, show, handleClose, updateProduct, triggerRefresh } = props
    const [product, setProduct] = useState(props.product)

    const handleChange = (e) => {
        e.persist()

        setProduct(prevProduct => {
            const name = e.target.name
            let value = e.target.value
    
            if (e.target.type === 'number') {
                value = parseInt(e.target.value)
            }
            const updatedValue = { [name]: value }

            return {...prevProduct, ...updatedValue}
        })
    }



    const handleSubmit = (e) => {
        
        e.preventDefault()
        console.log('here is our user in edit', user)
        updateProduct(user,product)
            .then(() => handleClose())
            .then(()=> triggerRefresh())
            .catch(console.error)
    }
    
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body className='bg-dark text-info'>
                <ProductForm 
                    product={product}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Edit Product!"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditProductsModel
