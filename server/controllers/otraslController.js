const {Otrasl} = require("../models/models");

class OtraslController {
    async create(req, res) {
        const {name} = req.body
        const otrasl = await Otrasl.create({name})
        return res.json(otrasl)
    }
    async getAll(req, res) {
        const otrasls = await Otrasl.findAll()
        return res.json(otrasls)
    }
    async delete(req, res) {

    }
}

module.exports = new OtraslController()