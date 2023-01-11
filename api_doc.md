# News API Documentation


## Endpoints :

List of available endpoints:

- `POST /users/register`
- `POST /users/login`
- `POST /users/google-login` 
- `GET /users`
- `PATCH /users/subscription`
- `POST /users/generate-midtrans-token`
- `GET /users/idols/favorites`
- `POST /users/idols/:IdolId`
- `DELETE /users/idols/:id`
- `GET /idols`
- `GET /idols/branches`
- `GET /idols/:IdolId`
- `GET /songs/:id`
- `GET /video/:youtubeId`


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
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "user with email <email> has been created with id <id>",
  "id": "integer",
  "email": "string",
  "isSubscribed": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Username is required!"
}
OR
{
  "message": "Email has been used"
}
OR
{
  "message": "Email is required!"
}
OR
{
  "message": "Invalid Email Format"
}
OR
{
  "message": "Password is required!"
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
  "isSubscribed": "string",
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - InvalidCredentials)_

```json
{
  "message": "Email/Password Invalid"
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


## 4. GET /users

Description:
- Find user

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- user:

```json
{
  "id": "integer"
}
```

_Response (200 - Ok)_

```json
{
    "id": 1,
    "username": "brianrr",
    "email": "brian@mail.com",
    "isSubscribed": true,
    "createdAt": "2023-01-11T09:30:23.701Z",
    "updatedAt": "2023-01-11T09:49:36.600Z"
}
```


&nbsp;

## 5. PATCH /users/subscription

Description:
- Update status subscribed

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "User with id <id> now is a subscriber"
}
```

_Response (404 - already subs)_

```json
{
  "message": "You already a subscriber"
}
```

&nbsp;

## 6. POST /generate-midtrans-token

Description:
- Generate payment

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (201 - Created)_

```json
{
    "token": "d54f5f41-a175-422e-ac0e-457ded7edc6d",
    "redirect_url": "https://app.sandbox.midtrans.com/snap/v3/redirection/d54f5f41-a175-422e-ac0e-457ded7edc6d"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

&nbsp;

## 7. GET /users/idols/favorites

Description:
- Get favorite idol data 

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
        "spotifyId": "2Iss9rGmxvoEfVigargjTH",
        "youtubeId": "UCP0BspO_AMEe3aQqqpo89Dg",
        "name": "Moona Hoshinova",
        "content": "Moon Moon~ Moona Dayo!\n\nA college girl who works as a model and idol, but later got interested to become a VTuber too.\nOn some rare occasion, Moona’s stream might be visited by Moona’s “another personality,”Hoshinova. That has deeper big sister-like voices and sadistic tendesion. Pay attention to her streams to meet Hoshinova!",
        "imgUrl": "https://hololive.hololivepro.com/wp-content/uploads/2022/04/3002_Moona-Hoshinova.png",
        "fanName": "Moonafic",
        "debut": "April 11, 2020",
        "BranchId": 1,
        "Branch": {
            "id": 1,
            "from": "Hololive Indonesia"
        },
        "Favorites": [
            {
                "id": 1,
                "IdolId": 1,
                "UserId": 1
            }
        ]
    },
    {
        "id": 2,
        "spotifyId": "3PLJjPD8KDRzaEdznJT16j",
        "youtubeId": "UCOyYb1c43VlX9rc_lT6NKQw",
        "name": "Ayunda Risu",
        "content": "Hewwrroo everyone ~!!”; “Purupuru ganbari Risu ~!”\n\nA squirrel girl from a magical forest.\nShe was lost in the human world, but due to certain circumstances, she ends up living in the home of a kind older sister.\nTo return the favor, she decides to become a VTuber.\nRisu act, most of the time, just like a squirrel she is. She loves to do subtle pranks on people, shy with new people, and love to tease her viewer. Her laugh is also one of her unique characterictic.",
        "imgUrl": "https://hololive.hololivepro.com/wp-content/uploads/2022/04/3001_Ayunda-Risu.png",
        "fanName": "Risuners",
        "debut": "April 10, 2020",
        "BranchId": 1,
        "Branch": {
            "id": 1,
            "from": "Hololive Indonesia"
        },
        "Favorites": [
            {
                "id": 14,
                "IdolId": 2,
                "UserId": 1
            }
        ]
    }
]
```

&nbsp;


## 8. POST /users/idols/:IdolId

