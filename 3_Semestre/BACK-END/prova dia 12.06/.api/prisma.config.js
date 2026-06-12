const { defineConfig } = require('@prisma/config');

module.exports = defineConfig({
  datasource: {
    url: "mysql://root:@localhost:3306/hotel_db",
  },
});