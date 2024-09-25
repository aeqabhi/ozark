"use client"
import { useState,useRef } from "react";

import dynamic from "next/dynamic";
const JoditEditor = dynamic(()=>import("jodit-react"),{ssr:false})

export default function page() {

    const editor = useRef(null);
	const [content, setContent] = useState('');
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
                                                    Blog Name
                                                </label>
                                                <input
                                                    name="email"
                                                    id="exampleEmail11"
                                                    placeholder="Enter the Testimonial name"
                                                    type="email"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Blog URL
                                                </label>
                                                <input
                                                    name="email"
                                                    id="exampleEmail11"
                                                    placeholder="Enter the Testimonial url"
                                                    type="email"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Short Description
                                                </label>
                                                <input
                                                    name="email"
                                                    id="exampleEmail11"
                                                    placeholder="Enter the short description"
                                                    type="email"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            {/* <div className="position-relative form-group">
                                                <label>
                                                    Short Description
                                                </label>
                                                <input
                                                    name="email"
                                                    id="exampleEmail11"
                                                    placeholder="Enter the short description"
                                                    type="email"
                                                    className="form-control"
                                                />
                                            </div> */}
                                        </div>
                                        <div className="col-md-12">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Meta Description
                                                </label>
                                                <JoditEditor
                                                    ref={editor}
                                                    value={content}
                                                    
                                                    tabIndex={1}
                                                    onBlur={(newContent) => setContent(newContent)}
                                                    onChange={(newContent) => {}}
                                                />
                                            </div>
                                        </div>
                                    </div>


                                    <button className="mt-2 btn btn-primary">Create </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
