const Router = require('express')
const router = new Router()
const job_pageRouter = require('./job_pageRouter')
const otraslRouter = require('./otraslRouter')
const specialRouter = require('./specialRouter')
const userRouter = require('./userRouter')
const profile_pageRouter = require('./profile_pageRouter')
const job_reg = require('./job_regRouter')

router.use('/user', userRouter);
router.use('/otrasl', otraslRouter);
router.use('/special', specialRouter);
router.use('/job_page', job_pageRouter);
router.use('/profile_page', profile_pageRouter);
router.use('/job_reg', job_reg);

module.exports = router
