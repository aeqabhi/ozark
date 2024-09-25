"use client"

import { BASE_URL } from "@/_config/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";




export default function SubCategoryEdit() {
    const [inputData, setInputData] = useState();
    const [categoryData, setCategoryData] = useState();
    const router = useRouter();
    const SearchParams = useSearchParams()
    const id = SearchParams.get("id");


    useEffect(() => {
        getCategoryData();
        getOneSubcategoryData()
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

    const getOneSubcategoryData = async () => {
        try {
            const res = await axios.post(`${BASE_URL}/subcategory/get_one_subcategories`, { id: id });
            if(res.data.status === 1){
                setInputData(res.data.data);
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

    

    const handleUpdateCategory = async (e) => {
        try {
            e.preventDefault();
            inputData.id = id;
            const res = await axios.post(`${BASE_URL}/subcategory/update_subcategory`, inputData);
            if (res.data.status === 1) {
                toast.success(res.data.message);
                router.push("/admin/subcategory/view")
            } else {
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
                                Edit Subcategory
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
                                                    value={inputData?.subcategory_name}
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
                                                    value={inputData?.subcategory_slug}
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
                                                    value={inputData?.short_desc}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <button className="mt-2 px-3 btn btn-primary" onClick={handleUpdateCategory}>Update</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
