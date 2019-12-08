'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        id: '811FCB5D-7128-4AA6-BFEE-F1A8D3302CDA',
        email: 'test@example.com',
        last_name: 'test',
        hash: '$2b$10$IPwsYH8cAD9IarEGhj1/Vua2Lz4y/FD7GubAB.dNgfxgqx6i5heyy',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', {
      id: '811FCB5D-7128-4AA6-BFEE-F1A8D3302CDA'
    });
  }
};
