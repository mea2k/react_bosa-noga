# Интернет-магазин BOSA-NOGA
Дипломный проект 'Интернет магазин обуви Bosa Noga'

Проект состоит из 2 частей:
* серверная часть ([backend](backend))
* клиентская часть ([frontend](frontend))


## Серверная часть
Серверная часть ([backend/server.js](backend/server.js)):
* `GET /api/top-sales` - хиты продаж (3 товара)
* `GET /api/categories` - категории товаров ('мужская обувь', 'женская обувь', 'детская обувь' и пр.)
* `GET /api/items?q=<text>&categoryId=<catID>&offset=<num>` - поиск товаров по имени (`q`), категории (`catID`) и выдача 6 очередных похиций, начиная с `num`
* `GET /api/items/:id` - получение информации о выбранном товаре
* `POST /api/order` - отправка зхапроса на формирование заказа. Сам заказ (`{owner: {phone,address}, items: [...]}` передается в теле запроса. Результат - объект `{orderId, deliveryDate}`


Все запросы:
* возвращают корректные результаты 

ИЛИ

* ошибку (500) - вероятность успеха задана в самом коде на каждый запрос отдельно.


## Клиентская часть

Используется связка **redux-saga**

### Общие сведения

Вся логика работы Store, Reducers, Saga основана на константах.
В файле [frontend/src/const/reducerNames.js](frontend/src/const/reducerNames.js) содержатся следующая информация:
*  название веток в Store, массива генераторов и обработчиков событий (reducers[]).
*  URL backend-сервера для обращение на получение соответствующих данных

Предусмотрены следующие виды подветок:
* работающие со списком элементов (`reducersListData`) - ТОП-продаж, список товаров, каталог товаров
   * основное событие - `getItemsList()`
   * в качестве middleware используется SAGA-обработчик [handleTemplateRequestItemsSaga](frontend/src/sagas/index.js#L11-L45)
* работающие с отдельным элементом (`reducersItemData`) - детали выбранного товара
   * основное событие - `getItemDetailsRequest()`
   * в качестве middleware используется SAGA-обработчик [handleTemplateRequestItemDetailsSaga](frontend/src/sagas/index.js#L47-L72)
* события POST-запросов (`postData`) - Сведения о заказе и доставке
   * основное событие - `postDataRequest()`
   * в качестве middleware используется SAGA-обработчик [handleTemplatePostDataSaga](frontend/src/sagas/index.js#L76-L102)
* работающие с локальным хранилищем SessionStorage (`StorageData`) - Корзина
   *    в качестве middleware используется [storageMiddleware](frontend/src/storage/index.js)
   *    SAGA такие события НЕ прослушивает

### Обработчики событий (Reducers)
Обработчики событий [frontend/src/reducers/](frontend/src/reducers/index.js) создаются автоматически с помощью `createSlice` и данных из [frontend/src/const/reducerNames.js](frontend/src/const/reducerNames.js). Реализованы седующие шаблоны:
* `generateItemsReducer` - для создания веток по работе с массивами элементов ([frontend/src/reducers/templateItemsReducer.js](frontend/src/reducers/templateItemsReducer.js))
* `generateItemDetailsReducer` - для создания веток по работе с отдельным элементом ([frontend/src/reducers/templateItemDetailsReducer.js](frontend/src/reducers/templateItemDetailsReducer.js))
* `generatePostDataReducer` - для создания веток по работе с массивами элементов ([frontend/src/reducers/templatePostDataReducer.js](frontend/src/reducers/templatePostDataReducer.js))
* `generateStorageReducer` - для создания веток по работе с массивами элементов ([frontend/src/reducers/templateStorageReducer.js](frontend/src/reducers/templateStorageReducer.js)) (данные подгружаются из SessionStorage)

Всем функциям создания событий дополнительно передаются параметры:
* `name` - название ветки Store и Reducers
* `url` - URL для обращения к backend-серверу
* `data` - сами данные события.

В результате `action` будет иметь структуру:
* `action.type` - тип события
* `action.payload.name` - название ветки Store и Reducers
* `action.payload.url` - URL для обращения к backend-серверу
* `action.payload.data` - сами данные события


В корневом файле [frontend/src/reducers/index.js](frontend/src/reducers/index.js) реализован следующий функционал:
* комбинирлвание обработчиков по разным ветвям в общий массив обработчиков событий [combineReducers](frontend/src/reducers/index.js#L24-L33)
* создание массива событий (точнее массива функций создания событий actionCreators) для каждой ветки Store [Actions](frontend/src/reducers/index.js#L35-L40)


### Saga
В файле [sagas/index.js](frontend/src/sagas/index.js) используются следующие саги:
1. `function* handleTemplateRequestItemsSaga()` - [функция-генератор](frontend/src/sagas/index.js#L11-L44) - работник (worker)
   * Универсальная Функция-генератор-работник (worker) для обработки событий массива элементов
   * PARAMS:
     * name    - имя (ключ) для получения массива reducer-ов
     * actions - массиы событий для данной группы reducer-ов (rootActions[name])
     * action (автоматически прилетает из Саги-наблюдателя) - сформированное событие ({type, payload})
   * type должен быть `requestItems`
   * Осуществляется вызов API-функции [api.getItemsList()](frontend/src/api/index.js#L3-L19)
   * По результатам формируется событие `setItemsSuccess` ИЛИ `setItemsError`  

2. `function* handleTemplateRequestItemDetailsSaga()` - [функция-генератор](frontend/src/sagas/index.js#L47-L72) - работник (worker)
   * Универсальная Функция-генератор-работник (worker) для обработки событий отдельного элемента
   * PARAMS:
     * name    - имя (ключ) для получения массива reducer-ов
     * actions - массиы событий для данной группы reducer-ов (rootActions[name])
     * action (автоматически прилетает из Саги-наблюдателя) - сформированное событие ({type, payload})
   * type должен быть `requestItemDetails`
   * Осуществляется вызов API-функции [api.getItemDetails()](frontend/src/api/index.js#L23-L37)
   * По результатам формируется событие `setItemDetailsSuccess` ИЛИ `setItemDetailsError`  

3. `function* handleTemplatePostDataSaga()` - [функция-генератор](frontend/src/sagas/index.js#L76-L102) - работник (worker)
   * Универсальная Функция-генератор-работник (worker) для обработки событий POST-запросов
   * PARAMS:
     * name    - имя (ключ) для получения массива reducer-ов
     * actions - массиы событий для данной группы reducer-ов (rootActions[name])
     * action (автоматически прилетает из Саги-наблюдателя) - сформированное событие ({type, payload})
   * type должен быть `requestItemDetails`
   * Осуществляется вызов API-функции [api.postData()](frontend/src/api/index.js#L41-L64)
   * По результатам формируется событие `postDataSuccess` ИЛИ `postDataError`  

_КОРНЕВАЯ САГА_ [saga](frontend/src/sagas/index.js#L109-L132)
1. Создаёт массив наблюдателей за событиями (`yeald all([...])`)
2. Для всех ветвей из раздела `listActions` создается наблюдатель за событием `requestItems`, для которого будет использован обработчик `handleTemplateRequestItemsSaga`
3. Для всех ветвей из раздела `itemActions` создается наблюдатель за событием `requestItemDetails`, для которого будет использован обработчик `handleTemplateRequestItemDetailsSaga`
4. Для всех ветвей из раздела `postActions` создается наблюдатель за событием `postDataRequest`, для которого будет использован обработчик `handleTemplatePostDataSaga`


### Хранилище (Store)
Хранилище реализовано в файле [Store](frontend/src/store/index.js).

Создается из файла [frontend/src/const/reducerNames.js](frontend/src/const/reducerNames.js)

Используются middleware:
* storageMiddleware, sagaMiddleware


Пример созданного Store:
`{
  topSales: {
    items: [],
    selectedItem: {},
    status: 'idle'
  },
  categories: {
    items: [],
    selectedItem: {},
    status: 'idle'
  },
  items: {
    items: [],
    selectedItem: {},
    status: 'idle'
  },
  itemDetails: {
    item: {},
    status: 'idle'
  },
  storage_cart: {
    items: [],
    status: 'idle'
  },
  post_cart: {
    result: {},
    status: 'idle'
  }
}`

_`storage_cart` дублируется в SessionStorage в рамках middleware [frontend/src/storage/index.js](frontend/src/storage/index.js)_

Тут же запускается главная Saga:

`sagaMiddleware.run(saga);`



 
### Компоненты
1. Верхняя часть (header)
   * Корзина - `Cart` [frontend/src/components/header/Cart/index.js](frontend/src/components/header/Cart/index.js)
   * Строка поиска - `SearchBar` [frontend/src/components/header/SearchBar/index.js](frontend/src/components/header/SearchBar/index.js)
2. Основная часть (main)
   * Баннер - `Banner` [frontend/src/components/main/Banner/index.js](frontend/src/components/main/Banner/index.js)
   * Топ-товары - `TopSales` [frontend/src/components/main/TopSales/index.js](frontend/src/components/main/TopSales/index.js)
   * Каталог - `Catalog` [frontend/src/components/main/Catalog/index.js](frontend/src/components/main/Catalog/index.js)
      * категории [frontend/src/components/main/Catalog/CatalogCategories.js](frontend/src/components/main/Catalog/CatalogCategories.js)
      * Строка поиска [frontend/src/components/main/Catalog/CatalogSearchForm.js](frontend/src/components/main/Catalog/CatalogSearchForm.js) 
   * Детали одного товара - `ItemDetails` [frontend/src/components/main/ItemDetails/index.js](frontend/src/components/main/ItemDetails/index.js)
   * Детали корзины - `Cart` [frontend/src/components/main/Cart/index.js](frontend/src/components/main/Cart/index.js)
   * Форма отправки заказа - `OrderForm` [frontend/src/components/main/OrderForm/index.js](frontend/src/components/main/OrderForm/index.js)
      * Сообщение по результатам отправки заказа [frontend/src/components/main/OrderForm/OrderMessage.js](frontend/src/components/main/OrderForm/OrderMessage.js)
3. Нижняя часть (footer)
   * Информация о контактах - `Contacts` [frontend/src/components/footer/Contacts/index.js](frontend/src/components/footer/Contacts/index.js)
      * сведения передаются в качестве параметра и берутся из константы [frontend/src/const/contacts.js](frontend/src/const/contacts.js)
   * Информация о способах платежа - `PayInfo` [frontend/src/components/footer/PayInfo/index.js](frontend/src/components/footer/PayInfo/index.js)
       * сведения передаются в качестве параметра и берутся из константы [frontend/src/const/payData.js](frontend/src/const/payData.js)
   * Права - `Copyright` [frontend/src/components/footer/Copyright/index.js](frontend/src/components/footer/Copyright/index.js)
4. Общие компоненты (shared)
   * Меню - [frontend/src/components/shared/Menu/index.js](frontend/src/components/shared/Menu/index.js)
      * `HeadMenu` - [frontend/src/components/shared/Menu/index.js#L42](frontend/src/components/shared/Menu/index.js#L42)
      * `FootMenu` - [frontend/src/components/shared/Menu/index.js#L45](frontend/src/components/shared/Menu/index.js#L45)
   * Карточка товара - `ItemCard` [frontend/src/components/shared/ItemCard/index.js](frontend/src/components/shared/ItemCard/index.js)
   * "Умная картинка" товара (переключается при наведении мышки) - `ItemImages` [frontend/src/components/shared/ItemImages/index.js](frontend/src/components/shared/ItemImages/index.js)
   * Индикатор загрузки - `Loading` [frontend/src/components/shared/Loading/index.js](frontend/src/components/shared/Loading/index.js)
   * Сообщение об ошибке - `ErrorBubble` [frontend/src/components/shared/Error/index.js](frontend/src/components/shared/Error/index.js)



### Страницы (layouts)
Реализованы компоненты страницы:
1. Верхний блок - [frontend/src/layouts/Header/index.js](frontend/src/layouts/Header/index.js) - _одинаковый на всех страницах_
   * использует `HeadRow` [frontend/src/layouts/HeaderRow/index.js](frontend/src/layouts/HeaderRow/index.js)
      * `<HeadMenu menu={menu} />` - данные берутся из параметра, в качестве которого используется константа (frontend/src/const/menu.js)[frontend/src/const/menu.js] 
      * `<SearchBar />`
      * `<Cart />` 
2. Нижний блок - [frontend/src/layouts/Footer/index.js](frontend/src/layouts/Footer/index.js) - _одинаковый на всех страницах_
   * `<FootMenu menu={menu} />` - данные берутся из параметра, в качестве которого используется константа [frontend/src/const/menu.js](frontend/src/const/menu.js) 
   * `<PayInfo payData={payData} />` - данные берутся из параметра, в качестве которого используется константа [frontend/src/const/payData.js](frontend/src/const/payData.js)
   * `<Copyright />`
   * `<Contacts data={contacts} />` - данные берутся из параметра, в качестве которого используется константа [frontend/src/const/contacts.js](frontend/src/const/contacts.js)
           
 
3. Основной блок - [frontend/src/layouts/Main/index.js](frontend/src/layouts/Main/index.js)
   * `<Banner  />`
   * подгружаются дочерние компоненты `{children}`, которые подставляются в блоке `<Routes>...</Routes>` в [frontend/src/App.js](frontend/src/App.js)


### Переходы (routers)
Схема переходов описана в [App.js](frontend/src/App.js). Отображаемые компоненты реализованы в папке [layouts](frontend/src/layouts):
* `/` - главная страница (отображается `MainPage`([frontend/src/layouts/MainPage/index.js](frontend/src/layouts/MainPage/index.js)) 
   * `<TopSales />`
   * `<Catalog />`
* `/catalog` - каталог товаров (отображается `CatalogPage`([frontend/src/layouts/CatalogPage/index.js](frontend/src/layouts/CatalogPage/index.js)) 
   *  `<Catalog withSearch />`
* `products/:id` - страница выбранного товара с ID (отображается `ItemPage`([frontend/src/layouts/ItemPage/index.js](frontend/src/layouts/ItemPage/index.js))
   * ` <ItemDetails />`
* `/cart` - информация о корзине (состав и форма заказа) (отображается `CartPage`([frontend/src/layouts/CartPage/index.js](frontend/src/layouts/CartPage/index.js))
  *  `<Cart />`
  *  `<OrderForm />`
* `/about` - информация об Интернет-магазине (отображается `AboutPage`([frontend/src/layouts/AboutPage/index.js](frontend/src/layouts/AboutPage/index.js)) 
  * 
* `/contacts` - информация о контактах (отображается `ContactsPage`([frontend/src/layouts/ContactsPage/index.js](frontend/src/layouts/ContactsPage/index.js)) 
* все остальное `/*` - нформация об ошибке (отображается `ErrorPage`([frontend/src/layouts/ErrorPage/index.js](frontend/src/layouts/ErrorPage/index.js)) 

 
 

