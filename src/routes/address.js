const BaseRouter = require('express').Router;
const { errorTypes, ValidationError } = require('../models');

const addressPost = (req, res) => (
  req.scope.addressController.create(req.body)
    .then(result => (
      res.status(201).send({ data: result.data })
    ))
    .catch((err) => {
      if (err instanceof ValidationError) {
        return res.status(400).send({
          errors: err.message,
        });
      }

      return res.status(500).send({ errors: err.code });
    })
);

const addressGet = (req, res) => (
  req.scope.addressController.fetch()
    .then(result => (
      res.status(200).send({ data: result.data })
    ))
    .catch(err => (
      res.status(500).send({ errors: err.message })
    ))
);

const addressGetById = (req, res) => (
  req.scope.addressController.fetchSingle(req.params.addressid)
    .then(result => (
      res.status(200).send({ data: result.data })
    ))
    .catch((err) => {
      if (err.message === errorTypes.Unavailable) {
        return res.status(404).send();
      }

      return res.status(500).send({ errors: err.message });
    })
);

const addressPut = (req, res) => (
  req.scope.addressController.update(req.params.addressid, req.body)
    .then(result => (
      res.status(200).send(result.data)
    ))
    .catch((err) => {
      if (err.message === errorTypes.Unavailable) {
        return res.status(404).send();
      }

      return res.status(500).send({ errors: err.message });
    })
    .catch((err) => {
      console.log(err); // eslint-disable-line no-console
      return res.status(500).send({ errors: err });
    })
);

const addressDelete = (req, res) => (
  req.scope.addressController.deleteSingle(req.params.addressid, req.body)
    .then(result => (
      res.status(200).send(result.data)
    ))
    .catch(err => (
      res.status(500).send({ errors: err })
    ))
);

class Router extends BaseRouter {
  constructor() {
    super();

    this.post('address', addressPost);
    this.get('address', addressGet);
    this.get('/address/:addressid', addressGetById);
    this.put('/address/:addressid', addressPut);
    this.delete('/address/:addressid', addressDelete);
  }
}

module.exports = Router;
