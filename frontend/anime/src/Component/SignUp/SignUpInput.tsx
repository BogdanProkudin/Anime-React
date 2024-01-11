import { useState } from 'react';
import styles from './styles.module.scss';
import { BsEyeSlash, BsEye } from 'react-icons/bs';
import { FieldErrors } from 'react-hook-form/dist/types/errors';
import { UseFormRegister } from 'react-hook-form';
import { InputValues } from './SignUp';
import { useAppSelector } from '../../redux/hook';
import FocusLock from 'react-focus-lock';
interface ErrorText {
  Email: {
    message: string;
  };
  UserName: {
    message: string;
  };
  Password: {
    message: string;
  };
}
interface ISignInInput {
  placeholderText: 'UserName' | 'Password' | 'Email';
  type: string;
  register: UseFormRegister<InputValues>;
  inputErrors: FieldErrors | ErrorText;
}
const SignUpInput: React.FC<ISignInInput> = ({ placeholderText, type, register, inputErrors }) => {
  const [showPassword, setShowPassword] = useState(false);
  const passwordregex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
  const usernameRegex: RegExp = /^[a-zA-Z0-9][a-zA-Z0-9_]{3,24}$/;
  const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const RegisterErrorMessages = useAppSelector((state) => state.auth.UserRegistationErrors);
  console.log('ERRORS', RegisterErrorMessages);

  return (
    <FocusLock disabled={true}>
      <div>
        <div className={styles.SignUpInputContainer}>
          <input
            {...register(placeholderText, {
              required: 'Поле Дожлно быть заполнено',
              pattern: {
                value:
                  placeholderText === 'Password'
                    ? passwordregex
                    : placeholderText === 'UserName'
                    ? usernameRegex
                    : emailRegex,
                message:
                  placeholderText === 'Password'
                    ? 'Некорректный пароль'
                    : placeholderText === 'UserName'
                    ? 'Некорректное имя пользователя'
                    : 'Некорректный Email',
              },
            })}
            className={styles.SignUpInput}
            placeholder={`${placeholderText}`}
            type={!showPassword ? type : 'text'}
          />
          {type === 'password' && !showPassword && (
            <BsEyeSlash
              onClick={() => setShowPassword(!showPassword)}
              className={styles.SignUpInputPassword}
            />
          )}
          {type === 'password' && showPassword && (
            <BsEye
              onClick={() => setShowPassword(!showPassword)}
              className={styles.SignUpInputPassword}
            />
          )}
        </div>
        {/* Логика для отображения ошибки при регистрации для каждого инпута */}
        {inputErrors.Email || inputErrors.Password || inputErrors.UserName ? (
          <span style={{ color: 'red', position: 'absolute' }}>
            {placeholderText === 'Email'
              ? `${inputErrors.Email?.message ? inputErrors.Email?.message : ''}`
              : placeholderText === 'UserName'
              ? `${inputErrors.UserName?.message ? inputErrors.UserName?.message : ''}`
              : `${inputErrors.Password?.message ? inputErrors.Password?.message : ''}`}
          </span>
        ) : (
          ''
        )}
        {RegisterErrorMessages.EmailError.length > 0 ||
        RegisterErrorMessages.UserNameError.length > 0 ? (
          <span style={{ color: 'red' }}>
            {placeholderText === 'Email' && RegisterErrorMessages.EmailError
              ? `${RegisterErrorMessages.EmailError}`
              : placeholderText === 'UserName'
              ? `${RegisterErrorMessages.UserNameError}`
              : ''}
          </span>
        ) : (
          ''
        )}
      </div>
    </FocusLock>
  );
};
export default SignUpInput;
