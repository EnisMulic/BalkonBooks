const authorsRepository = require("../repositories/authors-repository");
const booksRepository = require("../repositories/books-repository");

const getAll = async (req, res) => {
    authorsRepository.getAll().then((data) => res.status(200).json(data));
};

const getById = async (req, res) => {
    const author = await authorsRepository.getById(req.params.id);

    if (author !== undefined) {
        res.status(200).json(author);
    } else {
        res.status(404).json();
    }
};

const create = async (req, res) => {
    authorsRepository
        .create(req.body)
        .then(() => {
            res.status(201).json(req.body);
        })
        .catch((error) => {
            res.status(500);
        });
};

const update = async (req, res) => {
    const count = await authorsRepository.update(req.params.id, req.body);

    if (count !== 0) {
        res.status(200).json();
    } else {
        res.status(404).json();
    }
};

const remove = async (req, res) => {
    const count = await authorsRepository.remove(req.params.id);

    if (count !== 0) {
        res.status(200).json();
    } else {
        res.status(404).json();
    }
};

const getBooks = async (req, res) => {
    authorsRepository
        .getBooks(req.params.idAuthor)
        .then((data) => res.status(200).json(data))
        .catch((error) => {
            res.status(404).json();
        });
};

const addBook = async (req, res) => {
    authorsRepository
        .addBook(req.params.idAuthor, req.body)
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
    getBooks,
    addBook,
    removeAuthorFromBook,
};
