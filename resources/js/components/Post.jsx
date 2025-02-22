import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import axios from "axios";
import CommentInput from "./CommentInput";
import { showSuccess, showError } from "../services/toastService";


const Post = ({ post, userInfo, link }) => {
    const { user } = useContext(AuthContext);

    const deletePost = async () => {
        try {
           const response = await axios.delete(`/delete-post/${post.uuid}`);
            window.location.reload();
            showSuccess(response.data.message);
        } catch (error) {
            showError(error.response.data.error);
        }
    }

    const deleteComment = async (uuid) => {
        try {
            await axios.delete(`/delete-comment/${uuid}`);
            window.location.reload();
            showSuccess(response.data.message);
        } catch (error) {
            showError(error.response.data.error);
        }
    }
    return (
        <div className="card mb-3 border-0 shadow p-0  ">
            <div className="card-header d-flex align-items-center">
                <img
                    src={userInfo.avatar}
                    alt="User Avatar"
                    className="post-avatar"
                />
                <span className="post-username">{userInfo.name}</span>
                <span className="ms-2 text-secondary">({userInfo.username})</span>
            </div>
            <div className="post-image-container">
                {post.image && (
                    <img src={post.image} alt="Post Image" className="post-image" />
                )}
            </div>
            <div className="card-body">
                <div className="card-text">
                    <p className="post-text">{post.post}</p>
                </div>
                <hr />
                {user &&  <CommentInput post={post} />}
               

                <div className=" card-text">

                    <p className="fw-semibold">Comments</p>
                    <div className="post-comment-container overflow-y-scroll">
                        {post.comments.map((comment, index) => (
                            <  >
                                <div className="  mt-2 d-flex align-items-center">
                                    <img
                                        src={comment.user.avatar}
                                        alt="User Avatar"
                                        className="post-avatar-small"
                                    />
                                    <span className="post-username-small">{comment.user.name}</span>
                                    <span className="d-flex align-items-center ms-1 text-secondary">
                                        ({comment.user.username})
                                                 {user?.username === comment.user?.username && (
                                        <button onClick={() => { deleteComment(comment.uuid) }} className="btn btn-none m-0 p-0">
                                            <img
                                                src="/icons/trashIcon.svg"
                                                alt="trash"
                                                width={20}
                                            />
                                        </button>
                                    )}:</span>
                                
                                </div>
                                <p className="">{comment.comment}</p>

                            </>
                        ))}
                    </div>
                </div>
                <div>
                    <a href={post.link} className="btn btn-none mt-2 ms-0 ps-0 post-icon">
                        <img
                            src="/icons/shareIcon.svg"
                            alt="share"
                            width={20}
                        />
                    </a>
                    {userInfo?.username === user?.username && (
                        <button onClick={() => { deletePost() }} className="btn btn-none ms-1 post-icon">
                            <img
                                src="/icons/trashIcon.svg"
                                alt="trash"
                                width={26}
                            />
                        </button>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Post;
