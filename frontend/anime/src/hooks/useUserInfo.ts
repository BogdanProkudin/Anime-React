import { useState, useEffect } from 'react';
import axios from 'axios';

// Определение интерфейса для данных пользователя
export type UserInfo = {
  user: {
    id: string;
    UserName: string;
    Email: string;
    Password: string;
    toWatch: string[]; // Если массив содержит строки
    createdAt: string; // Дата создания пользователя
    updatedAt: string; // Дата последнего обновления
    __v: number; // Версия документа в базе данных MongoDB
    _id: string; // Идентификатор документа в базе данных MongoDB
  };
};

// Кастомный хук для получения информации о пользователе
const useUserInfo = () => {
  const storedUserString = localStorage.getItem('CurrentUser');
  const storedUser = storedUserString !== null ? JSON.parse(storedUserString) : 'NOT FOUND';
  // Состояние для хранения данных пользователя
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  // Состояние для отслеживания загрузки данных
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // Состояние для отслеживания ошибок
  const [error, setError] = useState<string | null>(null);

  // Функция для выполнения запроса на сервер
  const fetchUserInfo = async () => {
    try {
      // Выполнение запроса на сервер для получения данных пользователя
      const response = await axios.get<UserInfo>(
        `http://localhost:3003/getUserInfo?userId=${storedUser._id}`,
      ); // Замените '/api/userinfo' на реальный путь к вашему эндпоинту
      console.log(response);

      // Установка полученных данных в состояние
      setUserInfo(response.data);
      // Установка isLoading в false, так как данные успешно загружены
      setIsLoading(false);
    } catch (error: any) {
      // Обработка ошибок
      setError(error.message || 'Произошла ошибка при получении данных пользователя');
      // Установка isLoading в false, так как произошла ошибка
      setIsLoading(false);
    }
  };

  // Вызов функции для получения данных пользователя

  const refetchUserInfo = async () => {
    await fetchUserInfo();
  };

  useEffect(() => {
    fetchUserInfo();
  });

  return { userInfo, isLoading, error, refetchUserInfo };
};
const useToWatchStatus = (animeTitle: string | undefined, userId: string) => {
  const [isToWatch, setIsToWatch] = useState(false);

  useEffect(() => {
    async function fetchIsToWatch() {
      try {
        const response = await axios.get(
          `http://localhost:3003/CheckIsToWatch?animeTitle=${animeTitle}&userId=${userId}`,
        );
        console.log(response, 'RESPONSE');

        setIsToWatch(response.data.isInToWatchList);
      } catch (error) {
        console.error('Error checking if anime is in To Watch list:', error);
      }
    }
    if (userId) {
      fetchIsToWatch();
    }
  }, [animeTitle, userId]);

  return isToWatch;
};
export { useToWatchStatus, useUserInfo };
