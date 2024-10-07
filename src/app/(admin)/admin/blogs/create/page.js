"use client"
import { useState, useRef } from "react";

import dynamic from "next/dynamic";
import axios from "axios";
import { BASE_URL } from "@/_config/config";
import { toast } from "react-toastify";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false })
import { useRouter } from "next/navigation";

export default function page() {

    const editor = useRef(null);
    const [inputValue, setInputvalue] = useState({
        heading: "", blog_url: "", blog_date: "",short_description: "", title: "", meta_description: ""
    });
    const [imageData, setImageData] = useState();
    const [content, setContent] = useState("");
    const config = {
        height: 400,
    };
    const router = useRouter();


    const handleInputValues = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputvalue({ ...inputValue, [name]: value });
    }

    const handleCreate = async (e) => {
        try {
            e.preventDefault();
            const formdata = new FormData();
            formdata.append("heading", inputValue.heading);
            formdata.append("blog_url", inputValue.blog_url);
            formdata.append("blog_date", inputValue.blog_date);
            formdata.append("short_description", inputValue.short_description);
            formdata.append("title", inputValue.title);
            formdata.append("meta_description", inputValue.meta_description);
            formdata.append("description", content);
            formdata.append("image", imageData);

            const res = await axios.post(`${BASE_URL}/blogs/create-blog`, formdata);
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

    const handleImageData = (e) => {
        setImageData(e.target.files[0]);
    }

    console.log(imageData);


    return (
        <>
            <div className="app-main__inner">

                <div className="row">
                    <div className="col-md-12 col-xl-12">
                        <div className="main-card mb-3 card">
                            <div className="card-header">
                                Create Blog

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
                                                    placeholder="Enter the blog url"
                                                    type="text"
                                                    className="form-control"
                                                    onChange={handleInputValues}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Blog Date
                                                </label>
                                                <input
                                                    name="blog_date"
                                                    type="date"
                                                    className="form-control"
                                                    onChange={handleInputValues}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Image
                                                </label>
                                                <input
                                                    name="Image"
                                                    type="file"
                                                    className="form-control"
                                                    onChange={handleImageData}
                                                    accept="image/*"
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
                                                    onChange={handleInputValues}>
                                                </textarea>
                                            </div>
                                        </div>
                                        <div className="col-md-6">

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
                                                    config={config}
                                                    tabIndex={1}
                                                    onBlur={(newContent) => setContent(newContent)}
                                                    onChange={(newContent) => { }}
                                                />
                                            </div>
                                        </div>
                                    </div>


                                    <button className="mt-2 btn btn-primary" onClick={handleCreate}>Create </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
