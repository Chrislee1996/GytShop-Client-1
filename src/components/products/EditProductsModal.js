import React, { useState } from 'react'
import {Modal} from 'react-bootstrap'
import ProductForm from '../shared/ProductForm'
import { updateProduct } from '../../api/products'


const EditProductsModal = (props) => {
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

        updateProduct(user,product)
            .then(() => handleClose())
            .then(()=> triggerRefresh())
            .catch(console.error)
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
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

export default EditProductsModal