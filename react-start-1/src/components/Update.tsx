import React from 'react';

interface Update { // We could just make a template html page and then display them
  id: number;
  title: string;
  content: string;
  date: string;
}

const updates: Update[] = [
  //Fetch from database 
  {
    id: 1,
    title: 'First Blog Post',
    content: 'Posting',
    date: '2023-08-02',
  },
  {
    id: 2,
    title: 'Second Blog Post',
    content: 'Yuh',
    date: '2023-08-03',
  },
  
];

const Update: React.FC = () => {
  return (
    <div>
      <h1>Blog</h1>
      {updates.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>Published on: {post.date}</p>
        </div>
      ))}
    </div>
  );
};

export default Update;
