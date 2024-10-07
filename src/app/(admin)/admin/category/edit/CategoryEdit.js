"use client"
import { useState, useRef, useEffect } from "react";
import JoditEditor from 'jodit-react';
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "@/_config/config";
import { toast } from "react-toastify";

export default function CategoryEdit() {

    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [inputData, setInputData] = useState({});
    const [imageData, setImageData] = useState();
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const config = {
        height: 400,
    };


    const handleInputData = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputData({ ...inputData, [name]: value });
    }

    const handleImageData = (e) => {
        setImageData(e.target.files[0]);
    }

    useEffect(() => {
        if (id) {
            getoneCategoryData();
        }
    }, [id])

    const getoneCategoryData = async () => {
        try {
            const res = await axios.post(`${BASE_URL}/category/get_one_category`, { id: id });
            if (res.data.status === 1) {
                setInputData(res.data.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    console.log(inputData);
    
    const handleUpdateCategory = async (e) => {
        try {
            e.preventDefault();
            const formdata = new FormData();
            formdata.append("category_name", inputData.category_name);
            formdata.append("category_slug", inputData.category_slug);
            formdata.append("short_desc", inputData.short_desc);
            formdata.append("meta_title", inputData.meta_title);
            formdata.append("meta_desc", inputData.meta_desc);
            formdata.append("description", content);
            formdata.append("image", imageData);
            formdata.append("id", id);
            const res = await axios.post(`${BASE_URL}/category/update_category`,formdata);
            if (res.data.status === 1) {
                toast.success(res.data.message);
                router.push("/admin/category/view");
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
                                Edit Category
                            </div>
                            <div className="card-body">
                                        <form >
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="position-relative form-group">
                                                        <label>
                                                            Category Name
                                                        </label>
                                                        <input
                                                            onChange={handleInputData}
                                                            name="category_name"
                                                            placeholder="Enter the category name"
                                                            type="text"
                                                            className="form-control"
                                                            value={inputData?.category_name}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="position-relative form-group">
                                                        <label>
                                                            Category URL
                                                        </label>
                                                        <input
                                                            onChange={handleInputData}
                                                            name="category_slug"
                                                            type="text"
                                                            placeholder="Enter the category url"
                                                            className="form-control"
                                                            value={inputData?.category_slug}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="position-relative form-group">
                                                        <label>
                                                            Short Description
                                                        </label>
                                                        <input
                                                            onChange={handleInputData}
                                                            name="short_desc"
                                                            placeholder="Enter the short description"
                                                            type="text"
                                                            className="form-control"
                                                            value={inputData?.short_desc}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="position-relative form-group">
                                                        <label>
                                                            Image
                                                        </label>
                                                        <input
                                                            onChange={handleImageData}
                                                            name="image"
                                                            placeholder="Enter the short description"
                                                            type="file"
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="position-relative form-group">
                                                        <label>
                                                            Meta Title
                                                        </label>
                                                        <input
                                                            onChange={handleInputData}
                                                            name="meta_title"
                                                            placeholder="Enter the short description"
                                                            type="text"
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="position-relative form-group">
                                                        <label>
                                                            Meta Description
                                                        </label>
                                                        <input
                                                            onChange={handleInputData}
                                                            name="meta_desc"
                                                            placeholder="Enter the short description"
                                                            type="text"
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="position-relative form-group">
                                                        <label>
                                                            Description
                                                        </label>
                                                        <JoditEditor
                                                            ref={editor}
                                                            value={content}
                                                            tabIndex={1}
                                                            config={config}
                                                            onChange={(newContent) => setContent(newContent)}
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
