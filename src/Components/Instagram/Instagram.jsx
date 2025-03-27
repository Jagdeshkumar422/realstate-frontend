// import React, { useEffect, useState } from 'react';
// import './instagram.css';
// import Logo from "../../Assets/logo1.png";

// const Instagram = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     fetch(
//       'https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink&access_token=YOUR_ACCESS_TOKEN',
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         const imagePosts = data.data
//           .filter((post) => post.media_type === 'IMAGE')
//           .slice(0, 3);
//         setPosts(imagePosts);
//       })
//       .catch((error) =>
//         console.error('Error fetching Instagram posts:', error)
//       );
//   }, []);

//   const truncateCaption = (caption, maxLength) => {
//     if (!caption) return '';
//     return caption.length > maxLength
//       ? `${caption.substring(0, maxLength)}...`
//       : caption;
//   };

//   return (
//     <div className='instagram-main'>
//       <h2>Our Latest Instagram Posts</h2>
//     <div className='instagram-container'>
//       {posts.map((post) => (
//         <div key={post.id} className='instagram-post'>
//           <a href={post.permalink} target='_blank' rel='noopener noreferrer'>
//             <div className='instagram-header'>
//               <img
//                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2VsFDpTqg4tpD_UMGxk5RMJRW2lnnW-zEJw&s"
//                 alt='avatar'
//                 className='instagram-avatar'
//               />
//               <span className='instagram-username'>aimrealestateae</span>
//             </div>
//             <img src={post.media_url} alt='post' className='instagram-image' />
//             <p className='instagram-caption'>
//               {truncateCaption(post.caption, 100)}
//             </p>
//           </a>
//         </div>
//       ))}
//     </div>
//     </div>
//   );
// };

// export default Instagram;

import React from 'react';
import './instagram.css';

const Instagram = () => {
  return (
    <div className='instagram-main'>
      <h2>Our Instagram Feed</h2>
      <div className='instagram-container'>
        <div
          class='elfsight-app-e753eea4-487e-4700-ba1b-080a70941839'
          data-elfsight-app-lazy
        ></div>
      </div>
    </div>
  );
};

export default Instagram;
