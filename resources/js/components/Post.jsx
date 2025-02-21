import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import axios from "axios";

const Post = ({post, userInfo, link }) => {
      const { user } = useContext(AuthContext);
    const deletePost = async () => {
        try {
            await axios.delete(`/delete-post/${post.uuid}`);
            window.location.reload();
        } catch (error) {
            console.log(error);
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
                <div>
                    <button className="btn btn-none post-icon">
                        <img
                            src="/icons/commentIcon.svg"
                            alt="comment"
                            width={20}
                        />
                    </button>
                    <a href={post.link} className="btn btn-none ms-2 post-icon">
                        <img
                            src="/icons/shareIcon.svg"
                            alt="share"
                            width={20}
                        />
                    </a>
                    {userInfo?.username === user?.username && (
                           <button onClick={() => {deletePost()}} className="btn btn-none ms-1 post-icon">
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
