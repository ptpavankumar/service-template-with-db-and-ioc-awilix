const HealthcheckController = require('./healthcheck');
const UserController = require('./user');
const AddressController = require('./address');

module.exports = {
  healthcheckController: HealthcheckController,
  userController: UserController,
  addressController: AddressController,
};
