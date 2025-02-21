import React, { use, useContext, useEffect, useState } from 'react';
import Post from '../components/Post';
import PostInput from '../components/PostInput';
import { AuthContext } from '../components/context/AuthContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const IndividualPost = () => {
  const { user } = useContext(AuthContext);
  const { uuid } = useParams();
  const [post, setPost] = useState([]);

useEffect(() => {
  console.log(uuid);
})
  useEffect(() => {
    axios.get('/individual-post/' + uuid)
      .then(response => {
        setPost(response.data);
        console.log(response.data);
      })
      .catch(error => {

      });
  }, []);

  return (
    <div className="body">
      <div className="container  my-4 align-items-center justify-content-center post">
          {/* <Post  post={post} userInfo={post.user} /> */}
      </div>
    </div>
  );


};

export default IndividualPost;