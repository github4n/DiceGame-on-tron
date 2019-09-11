const router = require('koa-router')();
const ring = require('./ring');
const dice = require('./dice');
const eiffelTower = require('./eiffelTower');

router.use('/ringBackend', ring.routes(), ring.allowedMethods());
router.use('/backend', dice.routes(), dice.allowedMethods());
router.use('/eiffelTowerBackend', eiffelTower.routes(), eiffelTower.allowedMethods());
module.exports = router;