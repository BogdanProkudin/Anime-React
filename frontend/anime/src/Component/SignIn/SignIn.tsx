import { SubmitHandler, useForm } from 'react-hook-form';
import image from '../icons/958ed8fb87aae5e913bfbf144a6cb606-removebg-preview.png';
import SignInButton from './SignInButton';
import SignInInput from './SignInInput';
import WelcomeText from './SignInWelcomeText';
import styles from './styles.module.scss';
import { useAppDispatch } from '../../redux/hook';
import { UserLogin } from '../../redux/slices/Auth';
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

  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<any> = async (data: SignInInputValues) => {
    const response = await dispatch(UserLogin(data));
    console.log('Пришли данные 123', response);
  };
  return (
    <form style={{ background: 'red' }} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.SignInContainer}>
        <div className={styles.SignInItems}>
          <WelcomeText />
          <SignInInput register={register} placeholderText="UserName" type="text" />
          <SignInInput register={register} placeholderText="Password" type="password" />

          <SignInButton />
          <p className={styles.SignInNoAccount}>
            <a style={{ textDecoration: 'none' }} href="*">
              Dont have an account?
            </a>
          </p>
        </div>
        <img className={styles.SignInImage} src={`${image}`} alt="Animeimage" />
      </div>
    </form>
  );
};

export default SignInPage;
