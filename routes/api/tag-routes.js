const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const seedTags = require('../../seeds/tag-seeds');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll( {include: [{model: Product}]})
  .then((data) => res.json(data))
  .catch((error) => res.json(error))
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id, { include: [{ model: Product}] })
  .then((data) => res.json(data))
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({ //req.body
    tag_name: req.body.tag_name,
  })
  .then((newTag) => res.json(newTag))
  .catch((error) => res.json(error))
});

router.post('/seed', async (req, res) => {
  // seedTags
  try {
    const seedData = await seedTags()
    res.json(seedData)
} catch (error) {
  res.json(error)
}

});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const updateTag = await Tag.update({tag_name: req.body.tag_name}, {where: {id: req.params.id}})
  const responseMsg = `Tag ${req.params.id} has been updated`
  res.json({
    message: responseMsg,
    result: updateTag
  })
  // Tag.update({tag_name: req.body.tag_name}, {where: {id: req.params.id}})
  // .then((updateTag) => { //get updated message function? 
  //   const responseMsg = `Tag ${req.params.id} has been updated`
  //   res.json({message: responseMsg})
  // })
  // // .then((product) => { 
  // //   return ProductTag.findAll({ where: { tag_id: req.params.id } })
  // // })
  // .catch((error) => res.json(error))
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({ where: {id: req.params.id}})
  .then((deleteTag) => {
    const deleteMsg = `Tag has been deleted`
    res.json(deleteMsg)
  }) //response message
});

module.exports = router;
