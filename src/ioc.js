const awilix = require('awilix');
const repositories = require('./repository');

const container = awilix.createContainer();

// Register all the repositories
container.registerClass({ addressRepository: repositories.AddressRepository });
container.registerClass({ userRepository: repositories.UserRepository });


module.exports = container;
