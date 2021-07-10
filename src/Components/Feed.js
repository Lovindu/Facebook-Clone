import React, { useEffect, useState } from 'react';
import './Feed.css';
import Post from './Post';
import { auth, db } from '../firebase';
import { Button } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Input } from '@material-ui/core';
import { Email } from '@material-ui/icons';
import Uploader from './Uploader';
import CloseIcon from '@material-ui/icons/Close';

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
      ['@media (max-width: 480px)'] :{
        width: 250,
    }
    },
  }));

function Feed() {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [opensignIn, setOpensignIn] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                console.log(authUser);
                setUser(authUser);
            } else {
                setUser(null);
            }
        })

        return () => {
            unsubscribe();
        }

    }, [user, username]);


    useEffect(() => {
            db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
                setPosts(snapshot.docs.map(doc => ({
                    id: doc.id,
                    post: doc.data()
                })));
            })
    }, [])

    const signUp = (event) => {
        event.preventDefault();

        auth
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
            authUser.user.updateProfile({
                displayName: username
            })
        })
        .catch((error) => alert(error.message))

        setOpen(false);
    };

    const signIn = (event) => {
        event.preventDefault();

        auth
        .signInWithEmailAndPassword(email, password)
        .catch((error) => alert(error.message));

        setOpensignIn(false);
    }

    return (
        <div className="feed">

            <div className="feed__modal">
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <div style={modalStyle} className={classes.paper}>

                    <form className="feed__from">
                    <CloseIcon className="modal__close" onClick={() => setOpen(false)}/>
                        <center>
                            <img className="modal__image" src="http://www.lytics.com/wp-content/uploads/2021/01/Facebook-Logo.png" alt=""/>
                        </center>

                        <Input 
                            placeholder="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <Input 
                            placeholder="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input 
                            placeholder="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Button className="feed__button" type="submit" onClick={signUp}>Sign Up</Button>
                    </form>
                      
                </div>

            </Modal>

            <Modal
                open={opensignIn}
                onClose={() => setOpen(false)}
            >
                <div style={modalStyle} className={classes.paper}>

                    <form className="feed__from">
                        <CloseIcon className="modal__close" onClick={() => setOpensignIn(false)}/>
                        <center>
                            <img className="modal__image" src="http://www.lytics.com/wp-content/uploads/2021/01/Facebook-Logo.png" alt=""/>
                        </center>

                        <Input 
                            placeholder="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input 
                            placeholder="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Button className="feed__button" type="submit" onClick={signIn}>Sign In</Button>
                    </form>
                      
                </div>

            </Modal>
            </div>

            <div className="feed__buttons">
                { user ? (
                    <Button className="feed__button" onClick={() => auth.signOut()}>Logout</Button>
                ) : (
                    <div>
                        <Button className="feed__button" onClick={() => setOpensignIn(true)}>Login</Button>
                        <Button className="feed__button" onClick={() => setOpen(true)}>Sign Up</Button>
                    </div>
                )
                }               
            </div>
            
            {user?.displayName ? (
                <Uploader username={user.displayName}/>
            ) : (
                <h3 className="login__error">Sorry you have to login to make a post</h3>
            )}
            

            {
                posts.map(({id, post}) => (
                    <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
                ))
            }
        </div>
    )
}

export default Feed;
