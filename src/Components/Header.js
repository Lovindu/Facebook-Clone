import React from 'react';
import './Header.css';
import { Avatar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import GroupIcon from '@material-ui/icons/Group';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import AddIcon from '@material-ui/icons/Add';
import ChatIcon from '@material-ui/icons/Chat';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }));

function Header({usernamee}) {
    const classes = useStyles();

    return (
        <div className="header">

            <div className="header__left">
                <img src="https://cdn.iconscout.com/icon/free/png-256/facebook-logo-2019-1597680-1350125.png" alt=""/>
                <div className="header__search">
                    <SearchIcon className="header__searchIcon" />
                    <input placeholder="Search Facebook" />
                </div>
            </div>

            <div className="header__icons">
                <HomeIcon className="header__icon"/>
                <PeopleOutlineIcon className="header__icon"/>
                <OndemandVideoIcon className="header__icon"/>
                <GroupIcon className="header__icon"/>
                <VideogameAssetIcon className="header__icon"/>
            </div>

            <div className="header__right">
                <Avatar className={classes.small}/> 
                <div className="headerRight__icons">
                  <AddIcon />
                </div>

                <div className="headerRight__icons">
                  <ChatIcon />
                </div>

                <div className="headerRight__icons">
                  <NotificationsActiveIcon />
                </div>

                <div className="headerRight__icons">
                  <ArrowDropDownIcon />
                </div>
            </div>
        </div>
    )
}

export default Header;
