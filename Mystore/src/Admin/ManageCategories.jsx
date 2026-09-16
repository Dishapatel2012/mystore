import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../Layout/AxiosInstance";
const ManageCategories = () => {
    const [categories, setCategories] = useState([]);
    const [categoryData, setCategoryData] = useState({
        image: "",
        categoryName: "",
    });

    const fetchCategories = async () => {
        try {
            const response = await axiosInstance.get("http://localhost:3000/categories");
            setCategories(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", categoryData.image);
        formData.append("categoryName", categoryData.categoryName);

        try {
            const response = await axiosInstance.post("add-category", formData);

            console.log(response.data);

            setCategoryData({
                image: "",
                categoryName: "",
            });

            fetchCategories();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-7">
                    <div className="card shadow-lg border-0">
                        <div className="card-header bg-primary text-white text-center">
                            <h3>Manage Categories</h3>
                        </div>

                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Category Image</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        onChange={(e) =>
                                            setCategoryData({
                                                ...categoryData,
                                                image: e.target.files[0],
                                            })
                                        }
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Category Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={categoryData.categoryName}
                                        onChange={(e) =>
                                            setCategoryData({
                                                ...categoryData,
                                                categoryName: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                <button className="btn btn-primary w-100">
                                    Add Category
                                </button>
                            </form>
                        </div>

                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Category Name</th>
                                    <th>Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category) => (
                                    <tr key={category._id}>
                                        <td>{category.categoryName}</td>
                                        <td>
                                            <img
                                                src={`http://localhost:3000/uploads/${category.image}`}
                                                alt={category.categoryName}
                                                width="100"
                                                height="100"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageCategories;