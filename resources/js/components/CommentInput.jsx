import axios from "axios";
import React, { useState } from "react";
import { showSuccess, showError } from "../services/toastService";

const CommentInput = ({ post }) => {
    const [formData, setFormData] = useState({
        post_uuid: post.uuid,
        comment: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/create-comment", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            showSuccess(response.data.message);

            setFormData({
                comment: "",
            });
            window.location.reload();
        } catch (error) {
            showError(error.response.data.error);
        }
    };

    return (
        <>
            <div className="post-box mt-2 ">
                <form onSubmit={handleSubmit}>
                    <div className="input-group input-group-sm flex-nowrap mb-3">
                        <input
                            type="text"
                            className="form-control border-1"
                            placeholder="Talk about this post"
                            name="comment"
                            value={formData.comment}
                            onChange={handleChange}
                        />
                        <span className="input-group-text">
                            {" "}
                            <button
                                className="btn btn-none align-self-center"
                                type="submit"
                            >
                                <img
                                    src="/icons/sendIcon.svg"
                                    alt="send"
                                    width={18}
                                />
                            </button>
                        </span>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CommentInput;
