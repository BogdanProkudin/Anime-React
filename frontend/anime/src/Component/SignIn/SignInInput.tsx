import { useState } from 'react';
import styles from './styles.module.scss';
import { BsEyeSlash, BsEye } from 'react-icons/bs';
import { UseFormRegister } from 'react-hook-form';
import { SignInInputValues } from './SignIn';
interface ISignInInput {
  placeholderText: 'UserName' | 'Password';
  type: string;
  register: UseFormRegister<SignInInputValues>;
}
const SignInInput: React.FC<ISignInInput> = ({ placeholderText, type, register }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={styles.SignInInputContainer}>
      <div>
        <input
          {...register(placeholderText, {
            required: 'Поле Дожлно быть заполнено',
          })}
          className={styles.SignInInput}
          placeholder={`${placeholderText}`}
          type={!showPassword ? type : 'text'}
        />
        {type === 'password' && !showPassword && (
          <BsEyeSlash
            onClick={() => setShowPassword(!showPassword)}
            className={styles.SignInInputPassword}
          />
        )}
        {type === 'password' && showPassword && (
          <BsEye
            onClick={() => setShowPassword(!showPassword)}
            className={styles.SignInInputPassword}
          />
        )}
      </div>
      <span style={{ color: 'red' }}>error</span>
    </div>
  );
};
export default SignInInput;
