# User API Spec

## Register User
Endpoint: POST /api/users

Request Body:
```json
{
    "username": "rofiq",
    "password:": "rahasia",
    "name": "Achmad Fatkharrofiqi"
}
```
Response Body:
```json
{
    "data": {
        "username": "rofiq",
        "name": "Achmad Fatkharrofiqi"
    }
}
```
Response Body (Failed):
```json
{
    "errors": "Username already registered"
}
```

## Login User
Endpoint: POST /api/users/login

Request Body:
```json
{
    "username": "rofiq",
    "password:": "rahasia",
}
```
Response Body:
```json
{
    "data": {
        "username": "rofiq",
        "name": "Achmad Fatkharrofiqi",
        "token": "session_id_generated"
    }
}
```
Response Body (Failed):
```json
{
    "errors": "Username or password is wrong"
}
```

## Get User
Endpoint: GET /api/users/current

Headers:
- Authorization: Token

Response Body (Success):
```json
{
    "data": {
        "username": "rofiq",
        "name": "Achmad Fatkharrofiqi",
    }
}
```
## Update User
Endpoint: PATCH /api/users/current

Headers:
- Authorization: Token

Request Body:
```json
{
    "password": "rahasia",          // optional, if want to change password
    "name": "Achmad Fatkharrofiqi"  // optional, if want to change name
}
```
Response Body (Success):
```json
{
    "data": {
        "username": "rofiq",
        "name": "Achmad Fatkharrofiqi",
    }
}
```

## Logout User
Endpoint: DELETE /api/users/current

Headers:
- Authorization: Token

Response Body (Success):
```json
{
    "data": true
}
```
Response Body (Failed):
```json
{
    "errors": "Username or password is wrong"
}
```