const Books = require('../models/entity/books.entity')
const sqs = require('../lib/sqs.lib');
const uuid = require('uuid');



exports.findAll = async(req, res) => {

    Books.scan().exec().then( books => {
        books.forEach( (b) => {
            format(b);
        })
        res.send({books});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving books."
        });
    });

};
  
exports.findOne = async(req, res) => {

    Books.get(req.params.id).then( book => {
        
        if(!book) {
            return res.status(404).send({
                message: "Book not found with id " + req.params.id
            });            
        }

        format(book);

        res.send(book);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving book."
        });
    });

};
  
exports.create = async(req, res) => {
    var request = req.body;
    request.id = uuid.v4();

    Books.create(req.body).then( book => {
        sqs.send(book);
        res.send(book);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Book."
        });
    });
};
  
exports.update = async(req, res) => {
    
    Books.update(req.params.id,req.body).then( book => {
        if(!book) {
            return res.status(404).send({
                message: "Book not found with id " + req.params.id
            });            
        }
        format(book);
        res.send(book);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while updating book."
        });
    });

};
  
exports.delete = async(req, res) => {
    
    Books.delete(req.params.id).then( book => {
        res.json({message: 'Book deleted'});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while deleting book."
        });
    });
    
};


format = (b) => {
    b.authors = Array.from(b.authors);
}