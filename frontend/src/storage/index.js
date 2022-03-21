import { storageActions } from "../reducers";




// Middleware для сохранения разделов из ветки 'storage' (reducerNames.storageData) в SessionStorage
export const storageMiddleware = (state) => (next) => (action) => {
    // выполняем событие
    const result = next(action);

    // сверяем, что action из раздела Storage (action.type из storageActions)
    if (Object.keys(storageActions).some((item) => item === action.payload.name)) {
        // сохраняем всю ветку в Storage (уже новую - после выполнения action-а)
        sessionStorage.setItem(action.payload.name, JSON.stringify(state.getState()[action.payload.name]));
    }
    return result;
}