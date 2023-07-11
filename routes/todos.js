const db = require("../models")
const { Todo } = db;

var express = require('express');
const responseHandler = require("./responseHandlers");
var router = express.Router();

router.use(responseHandler)

router.get('/', async (_, res) => {
  try {
    const todos = await Todo.findAll();
    res.sendResponse(todos);
  } catch (error) {
    res.sendError(error.toString())
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, isCompleted } = req.body;
    if (!title) {
      return res.sendError('Field title required', 400)
    }

    const fresh = await Todo.create({
      title: title,
      isCompleted: isCompleted ?? false,
    })

    return res.sendResponse(fresh.toJSON())
  } catch (error) {
    return res.sendError('Internal server error')
  }
})

router.put('/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const { title, isCompleted } = req.body;
    const data = await Todo.findByPk(id);

    if(!data) {
      return res.sendError('Data not found', 404)
    }

    data.title = title;
    data.isCompleted = isCompleted;

    const update = await data.save()

    return res.sendResponse(update.toJSON())

  } catch (error) {
    return res.sendError('Internal server error')
  }
})

router.delete('/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const data = await Todo.findByPk(id);

    if(!data) {
      return res.sendError('Data not found', 404)
    }

    await data.destroy();

    return res.sendResponse("SUKSES", 200)
  } catch (error) {
    return res.sendError('Internal server error')
  }
})

module.exports = router;
