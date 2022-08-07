const router = require('express').Router();
const { Category, Product } = require('../../models');
const seedCategories = require('../../seeds/category-seeds');

// The `/api/categories` endpoint

// find all categories
// be sure to include its associated Products
router.get('/', (req, res) => {
  Category.findAll( {include: [{model: Product}]})
  .then((data) => res.json(data))
  .catch((error) => res.json(error))
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, { include: [{ model: Product}] })
  .then((data) => res.json(data))
});

router.post('/', (req, res) => {  
  // create a new category
  Category.create({ //req.body
    category_name: req.body.category_name,
  })
  .then((newCategory) => res.json(newCategory))
  .catch((error) => res.json(error))
});

router.post('/seed', async (req, res) => {
  // seedCategories
  try {
      const seedData = await seedCategories()
      res.json(seedData)
  } catch (error) {
    res.json(error)
  }
})

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({category_name: req.body.category_name}, {where: {id: req.params.id}})
  .then((updateCategory) => { //then get updated category? 
    const responseMsg = `Category ${req.params.id} has been updated`
    res.json({message: responseMsg})
  })
  .catch((error) => res.json(error))
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value .destroy
  Category.destroy({ where: {id: req.params.id}})
  .then((deleteCategory) => {
    const deleteMsg = `Category has been deleted`
    res.json(deleteMsg)
  })
  .catch((err) => {
    console.log(err),
    res.status(500).json(err);
  })
});

module.exports = router;
