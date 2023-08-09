const express = require("express");
const {users} = require("../data/users.json");

const router = express.Router();




/**
 * Route: /users
 * Method: Get
 * Descriptions: Get all users
 * Access: Public 
 * Parameteres: none
 */

router.get("/", (req, res) => {
    res.status(200).json({
        // message: "Get User information",
        success: true,
        data: users 
    });
});

/**
 * Route: /users/:id
 * Method: Get
 * Descriptions: Get user by ID
 * Access: Public 
 * Parameteres: id
 */
router.get('/:id', (req,res) => {
    const {id} = req.params;
    const user = users.find((each) => each.id === id);

    if(!user){
        return res.status(400).json({
            success: false,
            message: "User does not exists"
        })
    }
    return res.status(200).json({
        success: true,
        data: user
    })
})

/**
 * Route: /users 
 * Method: Post
 * Descriptions: Create / add new user 
 * Access: Public 
 * Parameteres: none
 */

router.post("/", (req,res) => {
    const {id, name, surname,  email, issuedBook, issuedDate, returnDate,subscriptionType,subscriptionDate } = req.body;
    const user = users.find((each) => each.id === id);

    if(user)
        return res.status(404).json({
    success: false,
    message: "User already exsts!"
    });

    users.push({
        id, 
        name, 
        surname,  
        email, 
        issuedBook, 
        issuedDate, 
        returnDate,
        subscriptionType,
        subscriptionDate
    });
    return res.status(201).json({
        success: true,
        data: users
    })
})


/**
 * Route: /users/:id
 * Method: Put
 * Descriptions: Updating user by ID
 * Access: Public 
 * Parameteres: none
 */

router.put("/:id", (req,res) => {
    const {id} = req.params;
    const {data} = req.body;

    const user = users.find((each) => each.id === id);
    if(!user)
        return res.status(404).json({
            success: false,
            message: "User does not exists"
    })

    const updateUser = users.map((each) => {
        if(each.id === id){
            return { 
                ...each, 
                ...data  
            }
        }
        return each;
    })
    return res.status(200).json({
        success: true,
        data: updateUser
    })
})


/**
 * Route: /users/:id
 * Method: Delete
 * Descriptions: Deletes a user by ID
 * Access: Public 
 * Parameteres: none
 */
router.delete("/:id", (req,res) => {
    const {id} = req.params;
    const user = users.find((each) => each.id === id);

    if(!user)
        return res.status(404).json({
            success: false,
            message: "User does not exists"
    })

    const index = users.indexOf(user);
    users.splice(index, 1);

    return res.status(200).json({
        success: true,
        data: users
    })

})



/**
 * Route: /users/subscription-details/:id
 * Method: Get
 * Descriptions: Get all users subscription-details  by ID
 * Access: Public 
 * Parameteres: ID
 */
router.get("/subscription-details/:id", (req,res) => {
    const {id} = req.params;
    const user = users.find((each) => each.id === id);

    if(!user)
        return res.status(404).json({
            success: false,
            message: "User does not exists"
    });

    const getDateInDays = (date = "") => {
        // let date;
        if(date === ""){
            date = new Date();
        } else {
        date = new Date(data);
        }
        let days = Math.floor(data / (1000 * 60 * 60 * 24));
        return days;
    }

    const subscriptionType = (date) => {
        if(user.subscriptionType === "Basic"){
            date = date + 90;
        }else if(user.subscriptionType === "Standard"){
            date = date + 180;
        }else(user.subscriptionType === "Premium")
            date = date + 0;
        return date;
    };

    // Subscription expiration calcus
    // Jan 1, 1970, UTC milliSec
    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpirationDate = subscriptionType(subscriptionDate);

    const data = {
        ...user,
        subscriptionExpired: subscriptionExpirationDate < currentDate,
        daysLeftForExpiration: subscriptionExpirationDate >= currentDate,
        fine: returnDate < currentDate ? subscriptionExpirationDate <=currentDate ? 200 : 100 : 0,
    }

    res.status(200).json({
        success: true,
        data,
        // data: data  // this is possible , as Key & vlue both are same we use t once as above
    })

})

module.exports = router;