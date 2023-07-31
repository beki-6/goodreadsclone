const schemas = require('../models/schemas');

const add_user = async (req, res) => {
    try{
        const new_user = await schemas.User.create({
            user_name: req.body.user_name,
            email: req.body.email,
            password: req.body.password,
            nationality: req.body.nationality,
        });
        const user_id = new_user.user_id;
        const shelf = await schemas.Shelf.create({id: {user_id: user_id, shelf_type: 0}});
        // await schemas.Shelf.create({user_id: user_id, shelf_type: 1});
        // await schemas.Shelf.create({user_id: user_id, shelf_type: 2});
        console.log(shelf.id)
        res.status(201).json(new_user)
    } catch(e){
        res.status(400).json({message: e.message})
    }
}

const add_book_to_shelf = async (req, res) => {
    try{
        const user = await schemas.User.findByPk(req.params.user_id);
        if(!user) return res.status(404).json({message: "User not found!"});
        const book = await schemas.Book.findByPk(req.params.book_id);
        if(!book) return res.status(404).json({message: "Book doesn't exist!"});
        const shelf = await schemas.Shelf.findByPk({
            user_id: user.user_id,
            shelf_type: req.params.shelf_type
        });
        await shelf.addBook();
    } catch(e){
        res.status(400).json({message: e.message});
    }
}

const add_shelf = async (req, res) => {
    try{
        const new_shelf = await schemas.Shelf.create({
            user_id: req.params.user_id,
            shelf_type: req.params.shelf_type
        });
        res.status(201).json(new_shelf);
    } catch (e) {
        res.status(400).json({message: e.message});
    }
}

const controllers = {
    add_user,
    add_book_to_shelf,
    add_shelf,
}

module.exports = controllers;