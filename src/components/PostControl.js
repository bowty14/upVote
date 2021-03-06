import React from 'react';
import PostList from './PostList';
import PostDetail from './PostDetail';
import NewPostForm from './NewPostForm';
import EditPostForm from './EditPostForm';

class PostControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      selectedPost: null,
      editing: false,
      postList: [
        {
          name: 'Pwnin Obrien',
          message: 'Every time I try to eat healthy...along comes Christmas, Summer, Friday, or Tuesday and absolutely ruins it for me.',
          upVote: 10,
          downVote: 6,
          id: '0'
        },
        {
          name: 'pwr2dapeephole',
          message: 'Today feels a lot more Tequila Tuesday than Taco Tuesday',
          upVote: 3,
          downVote: 17,
          id: '1'
        },
        {
          name: 'king_of_dairy_queen',
          message: 'Some days I amaze myself. Other days, I look for my glasses while still wearing them.',
          upVote: 73,
          downVote: 24,
          id: '2'
        },
        {
          name: 'Shaquille Oatmeal',
          message: 'If cauliflower can somehow become pizza, you my friend can do anything.',
          upVote: 118,
          downVote: 1,
          id: '3'
        }
      ]
    }
  }

  handleClick = () => {
    if (this.state.selectedPost !== null) {
      this.setState({
        formVisibleOnPage: false,
        selectedPost: null,
        editing: false
      })
    } else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage
      }));
    }
  }

  handleAddingNewPostToList = (newPost) => {
    const newPostList = this.state.postList.concat(newPost);
    this.setState({postList: newPostList,
                  formVisibleOnPage: false})
  }

  handleChangingSelectedPost = (id) => {
    const selectedPost = this.state.postList.filter(post => post.id === id)[0];
    this.setState({selectedPost: selectedPost});
  }

  handleDeletingPost = (id) => {
    const newPostList = this.state.postList.filter(post => post.id !== id);
    this.setState({
      postList: newPostList,
      selectedPost: null
    });
  }

  handleEditClick = () => {
    this.setState({editing: true});
  }

  handleEditingPostInList = (postToEdit) => {
    const editedPostList = this.state.postList
                            .filter(post => post.id !== this.state.selectedPost.id)
                            .concat(postToEdit);
    this.setState({
      postList: editedPostList,
      editing: false,
      selectedPost: null
    });
  }

  handleUpvotePost = (id) => {
    const upvotedPost = this.state.postList.filter(post => post.id === id)[0];
    upvotedPost.upVote += 1;
    const editedPostList = this.state.postList
                            .filter(post => post.id !== this.state.selectedPost.id)
                            .concat(upvotedPost);
    this.setState({
      postList: editedPostList
    });
  }

  handleDownvotePost = (id) => {
    const downvotedPost = this.state.postList.filter(post => post.id === id)[0];
    downvotedPost.downVote -= 1;
    const editedPostList = this.state.postList
                            .filter(post => post.id !== this.state.selectedPost.id)
                            .concat(downvotedPost);
    this.setState({
      postList: editedPostList
    });
  }

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;

    if (this.state.editing) {
      currentlyVisibleState = <EditPostForm
                              post = {this.state.selectedPost}
                              onEditPost = {this.handleEditingPostInList} />
      buttonText = 'Return to Post List'
    } else if (this.state.selectedPost !== null) {
      currentlyVisibleState = <PostDetail
                              post = {this.state.selectedPost}
                              onClickingDelete = {this.handleDeletingPost}
                              onClickingEdit = {this.handleEditClick}
                              onClickingUpvote = {this.handleUpvotePost}
                              onClickingDownvote = {this.handleDownvotePost} />
      buttonText = 'Return to Post List'
    } else if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewPostForm
                                onNewPostCreation = {this.handleAddingNewPostToList} />
      buttonText = 'Return to Post List';
    } else {
      currentlyVisibleState = <PostList
                              postList = {this.state.postList}
                              onPostSelection = {this.handleChanginSelectedPost} />
      buttonText = 'Add Post'
    }
    return(
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}

export default PostControl;