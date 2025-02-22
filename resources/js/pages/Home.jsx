import React, { use, useContext, useEffect, useState } from 'react';
import Post from '../components/Post';
import PostInput from '../components/PostInput';
import { AuthContext } from '../components/context/AuthContext';
import axios from 'axios';

const Home = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    axios.get('/all-posts')
      .then(response => {
        setPosts(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="body">
      <div className="container   align-items-center justify-content-center post">
        {user && <PostInput />}
        {posts?.map((post, index) => (
          <Post key={index} post={post} userInfo={post.user} />
        ))}
      </div>
    </div>
  );


};

export default Home;