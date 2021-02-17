const booksRepository = require("../repositories/books-repository");

const getAll = async (req, res) => {
    booksRepository.getAll().then((data) => res.status(200).json(data));
};

const getById = async (req, res) => {
    const book = await booksRepository.getById(req.params.id);

    if (book !== undefined) {
        res.status(200).json(book);
    } else {
        res.status(404).json();
    }
};

const create = async (req, res) => {
    booksRepository
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
    } else {
        res.status(404).json();
    }
};

const remove = async (req, res) => {
    const count = await booksRepository.remove(req.params.id);

    if (count !== 0) {
        res.status(200).json();
    } else {
        res.status(404).json();
    }
};

const getAuthors = async (req, res) => {
    booksRepository
        .getAuthors(req.params.id)
        .then((data) => res.status(200).json(data))
        .catch((error) => {
            res.status(404).json();
        });
};

const addAuthor = async (req, res) => {
    booksRepository
        .addAuthor(req.params.id, req.body)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((_) => res.status(404).json());
};

const removeAuthorFromBook = async (req, res) => {
    const count = await booksRepository.removeAuthorFromBook(
        req.params.idBook,
        req.params.idAuthor
    );

    if (count !== 0) {
        res.status(200).json();
    } else {
        res.status(404).json();
    }
};

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
