export const reducerNames = {
    // события, связанные с загрузкой списков
    // должно быть событие setItemsRequest
    reducersListData: [
        {
            name: 'topSales',
            url: 'api/top-sales'
        }, {
            name: 'categories',
            url: 'api/categories'
        }, {
            name: 'items',
            url: 'api/items'
        }
    ],

    // события, связанные с загрузкой одного элемента
    // должно быть событие setItemDetailsRequest
    reducersItemData: [
        {
            name: 'itemDetails',
            url: 'api/items/'
        }
    ],

    // события, которые сохраняются в Storage
    // saga их не прослушивает
    storageData: [
        {
            name: 'storage_cart',
            url: ''
        }
    ],

    // события, связанные с POST-запросами
    // должно быть событие postDataRequest
    postData: [
        {
            name: 'post_cart',
            url: 'api/order'
        }
    ],

};
