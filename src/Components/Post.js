import React, { useEffect, useState } from 'react';
import './Post.css';
import { Avatar } from '@material-ui/core';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import { db } from '../firebase';
import firebase from 'firebase';

function Post({postId, user, username, caption, imageUrl}) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()));
                });
        }

        return () => {
            unsubscribe();
        };
    }, [postId])

    const postComment = (event) => {
        event.preventDefault();

        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
    }

    return (
        <div className="post">
            <div className="post__header">
                <div className="postHeader__top">
                    <Avatar className="postHeader__avatar"/>
                    <p>{username}</p>
                </div>
                <p className="post__caption">{caption}</p>
            </div>
            
            <div className="post__imageContainer">
                <center>
                <img className="post__image" src={imageUrl} alt=""/>
                </center>
            </div>
            

            <div className="post__bottom">
                <div className="post__like">
                    <ThumbUpAltOutlinedIcon />
                    <p>Like</p>
                </div>

                <div className="post__comment">
                    <ChatBubbleOutlineOutlinedIcon />
                    <p>Comment</p>
                </div>
            </div>

            <form className="comment__form">
                <Avatar className="comment__avatar"/>
                <div className="comment__box">
                    <input 
                    className="comment__input"
                    placeholder="Write a comment..."
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}/>

                    <button 
                    className="comment__button"
                    type="submit"
                    disabled={!comment}
                    onClick={postComment}
                    >
                        Post
                    </button>
                </div>
            </form>

            <div className="post__comments">
                {comments.map((comment) =>(
                    <div className="post__commentBox">
                        <Avatar className="comment__avatar"/>
                        <div className="post__commentBox_item">
                            <strong>{comment.username}</strong>
                            <p>{comment.text}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Post
