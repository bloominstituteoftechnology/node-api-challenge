import React from 'react';

export default function Posts({posts}){

    return(
        <div>
            {posts && posts.map(post =>
                <h2>{post.text}</h2>)}
        </div>
    )
}