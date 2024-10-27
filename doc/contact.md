# Contact API Spec

## Create Contact
Endpoint: POST /api/contacts

Headers:
- AUthorization: token

Request Body:
```json
{
    "first_name": "Achmad",
    "last_name": "Fatkharrofiqi",
    "email": "rofiq@example.com",
    "phone": "081231231"
}
```

Response Body (Success): 
```json
{
    "data": {
        "id": 1,
        "first_name": "Achmad",
        "last_name": "Fatkharrofiqi",
        "email": "rofiq@example.com",
        "phone": "081231231"
    }
}
```

## Get Contact
Endpoint: GET /api/contacts/:contactId

Headers:
- AUthorization: token

Response Body (Success): 
```json
{
    "data": {
        "id": 1,
        "first_name": "Achmad",
        "last_name": "Fatkharrofiqi",
        "email": "rofiq@example.com",
        "phone": "081231231"
    }
}
```

## Update Contact
Endpoint: PUT /api/contacts/:contactId

Headers:
- AUthorization: token

Request Body:
```json
{
    "first_name": "Achmad",
    "last_name": "Fatkharrofiqi",
    "email": "rofiq@example.com",
    "phone": "081231231"
}
```

Response Body (Success): 
```json
{
    "data": {
        "id": 1,
        "first_name": "Achmad",
        "last_name": "Fatkharrofiqi",
        "email": "rofiq@example.com",
        "phone": "081231231"
    }
}
```

## Remove Contact
Endpoint: DELETE /api/contacts/:contactId

Headers:
- AUthorization: token

Response Body (Success):
```json
{
    "data": true
}
```

## Search Contact
Endpoint: GET /api/contacts

Headers:
- AUthorization: token

Query Params:
- name: string, contact first name or contact last name, optional
- phone: string, contact phone, optional
- email: string, contact email, optional
- page: number, default 1
- size: number, default 10

Response Body (Success):
```json
{
    "data": [
        {
            "id": 1,
            "first_name": "Achmad",
            "last_name": "Fatkharrofiqi",
            "email": "rofiq@example.com",
            "phone": "081231231"
        },
        {
            "id": 2,
            "first_name": "Arthur",
            "last_name": "Morgan",
            "email": "arthur@example.com",
            "phone": "08999999"
        }
    ],
    "paging": {
        "current_page": 1,
        "total_page": 10,
        "size": 10
    }
}
```