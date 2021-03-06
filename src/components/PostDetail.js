import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

function PostDetail(props) {
  const { post, onClickingDelete} = props;
  return (
    <React.Fragment>
      <h1>Post Details</h1>
      <h3>User Name: {post.name}</h3>
      <h3>Message content: {post.message}</h3>
      <h3>(U+1F44D) {post.upVote}</h3>
      <h3> &#x1f44e; {post.downVote}</h3>
      <button onClick={props.onClickingEdit}>Update post</button>
      <button onClick={props.onClickingDelete}>Delete post</button>
      <hr />
    </React.Fragment>
  );
}


PostDetail.propTypes = {
  post: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func
};

export default PostDetail;