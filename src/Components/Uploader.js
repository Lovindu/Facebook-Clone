import { Avatar, Modal } from '@material-ui/core';
import React, { useState } from 'react';
import './Uploader.css';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import { db, storage } from '../firebase';
import firebase from 'firebase';

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 40;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '0px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      borderRadius: 5,
      ['@media (max-width: 480px)'] :{
        width: 200,
    }
    },
    
  }));

function Uploader({username}) {
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState('');

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                console.log(error);
                alert(error.message);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: username
                        });
                        setProgress(0);
                        setCaption('');
                        setImage(null);
                        setOpen(false);
                    });
            }
        )
    }

    return (
        <div className="uploader">
            <div className="uploader__top">
                <Avatar />
                <input type="text" placeholder={`What's on your mind, ${username}?`} onClick={() => setOpen(true)}/>
            </div>
            
            <div className="uploader__bottom">
                <div className="uploader__bottomButton" onClick={() => setOpen(true)}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd6VXLb77PcboYnV8JQUVYYEdBzFeBCTfX_mnKMyMkhJubeXQ8SF4hz6v7P4l6eNyfYjU&usqp=CAU" alt=""/>
                    <p>Live video</p>
                </div>

                <div className="uploader__bottomButton" onClick={() => setOpen(true)}>
                    <img src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-13.png" alt="" />
                    <p>Photo/video</p>
                </div>

                <div className="uploader__bottomButton" onClick={() => setOpen(true)}>
                    <img src="https://w7.pngwing.com/pngs/198/368/png-transparent-facebook-like-button-computer-icons-emoticon-wow-wow-reaction-emoji-thumbnail.png" alt="" />
                    <p>Feeling/Activity</p>
                </div>
            </div>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                    <div className="uploader__modaltop">
                        <h3>Create post</h3>
                        <CloseIcon className="uploader__close" onClick={() => setOpen(false)}/>
                    </div>
                    <div className="uploader__modalbottom">
                        <div className="uploader__modalUser">
                            <Avatar />
                            <p>{username}</p>
                        </div>
                        
                        <input type="text" placeholder={`What's on your mind, ${username}?`} className="modal__caption" value={caption} onChange={event => setCaption(event.target.value)}/>
                        <progress value={progress} max="100"/>
                        <input type="file" onChange={handleChange}/>
                        <Button className="modal__postButton" onClick={handleUpload} disabled={!caption, !image}>Post</Button>
                    </div>
                    
                </div>

            </Modal>

        </div>
    )
}

export default Uploader;
