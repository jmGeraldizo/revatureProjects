import Express from 'express';
import logger from '../log';
import trService from '../trForm/tr.service'

const router = Express.Router();

router.get('/', function(req, res, next) {
  trService.getClaims().then((claims) => {
      logger.debug(claims);
      res.send(JSON.stringify(claims));
  });
});

router.get('/:id', function(req, res, next) {
  console.log(req.params.id);
  trService.getClaimByName(req.params.id).then((rest)=>{
      res.send(JSON.stringify(rest));
  }).catch((er) => {
    logger.error(er);
  });
});

router.delete('/:id', function (req, res, next) {
  logger.debug(req.body);
  trService.deleteClaim(req.params.id).then((data)=> {
      logger.debug(data);
      res.sendStatus(200); // Created
  }).catch((err) => {
      logger.error(err);
      res.sendStatus(500); // Server error, sorry
  })
});

router.post('/', (req, res, next) => {
  logger.debug(req.body);
  trService.addClaim(req.body).then((data)=> {
      logger.debug(data);
      res.sendStatus(201); // Created
  }).catch((err) => {
      logger.error(err);
      res.sendStatus(500); // Server error, sorry
  });
});

router.put('/', (req, res, next) => {
  logger.debug(req.body);
  trService.updateClaim(req.body).then((data)=> {
    logger.debug(data);
    res.send(data);
  }).then((err) => {
    logger.debug(err);
  });
});

router.patch('/', (req, res, next) => {
  logger.debug(req.body);
  trService.updateStatus(req.body).then((data)=> {
    logger.debug(data);
    res.send(data);
  }).then((err) => {
    logger.debug(err);
  });
});



export default router;