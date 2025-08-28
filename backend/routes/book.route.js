import { Router } from "express";
import { addBook, borrowBook, deleteBook, getAllBooks, getAllBorrows, getAvailableBooks, getBorrows, returnBook, updateBook } from "../controllers/book.controller.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { isLibrarian } from "../middlewares/isLibrarian.js";
import { isBorrower } from "../middlewares/isBorrower.js";
import { upload } from "../utils/mutler.js";

const router = Router();

router.get('/books',checkAuth,getAllBooks);
router.get('/availableBooks',checkAuth,getAvailableBooks);
router.delete('/delete/:bookId',checkAuth,isLibrarian,deleteBook);
router.put('/update/:bookId',checkAuth,isLibrarian,updateBook);
router.post('/add',checkAuth,isLibrarian,upload.single('bookPic'),addBook);
router.post('/borrow',checkAuth,isBorrower,borrowBook);
router.get('/getBorrows',checkAuth,isBorrower,getBorrows);
router.get('/getAllBorrows',checkAuth,isLibrarian,getAllBorrows);
router.delete('/return',checkAuth,isBorrower,returnBook);

export default router;