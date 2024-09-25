"use client"
import { useState, useRef, useEffect } from "react";

import dynamic from "next/dynamic";
import axios from "axios";
import { BASE_URL } from "@/_config/config";
import { toast } from "react-toastify";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false })
import { useRouter, useSearchParams } from "next/navigation";

export default function BlogEdit() {

    const editor = useRef(null);
    const [content, setContent] = useState();
    const config = {
        height: 400,
    };

    const [inputValue, setInputvalue] = useState({});
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    useEffect(() => {
        if (id) {
            getBlogData();
        }
    }, [id])

    const getBlogData = async () => {
        try {
            const res = await axios.post(`${BASE_URL}/blogs/get_blog_byId`, { id: id })
            console.log(res.data);
            if (res.data.status === 1) {
                setInputvalue(res.data.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleInputValues = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputvalue({ ...inputValue, [name]: value });
    }

    console.log(inputValue);
    const handleUpdate = async (e) => {
        try {
            e.preventDefault();
            const formdata = new FormData();
            // formdata.append("heading",inputValue?.heading);
            // formdata.append("blog_url",inputValue?.blog_url);
            // formdata.append("blog_date",inputValue?.blog_date);
            // formdata.append("blog_date",inputValue?.blog_date);
            // formdata.append("short_description",inputValue?.short_description);
            // formdata.append("meta_description",inputValue?.meta_description);
            // formdata.append("description",content);
            // formdata.append("image",imageData);
            inputValue.id = id;

            const res = await axios.post(`${BASE_URL}/blogs/update_blog`, inputValue);
            if (res.data.status === 1) {
                toast.success(res.data.message);
                router.push("/admin/blogs/view")
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
                                Edit Blog

                            </div>

                            <div className="card-body">
                                <form >
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Heading
                                                </label>
                                                <input
                                                    name="heading"
                                                    id="exampleEmail11"
                                                    placeholder="Enter the heading"
                                                    type="text"
                                                    className="form-control"
                                                    onChange={handleInputValues}
                                                    value={inputValue?.heading}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Blog URL
                                                </label>
                                                <input
                                                    name="blog_url"
                                                    id="exampleEmail11"
                                                    placeholder="Enter the Testimonial url"
                                                    type="text"
                                                    className="form-control"
                                                    onChange={handleInputValues}
                                                    value={inputValue?.blog_url}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Short Description
                                                </label>
                                                <textarea name="short_description" id=""
                                                    placeholder="Enter the short Description"
                                                    className="form-control"
                                                    onChange={handleInputValues}
                                                    value={inputValue?.short_description}>
                                                </textarea>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mt-3">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Blog Date
                                                </label>
                                                <input
                                                    name="blog_date"
                                                    type="date"
                                                    className="form-control"
                                                    onChange={handleInputValues}
                                                    value={inputValue?.blog_date}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Title
                                                </label>
                                                <input
                                                    name="title"
                                                    id="exampleEmail11"
                                                    placeholder="Enter the title"
                                                    type="text"
                                                    className="form-control"
                                                    onChange={handleInputValues}
                                                    value={inputValue?.title}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Meta Description
                                                </label>
                                                <input
                                                    name="meta_description"
                                                    id="exampleEmail11"
                                                    placeholder="Enter the meta description"
                                                    type="text"
                                                    className="form-control"
                                                    onChange={handleInputValues}
                                                    value={inputValue?.meta_description}
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
                                                    value={inputValue?.description}
                                                    config={config}
                                                    tabIndex={1}
                                                    onBlur={(newContent) => setContent(newContent)}
                                                    onChange={(newContent) => { }}
                                                />
                                            </div>
                                        </div>
                                    </div>


                                    <button className="mt-2 btn btn-primary" onClick={handleUpdate}>Update </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
