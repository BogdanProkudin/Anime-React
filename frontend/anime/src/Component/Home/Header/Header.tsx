import React from 'react';
import styles from './styles.module.scss';

import HeaderInput from './HeaderInput';
import HeaderButton from './HeaderButton';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery({ query: '(min-width: 767px)' });
  const isPhoneScreen = useMediaQuery({ query: '(max-width: 500px)' });
  return (
    <div className={styles.header}>
      <div className={styles.header_container}>
        <h1 onClick={() => navigate('/Home')} className={styles.header_title}>
          AnimePro
        </h1>

        <HeaderInput />
        <div className={styles.header_button_container}>
          <HeaderButton
            placeholderText="Log In"
            width={isPhoneScreen ? '50px' : '90px'}
            backgroundColor="black"
            textColor="white"
          />

          <HeaderButton
            placeholderText={'Get started'}
            backgroundColor={'white'}
            width={isPhoneScreen ? '63px' : '114px'}
            textColor={'black'}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
