# News API Documentation


## Endpoints :

List of available endpoints:

- `POST /users/register`
- `POST /users/login`
- `POST /users/google-login`
- `POST /news`
- `GET /news`
- `GET /news/:id`
- `DELETE /news/:id`
- `PUT /news/:id`
- `PATCH /news/:id`
- `GET /categories`
- `POST /categories`
- `DELETE /categories/:id`
- `PUT /categories/:id`
- `GET /histories`
- `POST /customers/register`
- `POST /customers/login`
- `POST /customers/google-login`
- `GET /customers/news`
- `GET /customers/news/:id`
- `POST /customers/news/:id`
- `GET /customers/news/favorites`
- `GET /customers/categories`



&nbsp;


## 1. POST /register

Description:
- New register

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string"

}
```

_Response (201 - Created)_

```json
{
  "message": "user with email <email> has been created with id <id>",
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Username is Required!"
}
OR
{
  "message": "Email Has Been Used"
}
OR
{
  "message": "Email is Required!"
}
OR
{
  "message": "Invalid Email Format"
}
OR
{
  "message": "Password is Required!"
}
OR
{
  "message": "Password Minimal 5 Characters"
}
```

&nbsp;


## 2. POST /login

Description:
- Login wih email & password

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "username": "string",
  "role": "string",
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email or Password Required"
}
```

_Response (401 - InvalidCredentials)_

```json
{
  "message": "Error Invalid Email or Password"
}
```

&nbsp;


## 3. POST /google-login

Description:
- Login with google account

Request:

- headers:

```json
{
  "google_auth_token": "string"
}
```


- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "username": "string",
  "role": "string",
}
```

&nbsp;


## 4. POST /news

Description:
- Create news

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "title": "string",
  "content": "text",
  "imgUrl": "string",
  "categoryId": "integer"
}
```

_Response (201 - Created)_

```json
{
  "message": "Success Create News",
  "news":{
      "id": "integer",
      "title": "string",
      "content": "text",
      "imgUrl": "string",
      "authorId": "integer",
      "categoryId": "integer",
      "status": "string"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Title is Required!"
}
OR
{
  "message": "Content is Required!"
}
OR
{
  "message": "Image Url is Required!"
}
OR
{
  "message": "Author Id  is Required!"
}
OR
{
  "message": "Category Id  is Required!"
}
```

&nbsp;

## 5. GET /news

Description:
- Get all news from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```


_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "title": "Among Us Kolaborasi dengan Hololive, Bisa Dapat Outfit VTuber Indonesia",
    "content": "Game Among Us mengumumkan kolaborasi mereka dengan Hololive, untuk menghadirkan sejumlah kosmetik alias Cosmicube, yang bertemakan VTuber dari agensi tersebut.'Semoga Anda siap untuk bersenang-senang dengan gaya VTuber - kolaborasi terbaru kami dengan produksi Hololive sekarang telah ditayangkan!' tulis Innersloth selaku pengembang game tersebut.",
    "imgUrl": "https://cdn0-production-images-kly.akamaized.net/KBG6nzAQjy-MM3XV6I2sI-TDhrM=/1280x720/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4167089/original/026663100_1663821977-Among_Us_Hololive.jpg",
    "authorId": 1,
    "categoryId": 1,
    "status": "Active",
    "createdAt": "2022-12-12T09:47:41.866Z",
    "updatedAt": "2022-12-12T09:47:41.866Z",
        "author": {
            "id": 1,
            "username": "artu19",
            "email": "Artu@mail.com",
            "role": "admin",
            "phoneNumber": "0821453765",
            "address": "Jakarta Utara",
            "createdAt": "2022-12-12T08:57:32.082Z",
            "updatedAt": "2022-12-12T08:57:32.082Z"
        },
        "category": {
            "id": 1,
            "name": "Vtuber",
            "createdAt": "2022-12-12T09:45:43.071Z",
            "updatedAt": "2022-12-12T09:45:43.071Z"
        }
    },
    {
    "id": 2,
    "title": "Alasan Sebenarnya Kenapa PewDiePie Memutuskan untuk Pindah ke Jepang",
    "content": "Felix Kjellberg, content creator asal Swedia atau yang lebih di kenal sebagai PewDiePie di Youtube, baru-baru ini membuat salah satu keputusan terbesar dalam hidupnya.  Ia beserta dengan istrinya Marzia Kjellberg, memutuskan untuk pindah ke negara Jepang setelah tinggal selama 9 tahun di Brighton, Inggris. Felix telah merencanakan untuk pindah ke Negeri Matahari Terbit setelah ia membeli rumah disana pada tahun 2018. Namun, karena pembatasan COVID-19 di negara itu, emigrasi pasangan itu di tunda hingga 2022. Dan dalam video dokumentasi tentang perjalanan mereka dari London ke Jepang, dia menceritakan bahwa hewan peliharaan mereka mempunyai sedikit masalah dalam proses perpindahan tersebut. Maya, anjing Pug mereka yang kedua mempunyai masalah pernapasan yang mencegah mereka untuk melakukan perjalanan melalui kargo.",
    "imgUrl": "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_34/2978206/190820-pewdiepie-marzia-cs-1104a.jpg",
    "authorId": 2,
    "categoryId": 2,
    "status": "Active",
    "createdAt": "2022-12-12T09:47:41.866Z",
    "updatedAt": "2022-12-12T09:47:41.866Z",
        "author": {
            "id": 2,
            "username": "robe20",
            "email": "Robe@mail.com",
            "role": "staff",
            "phoneNumber": "0812456132",
            "address": "Jakarta Selatan",
            "createdAt": "2022-12-12T08:57:32.082Z",
            "updatedAt": "2022-12-12T08:57:32.082Z"
        },
        "category": {
            "id": 2,
            "name": "Youtuber",
            "createdAt": "2022-12-12T09:45:43.071Z",
            "updatedAt": "2022-12-12T09:45:43.071Z"
        }
    },
  ...,
]
```

