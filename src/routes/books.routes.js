
module.exports = (app) => {
    const booksController = require('../controllers/books.controller');

    app.post('/', booksController.create);
    app.get('/', booksController.findAll);
    app.get('/:id', booksController.findOne);
    app.put('/:id', booksController.update);
    app.delete('/:id', booksController.delete);
}