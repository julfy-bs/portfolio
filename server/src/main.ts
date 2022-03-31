import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'

async function start() {
	const PORT = process.env.PORT || 3000
	const app = await NestFactory.create(AppModule)

	const config = new DocumentBuilder()
		.setTitle('Backend для сайта портфолио')
		.setDescription('описание')
		.setVersion('1.0.0')
		.addTag('portfolio')
		.build()

	const document = SwaggerModule.createDocument(app,  config)
	SwaggerModule.setup('/api/docs', app, document)

	// app.useGlobalPipes(new ValidationPipe())

	app.listen(PORT,  () => {
		console.log(`server start on PORT:${PORT}`)
	})
}

start()