&nbsp;

## 6. GET /news/:id

Description:
- Get news from database by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
[
  {
  "id": "integer",
  "title": "string",
  "content": "text",
  "imgUrl": "string",
  "authorId": "integer",
  "categoryId": "integer",
  "author": {
      "id": "integer",
      "username": "string",
      "email": "string",
      "role": "string",
      "phoneNumber": "string",
      "address": "string"
    },
  "category": {
      "id": "integer",
      "name": "string"
    }
  }
]
```

_Response (404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

&nbsp;

## 7. DELETE /news/:id

Description:
- Delete news by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Success Delete News id + <id>",
  "news": {
        "id": "integer",
        "title": "string",
        "content": "text",
        "imgUrl": "string",
        "authorId": "integer",
        "categoryId": "integer"
    }
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden Error"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

&nbsp;


## 8. PUT /news/:id

Description:
- Edit news by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body:

```json
{
  "title": "string",
  "content": "text",
  "imgUrl": "string",
  "categoryId": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "News with id <id> has been updated",
  "news": {
        "id": "integer",
        "title": "string",
        "content": "text",
        "imgUrl": "string",
        "authorId": "integer",
        "categoryId": "integer"
    }
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden Error"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

&nbsp;


## 9. PATCH /news/:id

Description:
- Edit status news by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body:

```json
{
  "title": "string",
  "content": "text",
  "imgUrl": "string",
  "categoryId": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "News status with id <id> has been updated from <status> to <status>",
  "news": {
        "id": "integer",
        "title": "string",
        "content": "text",
        "imgUrl": "string",
        "authorId": "integer",
        "categoryId": "integer"
    }
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden Error"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

&nbsp;



## 10. GET /category

Description:
- Get category from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```


_Response (200 - OK)_

```json
[
  {
        "id": 1,
        "name": "Vtuber",
        "createdAt": "2022-12-12T09:45:43.071Z",
        "updatedAt": "2022-12-12T09:45:43.071Z"
    },
    {
        "id": 2,
        "name": "Youtuber",
        "createdAt": "2022-12-12T09:45:43.071Z",
        "updatedAt": "2022-12-12T09:45:43.071Z"
    },
    {
        "id": 3,
        "name": "Food",
        "createdAt": "2022-12-12T09:45:43.071Z",
        "updatedAt": "2022-12-12T09:45:43.071Z"
    }
]
```

&nbsp;


## 11. POST /categories

Description:
- Create new category

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "name": "string"
}
```


_Response (200 - OK)_

```json
{
    "message": "Success Create Category with id <id>",
    "category": {
        "id": "integer",
        "name": "string",
        "updatedAt": "date",
        "createdAt": "date"
    }
}
```


_Response (400 - Bad Request)_

```json
{
    "message": "Name Required!"
}
```


&nbsp;


## 12. DELETE /categories/:id

Description:
- Delete category by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Success Delete categories id + <id>",
  "category": {
        "id": "integer",
        "name": "string",
        "updatedAt": "date",
        "createdAt": "date"
    }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

&nbsp;


## 13. PUT /categories/:id

Description:
- Edit category by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body:

```json
{
  "name": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Success Update Category with id <id>",
  "category": {
        "id": "integer",
        "name": "string",
        "updatedAt": "date",
        "createdAt": "date"
    }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

&nbsp;



## 14. GET /histories

Description:
- Get data history from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```


_Response (200 - OK)_

```json
[
  {
      "id": "integer",
      "title": "string",
      "description": "string",
      "updatedBy": "string",
      "createdAt": "integer",
      "updatedAt": "integer"
  },
]
```

&nbsp;

## 15. POST /customers/register

Description:
- New register for customers

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "user with email <email> has been created with id <id>",
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Username is Required!"
}
OR
{
  "message": "Email Has Been Used"
}
OR
{
  "message": "Email is Required!"
}
OR
{
  "message": "Invalid Email Format"
}
OR
{
  "message": "Password is Required!"
}
OR
{
  "message": "Password Minimal 5 Characters"
}
```

&nbsp;


## 16. POST /customers/login

Description:
- Login wih email & password for customers

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "username": "string",
  "role": "string",
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email or Password Required"
}
```

_Response (401 - InvalidCredentials)_

```json
{
  "message": "Error Invalid Email or Password"
}
```

&nbsp;


## 17. POST /customers/google-login

Description:
- Login with google account for customers

Request:

- headers:

```json
{
  "google_auth_token": "string"
}
```


- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "username": "string",
  "role": "string",
}
```

