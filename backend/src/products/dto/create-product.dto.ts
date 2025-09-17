import {
  IsEAN,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
} from 'class-validator'

export class CreateProductDto {
  @IsEAN()
  ean: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string

  @IsInt()
  @Min(0)
  quantity: number

  @IsString()
  @MaxLength(255)
  location?: string

  @IsString()
  description?: string
}