Description:
- Add favorite idol

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
  "IdolId": "integer"
}
```

- body:

_Response (201 - Created)_

```json
{
  "message": "Success Add Favorite Idol"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

&nbsp;


## 9. DELETE /users/idols/:id

Description:
- Delete favorite idol from list

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
  "message": "Success Delete Favorite Idol"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

&nbsp;



## 10. GET /idols

Description:
- Get Idols from database


_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "spotifyId": "2Iss9rGmxvoEfVigargjTH",
        "youtubeId": "UCP0BspO_AMEe3aQqqpo89Dg",
        "name": "Moona Hoshinova",
        "content": "Moon Moon~ Moona Dayo!\n\nA college girl who works as a model and idol, but later got interested to become a VTuber too.\nOn some rare occasion, Moona’s stream might be visited by Moona’s “another personality,”Hoshinova. That has deeper big sister-like voices and sadistic tendesion. Pay attention to her streams to meet Hoshinova!",
        "imgUrl": "https://hololive.hololivepro.com/wp-content/uploads/2022/04/3002_Moona-Hoshinova.png",
        "fanName": "Moonafic",
        "debut": "April 11, 2020",
        "BranchId": 1,
        "Branch": {
            "id": 1,
            "from": "Hololive Indonesia"
        }
    },
    ....
]
```

&nbsp;


## 11. GET /idols/branches

Description:
- Get idol branch from database


_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "from": "Hololive Indonesia",
        "createdAt": "2023-01-11T09:30:23.727Z",
        "updatedAt": "2023-01-11T09:30:23.727Z"
    },
    {
        "id": 2,
        "from": "Hololive Japan",
        "createdAt": "2023-01-11T09:30:23.727Z",
        "updatedAt": "2023-01-11T09:30:23.727Z"
    },
    {
        "id": 3,
        "from": "Hololive English",
        "createdAt": "2023-01-11T09:30:23.727Z",
        "updatedAt": "2023-01-11T09:30:23.727Z"
    }
]
```


&nbsp;


## 12. GET /idols/:IdolId

Description:
- Find idol by Id

Request:


- params:

```json
{
  "IdolId": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "id": 2,
    "spotifyId": "3PLJjPD8KDRzaEdznJT16j",
    "youtubeId": "UCOyYb1c43VlX9rc_lT6NKQw",
    "name": "Ayunda Risu",
    "content": "Hewwrroo everyone ~!!”; “Purupuru ganbari Risu ~!”\n\nA squirrel girl from a magical forest.\nShe was lost in the human world, but due to certain circumstances, she ends up living in the home of a kind older sister.\nTo return the favor, she decides to become a VTuber.\nRisu act, most of the time, just like a squirrel she is. She loves to do subtle pranks on people, shy with new people, and love to tease her viewer. Her laugh is also one of her unique characterictic.",
    "imgUrl": "https://hololive.hololivepro.com/wp-content/uploads/2022/04/3001_Ayunda-Risu.png",
    "fanName": "Risuners",
    "debut": "April 10, 2020",
    "BranchId": 1,
    "Branch": {
        "id": 1,
        "from": "Hololive Indonesia"
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


## 13. GET /songs/:id

Description:
- Get data song from spotify

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
        "releases": {
            "items": [
                {
                    "id": "7mLp1yLUJdrWyHWmvCTUCz",
                    "uri": "spotify:album:7mLp1yLUJdrWyHWmvCTUCz",
                    "name": "ソワレ",
                    "type": "SINGLE",
                    "date": {
                        "year": 2022,
                        "isoString": "2022-12-19T00:00:00Z"
                    },
                    "coverArt": {
                        "sources": [
                            {
                                "url": "https://i.scdn.co/image/ab67616d00001e028284c38d66c20437e0aa02a0",
                                "width": 300,
                                "height": 300
                            },
                            {
                                "url": "https://i.scdn.co/image/ab67616d000048518284c38d66c20437e0aa02a0",
                                "width": 64,
                                "height": 64
                            },
                            {
                                "url": "https://i.scdn.co/image/ab67616d0000b2738284c38d66c20437e0aa02a0",
                                "width": 640,
                                "height": 640
                            }
                        ]
                    },
                    "playability": {
                        "playable": true,
                        "reason": "PLAYABLE"
                    },
                    "sharingInfo": {
                        "shareId": "2rtMemMnSB259pxbxHQR3Q",
                        "shareUrl": "https://open.spotify.com/album/7mLp1yLUJdrWyHWmvCTUCz?si=2rtMemMnSB259pxbxHQR3Q"
                    },
                    "tracks": {
                        "totalCount": 2
                    }
                }
            ]
        }
    },
    ....
]
```

_Response (404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

&nbsp;



## 14. GET /video/:youtubeId

Description:
- Get video from youtube by id

Request:

- params:

```json
{
  "youtubeId": "integer (required)"
}
```


_Response (200 - OK)_

```json
{
    "videoId": "s5THqHbutMk"
}
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
