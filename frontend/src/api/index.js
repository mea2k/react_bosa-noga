

// Асинхронная универсальная функция получения списка элементов (метод GET)
// PARAMS:
//    url - адрес обращения на сервер
// RETURN
//    Promise() после data.json()
//  ИЛИ
//    Error() в случае ошибки
export const getItemsList = async (url, params) => {
    // создание URI-строки из объекта search
    const UrlParams = new URLSearchParams(params);
    const fullUrl = url + '?' + UrlParams;
    const response = await fetch(fullUrl);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
}



// Асинхронная универсальная функция получения информации по выбранному элементу (метод GET)
// PARAMS:
//    url - адрес обращения на сервер
//    id - идентификатор выбранного элемента
// RETURN
//    Promise() после data.json()
//  ИЛИ
//    Error() в случае ошибки
export const getItemDetails = async (url, id) => {
    const response = await fetch(url + id);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
}



// Асинхронная универсальная функция отравки данных на сервер (метод POST)
// PARAMS:
//    url - адрес обращения на сервер
//    data - объект, который надо отправить на сервер
// RETURN
//    Promise() после data.json()
//  ИЛИ
//    Error() в случае ошибки
export const postData = async (url, data) => {
    const headers = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    };
    // основной блок - fetch
    const response = await fetch(url, headers);
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json();
}
