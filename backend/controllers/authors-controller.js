const authorsRepository = require("../repositories/authors-repository");

const getAll = async (req, res) => {
    authorsRepository.getAll().then((data) => res.status(200).json(data));
};

const getById = async (req, res) => {
    const author = await authorsRepository.getById(req.params.id);

    if (author !== undefined) {
        res.status(200).json(author);
    }

    res.status(404).json();
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
    }

    res.status(404).json();
};

const remove = async (req, res) => {
    const count = await authorsRepository.remove(req.params.id);

    if (count !== 0) {
        res.status(200).json();
    }

    res.status(404).json();
};

const getBooks = async (req, res) => {};

const addBook = async (req, res) => {};

const removeAuthorFromBook = async (req, res) => {};

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
