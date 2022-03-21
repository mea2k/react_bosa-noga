import { combineReducers } from "redux";
import { reducerNames } from "../const/reducerNames";
import generateItemDetailsReducer from "./templateItemDetailsReducer";
import generateItemsReducer from "./templateItemsReducer";
import generatePostDataReducer from "./templatePostDataReducer";
import generateStorageReducer from "./templateStorageReducer";



// генераторы и обработчики событий для списка элементов
const reducersItemsSlices = reducerNames.reducersListData.reduce((prev, item) => ({ ...prev, [item.name]: generateItemsReducer({ ...item }) }), {});

// генераторы и обработчики событий для одного элемента
const reducersItemDetailsSlices = reducerNames.reducersItemData.reduce((prev, item) => ({ ...prev, [item.name]: generateItemDetailsReducer({ ...item }) }), {});

// генераторы и обработчики событий для работы со Storage
const reducersStorageSlices = reducerNames.storageData.reduce((prev, item) => ({ ...prev, [item.name]: generateStorageReducer({ ...item }) }), {});

// генераторы и обработчики событий для POST-запросов
const reducersPostDataSlices = reducerNames.postData.reduce((prev, item) => ({ ...prev, [item.name]: generatePostDataReducer({ ...item }) }), {});



// комбинируем только обработчики событий
// {reducers[name1].reducer, reduder[name2].reducer, ... }
export const rootReducer = combineReducers(
    {
        ...Object.keys(reducersItemsSlices).reduce((prev, item) => ({ ...prev, [item]: reducersItemsSlices[item].reducer }), {}),
        ...Object.keys(reducersItemDetailsSlices).reduce((prev, item) => ({ ...prev, [item]: reducersItemDetailsSlices[item].reducer }), {}),
        ...Object.keys(reducersStorageSlices).reduce((prev, item) => ({ ...prev, [item]: reducersStorageSlices[item].reducer }), {}),
        ...Object.keys(reducersPostDataSlices).reduce((prev, item) => ({ ...prev, [item]: reducersPostDataSlices[item].reducer }), {}),
    }
);

// комбинируем генераторы событий
// {reducers[name1].actions, reduder[name2].actions, ... }
export const listActions = Object.keys(reducersItemsSlices).reduce((prev, item) => ({ ...prev, [item]: reducersItemsSlices[item].actions }), {});
export const itemActions = Object.keys(reducersItemDetailsSlices).reduce((prev, item) => ({ ...prev, [item]: reducersItemDetailsSlices[item].actions }), {});
export const storageActions = Object.keys(reducersStorageSlices).reduce((prev, item) => ({ ...prev, [item]: reducersStorageSlices[item].actions }), {});
export const postActions = Object.keys(reducersPostDataSlices).reduce((prev, item) => ({ ...prev, [item]: reducersPostDataSlices[item].actions }), {});

//export const rootActions = { ...reducersItemsActions, ...reducersItemDetailsActions };

