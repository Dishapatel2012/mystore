import React, { useRef } from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../Layout/AxiosInstance';

const ManageProducts = () => {
    const validate = () => {
    const errors = {};

    if (!productData.categoryId) errors.categoryId = "Required";
    if (!productData.image) errors.image = "Required";
    if (!productData.productName) errors.productName = "Required";
    if (!productData.productDescription) errors.productDescription = "Required";
    if (!productData.productPrice) errors.productPrice = "Required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
};
    const [errors, setErrors] = useState({});
    const [products, setProducts] = useState();
    const [categories, setCategories] = useState([]);
    const fileInputRef = useRef(null);

    const [productData, setProductData] = useState({
        image: "",
        productName: "",
        productDescription: "",
        productPrice: "",
        categoryId: ""
    });
    const fetchCategories = async () => {
        try {
            const response = await axios.get("http://localhost:3000/categories");
            console.log(response.data);
            setCategories(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchManageProducts = async () => {
        try {
            const response = await axios.get("http://localhost:3000/products");
            console.log(response.data);
            setProducts(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchManageProducts();
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
        const formData = new FormData();

        formData.append("image", productData.image);
        formData.append("productName", productData.productName);
        formData.append("productDescription", productData.productDescription);
        formData.append("productPrice", productData.productPrice);
        formData.append("categoryId", productData.categoryId);

        const response = await axiosInstance.post(
            "/add-product",
            formData
        );

        alert(response.data.message);

        setProductData({
            image: "",
            productName: "",
            productDescription: "",
            productPrice: "",
            categoryId: "",
        });

        setErrors({});
        fileInputRef.current.value = null;
        fetchManageProducts();

    } catch (err) {
        console.log(err);
    }
};

    return (
        <div>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="card shadow-lg border-0">
                            <div className="card-header bg-primary text-white text-center">
                                <h3>Manage Products</h3>
                            </div>

                            <div className="card-body">
                                <form onSubmit={handleSubmit}>

                                    *<label className="form-label">Category</label>

                                    <select
                                        value={productData.categoryId}
                                        className={`form-control ${errors.categoryId ? "is-invalid" : ""}`}
                                        onChange={(e) => {
                                            setProductData({ ...productData, categoryId: e.target.value });
                                            setErrors({ ...errors, categoryId: "" });
                                        }}
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map((category) => (
                                            <option key={category._id} value={category._id}>
                                                {category.categoryName}
                                            </option>
                                        ))}
                                    </select>

                                    {errors.categoryId && (
                                        <div className="invalid-feedback">
                                            {errors.categoryId}
                                        </div>
                                    )}
                                    <div className="mb-3">
                                        *<label className="form-label">Product Image</label>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            className={`form-control ${errors.image ? "is-invalid" : ""}`}
                                            onChange={(e) => {
                                                setProductData({ ...productData, image: e.target.files[0] });
                                                setErrors({ ...errors, image: "" });
                                            }}
                                        />

                                        {errors.image && (
                                            <div className="invalid-feedback">
                                                {errors.image}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Product Name</label>
                                        <input
                                            type="text"
                                            value={productData.productName}
                                            className={`form-control ${errors.productName ? "is-invalid" : ""}`}
                                            placeholder="Enter Product Name"
                                            onChange={(e) => {
                                                setProductData({
                                                    ...productData,
                                                    productName: e.target.value,
                                                });
                                                setErrors({ ...errors, productName: "" });
                                            }}
                                        />

                                        {errors.productName && (
                                            <div className="invalid-feedback">
                                                {errors.productName}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        *<label className="form-label">Product Description</label>
                                        <textarea
                                            rows="3"
                                            value={productData.productDescription}
                                            className={`form-control ${errors.productDescription ? "is-invalid" : ""}`}
                                            placeholder="Enter Product Description"
                                            onChange={(e) => {
                                                setProductData({
                                                    ...productData,
                                                    productDescription: e.target.value,
                                                });
                                                setErrors({ ...errors, productDescription: "" });
                                            }}
                                        ></textarea>

                                        {errors.productDescription && (
                                            <div className="invalid-feedback">
                                                {errors.productDescription}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Product Price</label>
                                        <input
                                            type="number"
                                            value={productData.productPrice}
                                            className={`form-control ${errors.productPrice ? "is-invalid" : ""}`}
                                            placeholder="Enter Product Price"
                                            onChange={(e) => {
                                                setProductData({
                                                    ...productData,
                                                    productPrice: e.target.value,
                                                });
                                                setErrors({ ...errors, productPrice: "" });
                                            }}
                                        />

                                        {errors.productPrice && (
                                            <div className="invalid-feedback">
                                                {errors.productPrice}
                                            </div>
                                        )}
                                    </div>
                                    <div className="d-grid">
                                        <button className="btn btn-primary btn-lg" type="submit">
                                            Add Product
                                        </button>
                                    </div>
                                </form>
                            </div>


                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Category</th>
                                        <th>Category Image</th>
                                        <th>Product Name</th>
                                        <th>Description</th>
                                        <th>Price</th>
                                        <th>Image</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products?.map((product) => (
                                        <tr key={product?._id}>
                                            <td>{product?.categoryId?.productName}</td>
                                            <td>
                                                <img src={`http://localhost:3000/uploads/${product?.categoryId?.image}`} alt={product.productName} style={{ width: '100px', height: '100px' }} />

                                            </td>
                                            <td>{product?.productName}</td>
                                            <td>{product?.productDescription}</td>
                                            <td>${product?.productPrice?.toFixed(2)}</td>
                                            <td>
                                                <img src={`http://localhost:3000/uploads/${product?.image}`} alt={product.productName} style={{ width: '100px', height: '100px' }} />
                                            </td>
                                            <td>
                                                <button className="btn btn-primary btn-sm me-2">Edit</button>
                                                <button className="btn btn-danger btn-sm">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageProducts
