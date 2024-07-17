// app.js
const express = require('express');
const app = express();
const userController = require("./routes/userController");
const authController = require("./routes/authController");
const productController = require("./routes/productController");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Salvus teste tecnico Back-end',
      version: '1.0.0',
      description: 'Documentação EXPRESS BACK-END',
      contact: {
        name: 'João vitor de lima',
        email: 'joaolimaprofissional@hotmail.com',
        url: 'https://github.com/JoaolimaDev'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    }
  },
  apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use(express.json());
app.use("/users", userController);
app.use("/auth", authController);
app.use("/produtos", productController);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
