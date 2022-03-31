"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function start() {
    const PORT = process.env.PORT || 3000;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Backend для сайта портфолио')
        .setDescription('описание')
        .setVersion('1.0.0')
        .addTag('portfolio')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('/api/docs', app, document);
    app.listen(PORT, () => {
        console.log(`server start on PORT:${PORT}`);
    });
}
start();
//# sourceMappingURL=main.js.map