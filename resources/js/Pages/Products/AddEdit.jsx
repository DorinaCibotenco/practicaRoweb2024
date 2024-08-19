import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AddEdit = () => {
    const [product, setProduct] = useState({
        name: '',
        order: '',
        price: '',
        image: null,
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchProduct();
        }
    }, [id]);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`/api/products/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleFileChange = (e) => {
        setProduct({ ...product, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('order', product.order);
        formData.append('price', product.price);
        if (product.image) {
            formData.append('image', product.image);
        }

        try {
            if (id) {
                await axios.post(`/api/products/${id}`, formData);
            } else {
                await axios.post('/api/products', formData);
            }
            navigate('/products');
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    return (
        <div className="container">
            <h1>{id ? 'Edit Product' : 'Add Product'}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        name="name" 
                        value={product.name} 
                        onChange={handleInputChange} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="order" className="form-label">Order</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="order" 
                        name="order" 
                        value={product.order} 
                        onChange={handleInputChange} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input 
                        type="number" 
                        step="0.01" 
                        className="form-control" 
                        id="price" 
                        name="price" 
                        value={product.price} 
                        onChange={handleInputChange} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image</label>
                    <input 
                        type="file" 
                        className="form-control" 
                        id="image" 
                        name="image" 
                        onChange={handleFileChange} 
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {id ? 'Update Product' : 'Add Product'}
                </button>
            </form>
        </div>
    );
};

export default AddEdit;
