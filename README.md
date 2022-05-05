# DivvyUp
## Project Description
DivvyUp is a spending management application focused towards making splitting purchases among groups of individuals easier. Users will be able to add to a joint spending list and thereafter splitthe cost of the purchase by each individual.

DivvyUp will be used in settings where there is one person making a purchase for a group of people. Prior to a purchase, individuals can add items to a joint purchase list. Users added in the shopping trip can choose what they wish to pay for within the joint purchase list and add their names to items. At the end of the trip, the person handling the transaction will input the total price for each item. The application will then calculate the subtotal cost for each person in the shopping trip. This allows the one person making the purchases to easily calculate the subtotal and charge others. 

People living along with others will easily benefit from using this application because oftentimes the payment for grocery trips are made by one person. Not everyone will necessarily want every item that is bought. After a shopping trip, it is hard to keep track of who “bought” what. Currently there are not any apps that are designed for this use case. This app aims to streamline the process of group purchases. 

We as developers want to build this application because as students we often deal with the struggle of splitting costs after group purchases. The process is tedious and time consuming and we find that many of our peers encounter the same problem. Therefore, we wanted to build this app to help alleviate this issue. 

## Technical Description

#### Infrastructure
![architecture diagram](diagrams/divvyinfra.png)

#### Feature Priorities
| Priority | User | Description | Technical Implementation |
|---|---|---|---|
|P0 | As the primary purchaser | I want to create a shopping trip session |
|P0 | As a joint purchaser | I want to join a shopping trip session |
|P1 | As a joint purchaser | I want to be able to add/remove items into the shopping list |
|P2 | As a joint purchaser | I want to be able to add myself to a item on the shopping list |
|P3 | As the primary purchaser | I want to be able to input costs of items |
|P4 | As the primary  purchaser | I want to be able to get the subtotal for each joint purchaser |
|P5 | As the primary purchaser | I want to be able to charge each joint purchaser by their calculated subtotal via online payment | 






## API Endpoints

#### Authentication
* `/signin`
    * Handle user sign in through Azure
* `/signout`
    * Delete the current user session and sign out
* `/error`
    * Handle login and general server errors
* `/unauthorized`
    * Deny access if login is not made with UW NetID Account

#### Users: /v1/users/
* POST
    * `/add `
        * Add a new user to the database and redirect to home page
    * `/delete`
        * Delete an existing user from the database and redirect to home page
    * `/additem`
        * Add a grocery item to the current user
    * `/removeitem`
        * Remove a grocery item from the current user’s shopping list
* GET
    * `/items/user (param: ?user=)`
        * return all items purchased from the current user

#### Groups: /v1/groups/
* POST
    * `/add`
        * Add a new user group to the database
    * `/adduser (param?user=)`
        * Add the specified user to the user group in the database
* GET
    * `/users`
        * Return all user IDs in the user group    
        
#### Shoppers: /v1/shopper
* POST
    * `/uploadprice`
        * Update price for items in shopping list in the database
    * `/removeitem `
        * Removes grocery item if item is unavailable 

#### Purchases: /v1/purchase/
* GET
    * `/price`
        * Get price for every item in shopping list in the database
    * `/items`
        * Return all items on the joint shopping list

#### Item: /v1/item (param)
* GET
    * `/`
        * Get information on the selected grocery item

#### Payment Api
* Options
    * https://github.com/mmohades/VenmoApiDocumentation
    * More

