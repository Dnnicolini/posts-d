import React, { useContext, useEffect, useState } from 'react';
import Post from '../components/Post';
import { AuthContext } from '../components/context/AuthContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CommentInput from '../components/CommentInput';

const IndividualPost = () => {
  const { user } = useContext(AuthContext);
  const { uuid } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/individual-post/' + uuid)
      .then(response => {
        setPost(response.data);
        setLoading(false); 
      })
      .catch(error => {
        setLoading(false); 
      });
  }, [uuid]);

  if (loading) {
    return <div className="container text-center my-4">Carregando...</div>;
  }

  if (!post) {
    return <div className="container text-center my-4">Post não encontrado.</div>;
  }

  return (
    <div className="body">
      <div className="container my-4 align-items-center justify-content-center post ">
        <Post post={post} userInfo={post.user} />
      </div>
    </div>
  );
};

export default IndividualPost;
