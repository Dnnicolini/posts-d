import React, { useContext } from 'react';
import Post from '../components/Post';
import PostInput from '../components/PostInput';
import { AuthContext } from '../components/context/AuthContext';

const Home = () => {
    const { user } = useContext(AuthContext);

    const posts = [
        { image: '/images/posts/comida.jpeg', content: 'Content 1', user: { name: 'John Doe', avatar: '/images/posts/flores.jpeg' } },
        { image: '/images/posts/flores.jpeg', content: 'Content 2',  user: { name: 'John Doe', avatar: '/images/posts/flores.jpeg' }},
        { image: '/images/posts/paisagem.jpeg', content: 'Content 3',  user: { name: 'John Doe', avatar: '/images/posts/flores.jpeg' }},
        { content: 'Content none', user: { name: 'John Doe', avatar: '/images/posts/flores.jpeg' } },

      ];

  return (
    <div className="body">
        <div className="container  my-4 align-items-center justify-content-center post">
           {user && <PostInput />} 
            {posts.map((post, index) => (
                <Post key={index} image={post.image} content={post.content} user={post.user} />
            ))}
        </div>
    </div>
  );
 

};

export default Home;