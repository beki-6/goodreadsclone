const schemas = require('../models/schemas');

const create_book = async (req, res) => {
    try{
        const new_book = await schemas.Book.create({
            title: req.body.title,
            book_detail: req.body.book_detail,
            publication_year: req.body.publication_year,
            pages: req.body.pages,
            average_rating: req.body.average_rating,
            number_of_reviews: req.body.number_of_reviews,
            authors: req.body.authors,
            genres: req.body.genres
        }, {
            include: [
                {
                    model: schemas.Author,
                    as: 'authors'
                },
                {
                    model: schemas.Genre,
                    as: 'genres'
                }
            ]
        });
        res.status(201).json(new_book)
    } catch(e){
        res.status(400).json({message: e.message})
    }
}

const add_author = async (req, res) => {
    try{
        const new_author = await schemas.Author.create({
            name: req.body.name,
            books: req.body.books
        });
        res.status(201).json(new_author);
    } catch (e){
        res.status(400).json({message: e.message});
    }
}

const add_genre = async (req, res) => {
    try{
        const new_genre = await schemas.Genre.create({
            genre: req.body.genre
        });
        res.status(201).json(new_genre);
    } catch (e){
        res.status(400).json({message: e.message});
    }
}

const get_all_books = async (req, res) => {
    try{
        const books = await schemas.Book.findAll({
            include: [
                schemas.Author, 
                schemas.Genre
            ]
        });
        res.status(200).json(books);
    } catch(e) {
        res.status(404).json({message: e.message});
    }
}

const get_all_reviews = async (req, res) => {
    try{
        const reviews = await schemas.Review.findAll({
            include: schemas.User
        });
        res.status(200).json(reviews);
    } catch(e) {
        res.status(404).json({message: e.message});
    }
}

const add_review = async (req, res) => {
    try{
        const new_review = await schemas.Review.create({
            review: req.body.review,
            reviewer: req.body.reviewer
        }, {
            include: {
                model: schemas.User,
                as: 'reviewer'
            }
        });
        res.status(201).json(new_review);
    } catch (e){
        res.status(400).json({message: e.message});
    }
}

const controllers = {
    create_book,
    add_author,
    add_genre,
    get_all_books,
    get_all_reviews,
    add_review,
}

module.exports = controllers;