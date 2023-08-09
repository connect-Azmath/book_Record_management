# book_Record_management
Backend Proj - book Record management

## Book Record Management
Server - Storing Book data, User Register, subscribers

/users/{id}
http://localhost:8081/users/

# Routes & Endpoints (APIs)

## /users
POST: Crete a new user
GET: Get all users data

## /users/{id}
GET: Get a user by id
PUT: Update a user by id
DELETE: Remove a user by id ((check if user has any issued Book ) AND (check if any Fine to be paid))


User => 3 months | 6 months | 12 months

if User do not renew the Book / Subscription then => fine should be paid
num_of_Days * 100 => 3 * 100 = 300

## users/subscription-details/{id}
GET: Get user subscription detals by id
   1. Date of Subscription
   2. Valid till date
   3. Fine y/n

## /books
GET: Get all the books
Post: Add a book

## /books/{id}
GET: Get a book by id
PUT: Update a book by its id

## /books/issued
GET: Get all the books



data = {
   name: "Azmath",
   dept: "CS"
}

{
   ...data,
   dept = EC,
   phone: 12312
}

Output: 
   name: "Azmath",
   dept = EC,
   phone: 12312

...each

    "id": "1",
        "name": "John",
        "surname": "Doe",
        "email": "user@email.com",
        "issuedBook": "1",
        "issuedDate": "04/01/2022",
        "returnDate": "05/01/2022",
        "subscriptionType": "Premium",
        "subscriptionDate": "04/01/2022"

...data 
         "email": "user@gmail.com"     

Pass below Payload for PUT
{
  "data" : { 
      "email": "az@email.com"
    }
    
}