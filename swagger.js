const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Secure User Management API",
      version: "1.0.0",
      description: "Auth API with JWT + Roles + Refresh Tokens"
    }
  },
  apis: ["./routes/*.js"],
};

module.exports = swaggerJsdoc(options);
