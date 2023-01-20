const router = require('express').Router();
const userRoutes = require('./userRoutes')
const profileRoutes = require('./profileRoutes')
const postRoutes = require('./postRoutes')

router.use('/users', userRoutes);
router.use('/profiles', profileRoutes);
router.use('/posts', postRoutes)

module.exports = router;
