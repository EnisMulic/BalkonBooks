const repo = require("../repositories/book-repository");

const getAll = async (req, res) => {
    repo.getAll().then((data) => res.send(data));
};

const getById = async (req, res) => {
    repo.getById(req.params.id).then((data) => res.send(data));
};

const create = async (req, res) => {
    repo.create(req.body).then((data) => {
        res.send(data);
    });
};

const update = async (req, res) => {
    await repo.update(req.params.id, req.body);
    return res.sendStatus(200);
};

const remove = async (req, res) => {
    const success = await repo.remove(res.params.id);
    res.json({ success: success });
};

module.exports = { getAll, getById, create, update, remove };
