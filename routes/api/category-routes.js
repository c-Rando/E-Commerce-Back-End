const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// CRUD Routes

// [GET] /api/categories/
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({ include: Product });
    res.json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json({msg: err.message});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findOne({
      where: { id: req.params.id },
      include: Product
    });
    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json({msg: err.message});
  }
});

router.post('/', async (req, res) => {
  try {
    const newItem = await Category.create(req.body);
    res.status(201).json({ id: newItem.id, message: 'ok' });
  } catch (err) {
    console.log(err);
    res.status(500).json({msg: err.message});
  }
});

router.put('/:id', async (req, res) => {
  try {
    await Category.update(req.body, { where: { id: req.params.id } });
    res.status(201).json('ok');
  } catch (err) {
    console.log(err);
    res.status(500).json({msg: err.message});
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Category.destroy({ where: { id: req.params.id } });
    res.json('ok');
  } catch (err) {
    console.log(err);
    res.status(500).json({msg: err.message});
  }
});

module.exports = router;
