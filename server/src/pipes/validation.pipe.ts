import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import { validate } from 'class-validator'
import { ValidationException } from '../exceptions/validation.exception'
import { plainToInstance } from 'class-transformer'


@Injectable()
export class ValidationPipe implements PipeTransform<any> {
	async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
		const object = plainToInstance(metadata.metatype, value)
		const errors = await validate(object)

		if (errors.length) {
			console.log(errors)
			// const messages: string[] = errors.map(error => {
			// 	return `${error.property} - ${Object.values(error.constraints).join(', ')}`
			// })
			throw new ValidationException('')
		}

		return value
	}

}
