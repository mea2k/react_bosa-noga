import { createSlice } from '@reduxjs/toolkit'
import { statusTypes } from '../store/storeTypes';


// InitialState
// ITEMS - список элементов [{...}]
const defaultState = {
    items: [],
    status: statusTypes.IDLE       // IDLE - текущий заказ или аустая корзина
    // SUCCESS - заказ успешно отправлен (данные в корзине пустые или не актуальны)
};


// заполнение начального состояния state из sessionStorage
const preLoadStorageState = (name, initialState) => {
    const data = sessionStorage.getItem(name);
    return data !== null ? JSON.parse(data) : initialState
}



// ГЕНЕРАТОР функций-генераторов и функций-обработчиков
// PARAMS:
//   name - название ветки
//   initialState - начальное заполнение state в этой ветке
const generateStorageReducer = ({ name, initialState = defaultState }) => createSlice({
    name: name,
    initialState: preLoadStorageState(name, initialState),
    reducers: {

        // запись массива элементов в state (с удалением старой информации)
        // payload: [{...}, {...}, ...]
        // status: IDLE
        // Доп параметр (name), который передается в качестве параметра ActionCreator-у,
        // попадает в action.payload.name
        // В результате в middleware доступны данные:
        // action.type - тип события
        // action.payload.name - имя reducer-ветки (storageActions[name] и storageResucers[name])
        // action.payload.data - сами данные события
        setItems: {
            reducer: (state, action) => {
                state.items = action.payload.data.sort();
                state.status = statusTypes.IDLE;
            },
            prepare: (data, name) => ({
                payload: {
                    data,
                    name
                }
            })
        },

        // Очистка массива элементов в state (с удалением старой информации)
        // payload: -
        // status: не меняется
        // Доп параметр (name), который передается в качестве параметра ActionCreator-у,
        // попадает в action.payload.name
        // В результате в middleware доступны данные:
        // action.type - тип события
        // action.payload.name - имя reducer-ветки (storageActions[name] и storageResucers[name])
        clearItems: {
            reducer: (state, action) => {
                state.items = [];
            },
            prepare: (name) => ({
                payload: {
                    name
                }
            })
        },


        // Установка статуса (status)
        // payload: statusType (IDLE, SUCCESS, ERROR, LOADING)
        // Доп параметр (name), который передается в качестве параметра ActionCreator-у,
        // попадает в action.payload.name
        // В результате в middleware доступны данные:
        // action.type - тип события
        // action.payload.data - тип события
        // action.payload.name - имя reducer-ветки (storageActions[name] и storageResucers[name])
        setStatus: {
            reducer: (state, action) => {
                // проверка на корректность данных
                if (Object.keys(statusTypes).some((item) => statusTypes[item] === action.payload.data))
                    state.status = action.payload.data;
            },
            prepare: (data, name) => ({
                payload: {
                    data,
                    name
                }
            })
        }
    }
});


export default generateStorageReducer;