&nbsp;



## 18. GET /customers/news

Description:
- Get all news from database for customers


_Response (200 - OK)_

```json
{
  "count": 20,
  "rows": [
  {
    "id": 1,
    "title": "Among Us Kolaborasi dengan Hololive, Bisa Dapat Outfit VTuber Indonesia",
    "content": "Game Among Us mengumumkan kolaborasi mereka dengan Hololive, untuk menghadirkan sejumlah kosmetik alias Cosmicube, yang bertemakan VTuber dari agensi tersebut.'Semoga Anda siap untuk bersenang-senang dengan gaya VTuber - kolaborasi terbaru kami dengan produksi Hololive sekarang telah ditayangkan!' tulis Innersloth selaku pengembang game tersebut.",
    "imgUrl": "https://cdn0-production-images-kly.akamaized.net/KBG6nzAQjy-MM3XV6I2sI-TDhrM=/1280x720/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4167089/original/026663100_1663821977-Among_Us_Hololive.jpg",
    "authorId": 1,
    "categoryId": 1,
    "status": "Active",
    "createdAt": "2022-12-12T09:47:41.866Z",
    "updatedAt": "2022-12-12T09:47:41.866Z",
        "author": {
            "id": 1,
            "username": "artu19",
            "email": "Artu@mail.com",
            "role": "admin",
            "phoneNumber": "0821453765",
            "address": "Jakarta Utara",
            "createdAt": "2022-12-12T08:57:32.082Z",
            "updatedAt": "2022-12-12T08:57:32.082Z"
        },
        "category": {
            "id": 1,
            "name": "Vtuber",
            "createdAt": "2022-12-12T09:45:43.071Z",
            "updatedAt": "2022-12-12T09:45:43.071Z"
        }
    },
    {
    "id": 2,
    "title": "Alasan Sebenarnya Kenapa PewDiePie Memutuskan untuk Pindah ke Jepang",
    "content": "Felix Kjellberg, content creator asal Swedia atau yang lebih di kenal sebagai PewDiePie di Youtube, baru-baru ini membuat salah satu keputusan terbesar dalam hidupnya.  Ia beserta dengan istrinya Marzia Kjellberg, memutuskan untuk pindah ke negara Jepang setelah tinggal selama 9 tahun di Brighton, Inggris. Felix telah merencanakan untuk pindah ke Negeri Matahari Terbit setelah ia membeli rumah disana pada tahun 2018. Namun, karena pembatasan COVID-19 di negara itu, emigrasi pasangan itu di tunda hingga 2022. Dan dalam video dokumentasi tentang perjalanan mereka dari London ke Jepang, dia menceritakan bahwa hewan peliharaan mereka mempunyai sedikit masalah dalam proses perpindahan tersebut. Maya, anjing Pug mereka yang kedua mempunyai masalah pernapasan yang mencegah mereka untuk melakukan perjalanan melalui kargo.",
    "imgUrl": "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_34/2978206/190820-pewdiepie-marzia-cs-1104a.jpg",
    "authorId": 2,
    "categoryId": 2,
    "status": "Active",
    "createdAt": "2022-12-12T09:47:41.866Z",
    "updatedAt": "2022-12-12T09:47:41.866Z",
        "author": {
            "id": 2,
            "username": "robe20",
            "email": "Robe@mail.com",
            "role": "staff",
            "phoneNumber": "0812456132",
            "address": "Jakarta Selatan",
            "createdAt": "2022-12-12T08:57:32.082Z",
            "updatedAt": "2022-12-12T08:57:32.082Z"
        },
        "category": {
            "id": 2,
            "name": "Youtuber",
            "createdAt": "2022-12-12T09:45:43.071Z",
            "updatedAt": "2022-12-12T09:45:43.071Z"
        }
    },
  ...,
]
}

```

