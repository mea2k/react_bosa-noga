import { createSlice } from '@reduxjs/toolkit';
import { statusTypes } from '../store/storeTypes';


// ITEMS - массив элементов [ {...}, ... ]
// STATUS - состояние данных в STORE {'loading', 'error', 'success', 'idle'}
// SELECTEDITEM - выбранный элемент {...}
const defaultState = {
    items: [],
    selectedItem: {},
    status: statusTypes.IDLE
};

// ГЕНЕРАТОР функций-генераторов и функций-обработчиков
// PARAMS:
//   name - название ветки
//   url - URL backend-сервера для GET-запросов
//   initialState - начальное заполнение state в этой ветке
const generateItemsReducer = ({ name, url, initialState = defaultState }) => createSlice({
    name: name,
    initialState: initialState,
    reducers: {

        // запрос на получение списка элементов (с удалением всех старых)
        // статус: LOADING
        // payload: -
        // Доп параметры (data, update), которые передаются в качестве параметров ActionCreator-у. 
        // В результате в middleware доступны данные:
        // action.type - тип события
        // action.payload.name - имя reducer-ветки (rootActions[name] и rootResucers[name])
        // action.payload.url - URL backend-сервера для запросов этой ветки reducer-ов
        // action.payload.data - доп. параметры для формирования запроса к backend-серверу
        // action.payload.update - используется в самом обработчике события (добавлять или заменять данные в items[])
       requestItems: {
            reducer: (state, action) => {
                if (!action.payload.update)
                    state.items = [];
                state.status = statusTypes.LOADING;
            },
            prepare: (data, update = false) => ({
                payload: data ? {
                    name,
                    url,
                    data,
                    update: update ? true : false
                } : {
                    name,
                    url,
                    update: update ? true : false
                },

            })
        },

        // заполнение массива элементов в случае успеха (БЕЗ удалением всех старых)
        // статус: SUCCESS
        // payload: [{...}, ...]
        // Middleware запрос НЕ ПЕРЕХВАТЫВАЕТ
        setItemsSuccess(state, action) {
            state.items = [...state.items, ...action.payload];
            state.status = statusTypes.SUCCESS;
        },

        // Установка статуса IDLE
        // результат SUCCESS, но новых данных нет или они последние
        // статус: IDLE
        // payload: -
        // Middleware запрос НЕ ПЕРЕХВАТЫВАЕТ
        setItemsIdle(state, action) {
            state.items = [...state.items, ...action.payload];
            state.status = statusTypes.IDLE;
        },

        // Неуспешное получение массива элементов (с удалением всех старых)
        // статус: ERROR
        // payload: -
        // Middleware запрос НЕ ПЕРЕХВАТЫВАЕТ
        setItemsError(state, action) {
            state.items = [];
            state.status = statusTypes.ERROR;
        },


        // Выбор указанного элемента и сохранение его в STORE
        // payload: сам элемент { }
        // Middleware запрос НЕ ПЕРЕХВАТЫВАЕТ
        selectItem(state, action) {
            state.selectedItem = action.payload;
        },


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
               state.status = statusTypes.LOADING;
               console.log('postDataRequest', action)
            },
            prepare: (data) => ({
                payload: {
                    data,
                    name,
                    url
                }
            })
        }


    },
});


export default generateItemsReducer;