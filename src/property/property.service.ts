import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from 'src/entities/property.entity';
import { Repository } from 'typeorm';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { UpdatePropertyDto } from './dto/updateProperty.dto';
import { PaginationDTO } from './dto/pagination.dto';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constants';

@Injectable()
export class PropertyService {

    constructor(
        @InjectRepository(Property)
        private propertyRepo: Repository<Property>
    ) {} //using private so inside {} no need to put this.propertyRepo = repo;  


    async findOne(id:number){
       const property = await this.propertyRepo.findOne({where: {id}});

       if(!property) throw new NotFoundException();
       return property;
    }

    async findAll(paginationDTO: PaginationDTO){
        return await this.propertyRepo.find({ 
            //skip = start from which id
            //take = limit show how many id
            //example: In Postman, choose GET, fill in column Key and Value in Params, skip = 11, limit = 15 ; result will be from id 12 to 26
            skip: paginationDTO.skip, 
            take: paginationDTO.limit ?? DEFAULT_PAGE_SIZE  // default = 10 if undefined
        });
    }
    
    async create(dto: CreatePropertyDto){
       return await this.propertyRepo.save(dto);

    }

    async update(id:number, dto: UpdatePropertyDto){
        return await this.propertyRepo.update({id}, dto);
    }

    async delete(id:number){
        return await this.propertyRepo.delete({id});
    }
}