&nbsp;

## 19. GET /customers/news/:id

Description:
- Get news from database by id for customers

Request:

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
[
  {
  "id": "integer",
  "title": "string",
  "content": "text",
  "imgUrl": "string",
  "authorId": "integer",
  "categoryId": "integer",
  "author": {
      "id": "integer",
      "username": "string",
      "email": "string",
      "role": "string",
      "phoneNumber": "string",
      "address": "string"
    },
  "category": {
      "id": "integer",
      "name": "string"
    }
  }
]
```

_Response (404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

&nbsp;





## 20. POST /customers/news/:id

Description:
- Add favorite news for customers

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "NewsId": "integer"
}
```

- user:

```json
{
  "CustomerId": "integer"
}
```

_Response (201 - Created)_

```json
{
  "message": "Success Add Favorite News",
  "news":{
      "CustomerId": "integer",
      "NewsId": "integer"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Title is Required!"
}
OR
{
  "message": "Content is Required!"
}
OR
{
  "message": "Image Url is Required!"
}
OR
{
  "message": "Author Id  is Required!"
}
OR
{
  "message": "Category Id  is Required!"
}
```

&nbsp;


## 21. GET /customers/news/favorites

Description:
- Show favorite news from customers

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (201 - Created)_

```json
[
    {
        "id": 2,
        "title": "Alasan Sebenarnya Kenapa PewDiePie Memutuskan untuk Pindah ke Jepang",
        "content": "Felix Kjellberg, content creator asal Swedia atau yang lebih di kenal sebagai PewDiePie di Youtube, baru-baru ini membuat salah satu keputusan terbesar dalam hidupnya.  Ia beserta dengan istrinya Marzia Kjellberg, memutuskan untuk pindah ke negara Jepang setelah tinggal selama 9 tahun di Brighton, Inggris. Felix telah merencanakan untuk pindah ke Negeri Matahari Terbit setelah ia membeli rumah disana pada tahun 2018. Namun, karena pembatasan COVID-19 di negara itu, emigrasi pasangan itu di tunda hingga 2022. Dan dalam video dokumentasi tentang perjalanan mereka dari London ke Jepang, dia menceritakan bahwa hewan peliharaan mereka mempunyai sedikit masalah dalam proses perpindahan tersebut. Maya, anjing Pug mereka yang kedua mempunyai masalah pernapasan yang mencegah mereka untuk melakukan perjalanan melalui kargo.",
        "imgUrl": "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_34/2978206/190820-pewdiepie-marzia-cs-1104a.jpg",
        "authorId": 2,
        "categoryId": 2,
        "status": "Active",
        "createdAt": "2023-01-06T17:47:38.172Z",
        "updatedAt": "2023-01-06T17:47:38.172Z",
        "author": {
            "id": 2,
            "username": "robe20",
            "email": "Robe@mail.com",
            "role": "staff",
            "phoneNumber": "0812456132",
            "address": "Jakarta Selatan",
            "createdAt": "2023-01-06T17:47:38.143Z",
            "updatedAt": "2023-01-06T17:47:38.143Z"
        },
        "category": {
            "id": 2,
            "name": "Youtuber",
            "createdAt": "2023-01-06T17:47:38.166Z",
            "updatedAt": "2023-01-06T17:47:38.166Z"
        },
        "Favorites": [
            {
                "id": 1,
                "CustomerId": 1,
                "NewsId": 2,
                "createdAt": "2023-01-07T17:33:06.035Z",
                "updatedAt": "2023-01-07T17:33:06.035Z"
            }
        ]
    }
]
```

&nbsp;


## 22. GET /customers/categories

Description:
- Get category from database for customers


_Response (200 - OK)_

```json
[
  {
        "id": 1,
        "name": "Vtuber",
        "createdAt": "2022-12-12T09:45:43.071Z",
        "updatedAt": "2022-12-12T09:45:43.071Z"
    },
    {
        "id": 2,
        "name": "Youtuber",
        "createdAt": "2022-12-12T09:45:43.071Z",
        "updatedAt": "2022-12-12T09:45:43.071Z"
    },
    {
        "id": 3,
        "name": "Food",
        "createdAt": "2022-12-12T09:45:43.071Z",
        "updatedAt": "2022-12-12T09:45:43.071Z"
    }
]
```

&nbsp;




## Global Error


_Response (401 - Unauthorized & JsonWebTokenError)_

```json
{
  "message": "Error Authentication"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```
