import bookModel from "../models/book.model.js";
import borrowModel from "../models/borrow.model.js";

export const getAllBooks = async (req, res) => {
  try {
    const books = await bookModel.find();

    res.status(200).json({ message: "All books fetched successfuly.", allBooks: books });
  } catch (error) {
    console.log("Error in getAllBooks controller : ", error);
    res.status(404).json({ message: "Internal Server Error." });
  }
}

export const getAvailableBooks = async (req, res) => {
  try {
    const books = await bookModel.find({ available: 'true' });

    res.status(200).json({ message: "All available books fetched successfuly.", availableBooks: books });
  } catch (error) {
    console.log("Error in getAvailableBooks controller : ", error);
    res.status(404).json({ message: "Internal Server Error." });
  }
}

export const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;

    const book = await bookModel.deleteOne({ _id: bookId });

    res.status(200).json({ message: "A book got deleted successfully.", deletedBook: book });
  } catch (error) {
    console.log("Error in deleteBook controller : ", error);
    res.status(404).json({ message: "Internal Server Error." });
  }
}

export const updateBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const { title, author, quantity, available, genre } = req.body;

    const book = await bookModel.updateOne({ _id: bookId }, { $set: { title, author, available, quantity, genre } });

    res.status(200).json({ message: "A book got updated successfully.", updatedBook: book });

  } catch (error) {
    console.log("Error in updateBook controller : ", error);
    res.status(404).json({ message: "Internal Server Error." });
  }
}

export const addBook = async (req, res) => {
  try {
    const bookPic = req.file?.filename || null;
    console.log(bookPic);

    const { title, author, isbn, quantity, available, genre } = req.body;

    if (!title || !author || !isbn || !quantity || !available || !genre || !bookPic) {
      return res.status(400).json({ message: "Required fields cannot be empty." })
    }

    const existingBook = await bookModel.findOne({ isbn: isbn });

    if (existingBook) {
      return res.status(400).json({ message: "Sorry,the book with same isbn already exists." })
    }

    const newBook = new bookModel({
      title,
      author,
      isbn,
      quantity,
      available,
      genre,
      bookImg: bookPic,
    })

    await newBook.save();

    return res.status(201).json({ message: "New book added successfully.", addedBook: newBook })
  } catch (error) {
    console.log("Error in addBook controller : ", error);
    res.status(404).json({ message: "Internal Server Error." });
  }
}

export const borrowBook = async (req, res) => {
  try {

    const { bookId, userId, returnDuration } = req.body;

    if (!bookId || !userId || returnDuration == null) {
      return res.status(400).json({ message: "Some required data could be found." })
    }

    const borrowedBook = await bookModel.findOne({ _id: bookId });
    const intQuantity = parseInt(borrowedBook.quantity);

    if (intQuantity === 0) {
      return res.status(400).json({ message: "Sorry the book is not available." });
    }

    const newBorrow = new borrowModel({
      bookId: bookId,
      userId: userId,
      returnDuration: returnDuration,
    });

    await newBorrow.save();

    const newQuantity = intQuantity - 1;
    const upadateQuantity = await bookModel.findOneAndUpdate({ _id: bookId }, { $set: { quantity: newQuantity.toString() } });
    if (newQuantity === 0) {
      await bookModel.findOneAndUpdate({ _id: bookId }, { $set: { available: 'false' } });
    }

    return res.status(201).json({ message: "A book was borrowed succesfully." });

  } catch (error) {
    console.log("Error in borrowBook controller : ", error);
    res.status(404).json({ message: "Internal Server Error." });
  }
}

export const getBorrows = async (req, res) => {
  try {
    const { userId } = req.query;
    console.log(req.query);


    if (!userId) {
      return res.status(400).json({ message: "User Id was not provided." });
    }

    const borrows = await borrowModel.find({ userId: userId }).populate('bookId').populate('userId');

    res.status(200).json({ message: "All of your borrows fetched successfully.", allBorrows: borrows });
  } catch (error) {
    console.log("Error in getBorrows controller : ", error);
    res.status(404).json({ message: "Internal Server Error." });
  }
}

export const getAllBorrows = async (req, res) => {
  try {
    const borrows = await borrowModel.find().populate('bookId').populate('userId');
    res.status(200).json({ message: "All of the borrows fetched successfully.", fullBorrows: borrows });
  } catch (error) {
    console.log("Error in getAllBorrows controller : ", error);
    res.status(404).json({ message: "Internal Server Error." });

  }
}

export const returnBook = async (req, res) => {
  const { borrowId } = req.query;

  try {
  
    const returnedBorrow = await borrowModel.findByIdAndDelete(borrowId);


    if (!returnedBorrow) {
      return res.status(404).json({ message: "Borrow record not found." });
    }

    const returnedBook = await bookModel.findById(returnedBorrow.bookId);
    if (!returnedBook) {
      return res.status(404).json({ message: "Book not found." });
    }

    const intQuantity = parseInt(returnedBook.quantity);
    const newQuantity = intQuantity + 1;

    returnedBook.quantity = newQuantity.toString();
    if (newQuantity > 0) {
      returnedBook.available = "true";
    }

    await returnedBook.save();

    res.status(200).json({
      message: "A book returned successfully.",
      returnedBorrow,
      updatedBook: returnedBook
    });
  } catch (error) {
    console.log("Error in returnBook controller : ", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};
