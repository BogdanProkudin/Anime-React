import React, { useState } from 'react';
import styles from './styles.module.scss';

import HeaderBigScreenInput from './HeaderInputBigScreen';
import avatar from '../../icons/anime-style-game-avatar-mascot-600nw-2322112663.webp';
import HeaderButton from './HeaderButton';
import { useMediaQuery } from 'react-responsive';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import HeaderInputSmallScreen from './HeaderInputSmallScreen';
const Header = () => {
  const navigate = useNavigate();

  const isSmallScreen = useMediaQuery({ query: '(min-width: 683px)' });
  const token = localStorage.getItem('token');

  const isPhoneScreen = useMediaQuery({ query: '(max-width: 500px)' });
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  return (
    <div className={styles.header}>
      <div className={styles.header_container}>
        <h1 onClick={() => navigate('/Home')} className={styles.header_title}>
          AnimePro
        </h1>

        {isSmallScreen && <HeaderBigScreenInput />}
        {isSearchOpen && !isSmallScreen && <HeaderInputSmallScreen />}
        <div className={styles.header_button_container}>
          {!isSmallScreen && (
            <FaMagnifyingGlass onClick={() => setIsSearchOpen(!isSearchOpen)} color="grey" />
          )}
          {token === null ? (
            <>
              <div onClick={() => navigate('/Registration')}>
                <HeaderButton
                  placeholderText="Log In"
                  width={isPhoneScreen ? '50px' : '90px'}
                  backgroundColor="black"
                  textColor="white"
                />
              </div>
              <div onClick={() => navigate('/LogIn')}>
                <HeaderButton
                  placeholderText={'Get started'}
                  backgroundColor={'white'}
                  width={isPhoneScreen ? '63px' : '114px'}
                  textColor={'black'}
                />
              </div>
            </>
          ) : (
            <div className={styles.avatar_container}>
              <img
                onClick={() => navigate('/Settings')}
                src={avatar}
                alt="Profile Picture"
                className={styles.avatar_img}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
