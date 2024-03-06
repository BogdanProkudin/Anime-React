import SignUpWelcomeText from './SignUpWelcomeText';
import image from '../icons/958ed8fb87aae5e913bfbf144a6cb606-removebg-preview.png';
import styles from './styles.module.scss';
import SignUpInput from './SignUpInput';
import SignUpButton from './SignUpButton';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../redux/hook';
import { UserRegistration } from '../../redux/slices/Auth';
import FocusLock from 'react-focus-lock';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export type InputValues = {
  UserName: string;
  Email: string;
  Password: string;
};
const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputValues>({ mode: 'onBlur' });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<InputValues> = async (data: InputValues) => {
    const response = await dispatch(UserRegistration(data));
    console.log(response);
    navigate('/LogIn');
  };
  return (
    <FocusLock disabled={true}>
      <form style={{ background: 'black' }} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.SignUpContainer}>
          <div className={styles.SignUpItems}>
            <SignUpWelcomeText />
            <SignUpInput
              register={register}
              placeholderText={'Email'}
              type="Email"
              inputErrors={errors}
            />
            <SignUpInput
              register={register}
              placeholderText={'UserName'}
              type="text"
              inputErrors={errors}
            />
            <SignUpInput
              register={register}
              placeholderText={'Password'}
              type="password"
              inputErrors={errors}
            />

            <SignUpButton />
            <p>
              <a
                className={styles.SignUPHaveAccount}
                style={{ textDecoration: 'none' }}
                href="/LogIn"
              >
                Have account already?
              </a>
            </p>
          </div>
          <img className={styles.SignUpImage} src={`${image}`} alt="Animeimage" />
        </div>
      </form>
    </FocusLock>
  );
};

export default SignUpPage;
