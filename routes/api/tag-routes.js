const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({ include: Product });
    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({msg: err.message});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findOne({
      where: { id: req.params.id },
      include: Product
    });
    res.json(tag);
  } catch (err) {
    console.log(err);
    res.status(500).json({msg: err.message});
  }
});

router.post('/', async (req, res) => {
  try {
    await Tag.create(req.body);
    res.status(201).json('ok');
  } catch (err) {
    console.log(err);
    res.status(500).json({msg: err.message});
  }
});

router.put('/:id', async (req, res) => {
  try {
    await Tag.update(req.body, { where: { id: req.params.id } });
    res.status(201).json('ok');
  } catch (err) {
    console.log(err);
    res.status(500).json({msg: err.message});
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Tag.destroy({ where: { id: req.params.id } });
    res.json('ok');
  } catch (err) {
    console.log(err);
    res.status(500).json({msg: err.message});
  }
});

module.exports = router;
