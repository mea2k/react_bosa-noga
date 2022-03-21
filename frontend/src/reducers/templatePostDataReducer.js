import { createSlice } from '@reduxjs/toolkit';
import { statusTypes } from '../store/storeTypes';


// ITEMS - массив элементов [ {...}, ... ]
// STATUS - состояние данных в STORE {'loading', 'error', 'success', 'idle'}
// RESULT - результат выполнения POST-запроса {...}
const defaultState = {
    result: {},
    status: statusTypes.IDLE
};

// ГЕНЕРАТОР функций-генераторов и функций-обработчиков
// PARAMS:
//   name - название ветки
//   url - URL backend-сервера для GET-запросов
//   initialState - начальное заполнение state в этой ветке
const generatePostDataReducer = ({ name, url, initialState = defaultState }) => createSlice({
    name: name,
    initialState: initialState,
    reducers: {

        // Отправка POST-запроса с данными (state не меняется)
        // статус: LOADING
        // payload: данные
        // Доп параметры, которые передаются в качестве параметра ActionCreator-у,
        // В результате в middleware доступны данные:
        // action.type - тип события
        // action.payload.name - имя reducer-ветки (storageActions[name] и storageResucers[name])
        // action.payload.url - URL для доступа к backend-серверу
        // action.payload.data - сами данные события
        postDataRequest: {
            reducer: (state, action) => {
                state.result = {};
                state.status = statusTypes.LOADING;
            },
            prepare: (data) => ({
                payload: {
                    data,
                    name,
                    url
                }
            })
        },

        // Успешное выполнение запроса
        // Результат сохраняется в result
        // статус: SUCCESS
        // payload: {...}
        // Middleware запрос НЕ ПЕРЕХВАТЫВАЕТ
        postDataSuccess(state, action) {
            state.result = action.payload;
            state.status = statusTypes.SUCCESS;
        },


        // Неуспешное выполнение запроса
        // Код и описание ошибки содержится в result
        // статус: ERROR
        // payload: ErrorMessage
        // Middleware запрос НЕ ПЕРЕХВАТЫВАЕТ
        postDataError(state, action) {
            state.result = action.payload;
            state.status = statusTypes.ERROR;
        },

        // Очистка результатов выполнения запроса
        // статус: IDLE
        // payload: -
        // Middleware запрос НЕ ПЕРЕХВАТЫВАЕТ
        clearPostResult(state, action) {
            state.result = {};
            state.status = statusTypes.IDLE;
        },

        // Установка статуса (status)
        // payload: statusType (IDLE, SUCCESS, ERROR, LOADING)
        // Middleware запрос НЕ ПЕРЕХВАТЫВАЕТ
        setStatus(state, action) {
            // проверка на корректность данных
            if (Object.keys(statusTypes).indexOf(action.payload) !== -1)
                state.status = action.payload;
        }



    },
});


export default generatePostDataReducer;