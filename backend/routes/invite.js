// const express = require('express');
// const router = express.Router();
// const inviteController = require('../Controllers/Invitecontroller');
// const authMiddleware = require('../Middleware/authMiddleware');
// const roleMiddleware = require('../Middleware/roleMiddleware');



// router.use(authMiddleware);

// router.post('/', authMiddleware, roleMiddleware(['Admin']), inviteController.inviteUser);



// router.post('/', inviteController.inviteUser);

// module.exports = router;

const express = require('express');
const router = express.Router();
const inviteController = require('../Controllers/Invitecontroller');
const authMiddleware = require('../Middleware/authMiddleware');
const roleMiddleware = require('../Middleware/roleMiddleware');

router.post('/', authMiddleware, roleMiddleware(['Admin']), inviteController.inviteUser);
router.post('/accept/:token', inviteController.acceptInvite);

 
module.exports = router;

1