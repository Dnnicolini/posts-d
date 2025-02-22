import axios from "axios";
import React, { useEffect, useState } from "react";
import { showSuccess, showError } from "../services/toastService";

const CommentInput = ({edit, post, value, type }) => {
    const [formData, setFormData] = useState({
        post_uuid: post?.uuid,
        comment: value?.comment || "",
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
            const response = await axios.post(
               edit ? `/update-comment/${value?.uuid}` : "/create-comment",
                formData, 
                { headers: { "Content-Type": "application/json" } }
            );

            showSuccess(response.data.message);

            setFormData({
                post_uuid: post?.uuid,
                comment: "",
            });

            window.location.reload();
        } catch (error) {
            showError(error.response?.data?.error || "Ocorreu um erro");
        }
    };

    return (
        <div className="post-box mt-2">
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
                        <button className="btn btn-none align-self-center" type="submit">
                            <img src="/icons/sendIcon.svg" alt="send" width={18} />
                        </button>
                    </span>
                </div>
            </form>
        </div>
    );
};

export default CommentInput;
