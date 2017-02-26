const awilix = require('awilix');
const repositories = require('../repository');
const routes = require('../routes');

const container = awilix.createContainer();

// Register all the repositories
container.registerClass({ addressRepository: repositories.AddressRepository });
container.registerClass({ userRepository: repositories.UserRepository });

// Register routes
container.registerClass({ healthRouter: routes.HealthRouter });
container.registerClass({ userRouter: routes.UserRouter });
container.registerClass({ addressRouter: routes.AddressRouter });
// Register database config

module.exports = container;
