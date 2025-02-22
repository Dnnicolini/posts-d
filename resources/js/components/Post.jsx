import React, { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import axios from "axios";
import CommentInput from "./CommentInput";
import { showSuccess, showError, showConfirmation } from "../services/toastService";
import EditModal from "./EditModal";


const Post = ({ post, userInfo, link }) => {
    const { user } = useContext(AuthContext);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [type, setType] = useState("");
    const [content, setContent] = useState([]);
    const editContent = async (type, uuid) => {
        setType(type);
        try {
            const endpoint = type === "post" ? `/get-post/${uuid}/` : `/get-comment/${uuid}/`;
            const response = await axios.get(endpoint);
            
            setContent(response.data);
            setShowModalEdit(true);
        } catch (error) {
            showError(error.response?.data?.error || "An error occurred");
        }
    }        

    const deletePost = async (post) => {
        showConfirmation(
            async () => {
                try {
                    const response = await axios.delete(`/delete-post/${post.uuid}`);
                    showSuccess(response.data.message);
                    window.location.reload();
                } catch (error) {
                    showError(error.response?.data?.error || "Erro ao excluir o post."); 
                }
            },
            () => {
                showError("Exclusão cancelada."); 
            }
        );
    };

    const deleteComment = async (uuid) => {
        showConfirmation(
            async () => {
                try {
                    const response = await axios.delete(`/delete-comment/${uuid}`);
                    showSuccess(response.data.message);
                    window.location.reload();
                } catch (error) {
                    showError(error.response?.data?.error || "Erro ao excluir o comentário."); 
                }
            },
            () => {
                showError("Exclusão cancelada."); 
            }
        )
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
                {userInfo?.username === user?.username && (

                <button onClick={() => { editContent("post", post.uuid) }} className="btn ms-2 btn-none m-0 p-0 text-end">
                                        <img
                                            src="/icons/editIcon.svg"
                                            alt="edit"
                                            width={18}
                                        />
                                    </button>
                )}
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
                {user && <CommentInput post={post} />}


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
                                    <span className="d-flex align-items-center text-secondary">
                                        ({comment.user.username})
                                        {user?.username === comment.user?.username && (<>
                                            <button onClick={() => { deleteComment(comment.uuid) }} className="btn btn-none m-0 p-0">
                                                <img
                                                    src="/icons/trashIcon.svg"
                                                    alt="trash"
                                                    width={20}
                                                />
                                            </button>
                                            <button onClick={() => { editContent("comment", comment.uuid) }} className="btn btn-none m-0 p-0">
                                                <img
                                                    src="/icons/editIcon.svg"
                                                    alt="edit"
                                                    width={18}
                                                />
                                            </button>
                                        </>
                                        )}</span>

                                </div>
                                <p className="">{comment.comment}</p>

                            </>
                        ))}
                    </div>
                </div>
                <div className="d-flex justify-content-end align-items-center">
                    <a href={post.link} className="btn btn-none  ms-0 ps-0 post-icon">
                        <img
                            src="/icons/shareIcon.svg"
                            alt="share"
                            width={20}
                        />
                    </a>
                    {userInfo?.username === user?.username && (
                        <button onClick={() => { deletePost(post) }} className="btn btn-none post-icon">
                            <img
                                src="/icons/trashIcon.svg"
                                alt="trash"
                                width={26}
                            />
                        </button>
                    )}

                </div>
            </div>

            {showModalEdit && <EditModal showEdit={showModalEdit} handleClose={() => setShowModalEdit(false)} typeForm={type} content={content} />}

        </div>

    );
};

export default Post;
