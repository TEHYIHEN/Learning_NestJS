import { CreatePropertyDto } from "./createProperty.dto";
import {PartialType} from "@nestjs/swagger"

export class UpdatePropertyDto extends PartialType(CreatePropertyDto){};