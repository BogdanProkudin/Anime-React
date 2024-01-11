import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AxiosError } from 'axios';
interface AuthInitialProps {
  UserData: { UserName: string; Email: string; Password: string };
  UserRegistationErrors: RegistrationErrorResponse;
}
interface RegistrationResponse {
  UserName: string;
  Email: string;
  Password: string;
}
interface LoginResponse {
  UserName: string;
  Password: string;
}
interface RegistrationErrorResponse {
  EmailError: string;
  UserNameError: string;
}
const initialState: AuthInitialProps = {
  UserData: { UserName: '', Email: '', Password: '' },
  UserRegistationErrors: { EmailError: '', UserNameError: '' },
};
export const UserRegistration = createAsyncThunk<void, RegistrationResponse, { rejectValue: any }>(
  'Registration/fetchUserData',
  async function (data, { rejectWithValue }) {
    try {
      await axios.post<RegistrationResponse>('http://localhost:3003/Registration', data);
    } catch (error) {
      console.log('ERROR WHEN FETCHING USER DATA', error);

      const customError: Record<string, string> = {};

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<RegistrationErrorResponse>;
        //ВОт Здесб ошибка с бэкенда обрабатывается
        if (axiosError.response && axiosError.response.data) {
          const { EmailError, UserNameError } = axiosError.response.data;

          if (EmailError === 'Email already taken') {
            customError.EmailError = 'Email already taken';
          }

          if (UserNameError === 'UserName already taken') {
            customError.UserNameError = 'UserName already taken';
          }

          return rejectWithValue(customError);
        }
      }

      return rejectWithValue(customError);
    }
  },
);
export const UserLogin = createAsyncThunk<void, LoginResponse>(
  'LogIn/fetchUserData',
  async function (data: any, { rejectWithValue }) {
    try {
      const response = await axios.post('http://localhost:3003/LogIn', data);
      const token: string | undefined = response.data.token;
      const user = response.data.user;
      const userString = JSON.stringify(user);

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('CurrentUser', userString);
      }
      if (!token) {
        return rejectWithValue('Неверная почта или пароль');
      }
      return response.data;
    } catch (err) {
      console.log('ERROR WHEN FERCHING USERDATA LOGING:', err);
    }
  },
);
const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    ['Registration/fetchUserData/pending']: (state) => {},
    ['Registration/fetchUserData/fulfilled']: (state, action) => {
      state.UserData = action.payload;
    },
    ['Registration/fetchUserData/rejected']: (state, action) => {
      state.UserRegistationErrors = action.payload;
    },

    ['LogIn/fetchUserData/pending']: (state) => {},
    ['LogIn/fetchUserData/fulfilled']: (state, action) => {},
    ['LogIn/fetchUserData/rejected']: (state, action) => {},
  },
});

export const auth = AuthSlice.reducer;
