const db_client = require('./db');
const { DataTypes } = require('sequelize');

const Book = db_client.define('book', {
    book_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    book_detail: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ""
    },
    publication_year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pages: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    average_rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0
    },
    number_of_reviews: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
});

const Author = db_client.define('author', {
    author_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

const BookAuthor = db_client.define('bookauthor', {
});

Book.belongsToMany(Author, {through: BookAuthor});
Author.belongsToMany(Book, {through: BookAuthor});

const Genre = db_client.define('genre', {
    genre_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

const BookGenre = db_client.define('bookgenre', {});

Book.belongsToMany(Genre, {through: BookGenre});
Genre.belongsToMany(Book, {through: BookGenre});

const Review = db_client.define('review', {
    review_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    review: {
        type: DataTypes.STRING,
        allowNull: false
    },
    review_date: {
        type: DataTypes.DATE,
        allowNull: false,
        default: Date.now()
    },
});

const User = db_client.define('user', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nationality: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

User.hasMany(Review);
Review.belongsTo(User);

const Shelf = db_client.define('shelf', {
    user_id: DataTypes.INTEGER,
    shelf_type: DataTypes.INTEGER,
}, {
    primarykey: ['user_id', 'shelf_type']
});

User.hasMany(Shelf);
Shelf.belongsTo(User);

const BookShelf = db_client.define('bookshelf', {});

Book.belongsToMany(Shelf, { through: BookShelf });
Shelf.belongsToMany(Book, { through: BookShelf });

const schemas = {
    Book, 
    Author, 
    Genre,
    BookAuthor,
    BookGenre,
    Review,
    User,
    BookShelf,
    Shelf,
}

db_client.sync()
        .then(() => {
            console.log('DB and tables created');
        })
        .catch(e => {
            console.error('Error creating database and tables:', e);
        });

module.exports = schemas;