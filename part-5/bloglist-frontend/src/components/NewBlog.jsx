import React, { useState } from 'react';

const NewBlog = ({ blogService, blogs, setBlogs, user }) => {
  const [newBlog, setNewBlog] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const blogObject = {
      url: e.target.url.value,
      title: e.target.title.value,
      author: e.target.author.value,
      user: user,
      likes: 0,
    };

    console.log('Sending new blog', blogObject);

    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        setNewBlog('');
      })
      .catch((error) => console.error('Error creating blog', error));
  };

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">title:</label>
        <input type="text" id="title" name="title" />
        <label htmlFor="author">author:</label>
        <input type="text" id="author" name="author" />
        <label htmlFor="url">url:</label>
        <input type="text" id="url" name="url" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default NewBlog;
