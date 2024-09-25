"use client"

import { BASE_URL } from "@/_config/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


export default function page() {
    const [inputData, setInputData] = useState();
    const [categoryData, setCategoryData] = useState();
    const router = useRouter();

    useEffect(() => {
        getCategoryData();
    }, [])

    const getCategoryData = async () => {
        try {
            const res = await axios(`${BASE_URL}/category/get_all_categories`);
            if (res.data.status === 1) {
                setCategoryData(res.data.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputData({ ...inputData, [name]: value });
    }

    console.log(inputData);

    const handleCreateCategory = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.post(`${BASE_URL}/subcategory/create_subcategory`, inputData);
            if (res.data.status === 1) {
                toast.success(res.data.message);
                router.push("/admin/subcategory/view")
            }else{
                toast.error(res.data.message);
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <div className="app-main__inner">

                <div className="row">
                    <div className="col-md-12 col-xl-12">
                        <div className="main-card mb-3 card">
                            <div className="card-header">
                                Create Subcategory
                            </div>

                            <div className="card-body">
                                <form >
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Select Category
                                                </label>
                                                <select className="form-control" name="category_id" onChange={handleInputChange}>
                                                    <option defaultChecked hidden>select category</option>
                                                    {
                                                        categoryData?.map((ele) => (
                                                            <option value={ele._id}>{ele.category_name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Subcategory Name
                                                </label>
                                                <input
                                                    name="subcategory_name"
                                                    placeholder="Enter the subcategory name"
                                                    type="text"
                                                    className="form-control"
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    SubCategory URL
                                                </label>
                                                <input
                                                    name="subcategory_slug"
                                                    type="text"
                                                    placeholder="Enter the subcategory url"
                                                    className="form-control"
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Short Description
                                                </label>
                                                <input
                                                    name="short_desc"
                                                    placeholder="Enter the short description"
                                                    type="text"
                                                    className="form-control"
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <button className="mt-2 px-3 btn btn-primary" onClick={handleCreateCategory}>Create </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
