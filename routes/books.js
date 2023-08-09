const express = require("express");

//Data import
const {books} = require("../data/books.json");
const {users} = require("../data/users.json");

//Local router
const router = express.Router();



/**
 * Route: /books
 * Method: Get
 * Descriptions: Get all books
 * Access: Public 
 * Parameteres: none
 */

router.get("/", (req, res) => {
    res.status(200).json({
        // message: "Get User information",
        success: true,
        data: books 
    });
});

/**
 * Route: /books/:id
 * Method: Get
 * Descriptions: Get book by ID
 * Access: Public 
 * Parameteres: ID
 */
router.get('/:id', (req,res) => {
    const {id} = req.params;
    const book = books.find((each) => each.id === id);

    if(!user){
        return res.status(400).json({
            success: false,
            message: "User does not exists"
        })
    }
    return res.status(200).json({
        success: true,
        data: book
    })
})

/**
 * Route: /books/issued
 * Method: Get
 * Descriptions: Get all issued books
 * Access: Public 
 * Parameteres: none
 */
router.get('/issued', (req,res) => {
    const userWithIssuedBooks = users.filter((each) => {
        if(each.issuedBook) return each;

        const issuedBooks = [];
        userWithIssuedBooks.forEach((each) => {
            const book = books.find((book) => book.id === each.issuedBook);
            book.issuedBy = each.name;
            book.issuedDate = each.issuedDate;
            book.returnDate = each.returnDate;

            issuedBooks.push(book);            
        });
        if(issuedBooks.length === 0){
            return res.status(404).json({ success: false, message: "No books assigned to this User "})
        }
        return res.status(200).json({
            success: true,
            data: issuedBooks
        })
    })
})

/**
 * Route: /books
 * Method: Post
 * Descriptions: Add a book 
 * Access: Public 
 * Parameteres: none
 * Data: id, Author, Name, Price, Publisher, Genre
 */
router.post('/', (req,res) => {
    const {data} = req.body;

    if(!data){
        return res.status(404).json({ success: false, message: "No data provided to add a book"})
    }

    const book = books.find((each) => each.id === data.id)
    if(book){
        return res.status(404).json({ success: false, message: "Duplicate book id"})
    }

    const allBooks = [...books, data];
    return res.status(201).json({success: true, data:allBooks});
})

/**
 * Route: /books/:id
 * Method: Put
 * Descriptions: Updating book by ID
 * Access: Public 
 * Parameteres: id
 */
router.put("/:id", (req,res) => {
    const {id} = req.params;
    const {data} = req.body;
    const book = books.find((each) => each.id === id);
    if(!book)
        return res.status(404).json({
            success: false,
            message: "book does not exists"
    })

    const updateBook = books.map((each) => {
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
        data: updateBook
    })
})
  

/**
 * Route: /users/:id
 * Method: Delete
 * Descriptions: Deletes a user by ID
 * Access: Public 
 * Parameteres: ID
 */


module.exports = router;

