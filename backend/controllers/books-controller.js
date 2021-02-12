const booksRepository = require("../repositories/books-repository");

const getAll = async (req, res) => {
    booksRepository.getAll().then((data) => res.status(200).json(data));
};

const getById = async (req, res) => {
    const book = await booksRepository.getById(req.params.id);

    if (book !== undefined) {
        res.status(200).json(book);
    }

    res.status(404).json();
};

const create = async (req, res) => {
    const book = booksRepository
        .create(req.body)
        .then((data) => {
            res.status(201).json(req.body);
        })
        .catch((error) => {
            res.status(500);
        });
};

const update = async (req, res) => {
    const count = await booksRepository.update(req.params.id, req.body);

    if (count !== 0) {
        res.status(200).json();
    }

    res.status(404).json();
};

const remove = async (req, res) => {
    const count = await booksRepository.remove(req.params.id);

    if (count !== 0) {
        res.status(200).json();
    }

    res.status(404).json();
};

const getAuthors = async (req, res) => {};

const addAuthor = async (req, res) => {};

const removeAuthorFromBook = async (req, res) => {};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    getAuthors,
    addAuthor,
    removeAuthorFromBook,
};
