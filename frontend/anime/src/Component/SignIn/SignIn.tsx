import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import image from '../icons/958ed8fb87aae5e913bfbf144a6cb606-removebg-preview.png';
import SignInButton from './SignInButton';
import SignInInput from './SignInInput';
import WelcomeText from './SignInWelcomeText';
import styles from './styles.module.scss';
import { useAppDispatch } from '../../redux/hook';
import { UserLogin } from '../../redux/slices/Auth';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

export interface SignInInputValues {
  UserName: string;
  Password: string;
}

const SignInPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInputValues>({ mode: 'onBlur' });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<SignInInputValues> = async (data: any) => {
    const response: any = await dispatch(UserLogin(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.SignInContainer}>
        <div className={styles.SignInItems}>
          <WelcomeText />
          <SignInInput register={register} placeholderText="UserName" type="text" />
          <SignInInput register={register} placeholderText="Password" type="password" />
          <SignInButton />
          <p className={styles.SignInNoAccount}>
            <a style={{ textDecoration: 'none' }} href="/Registration ">
              Dont have an account?
            </a>
          </p>
        </div>
        <img className={styles.SignInImage} src={image} alt="Animeimage" />
      </div>
    </form>
  );
};

export default SignInPage;
