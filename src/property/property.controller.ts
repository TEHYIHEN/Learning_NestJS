import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';

@Controller('property')
export class PropertyController {

    @Get()
    findAll(){
        return "All Properties";
    }

    @Get(":id")
    findOne(@Param("id") id: string){ //@Param get the "id" from URL, and pass "id" to specific function for get data in database

        //Mock Database
        // if(id === "1"){
        //     return {id: "1", title: "Google", status: "Active"}
        // }else if ( id === "2")
        //     return {id: "2", title: "Facebook", status: "Active"}

        //     return { message : "ID not found"}
        return id;
    }

    // @Get(":company/:ceo")
    // findCeo(
    //     @Param("company") cID: string,
    //     @Param("ceo") ceoID: string
    // ){
    //     return `Company was ${cID} and CEO was ${ceoID}.`

    // }



    /*
    Testing with the example in Postman - body Tab

    {
        "name": "teh",
        "id": 1
    }
    */


    // @Post()
    // create(@Body() body){
    //     return body;

    // }        --> result same as { "name": "teh", "id": 1}

    @Post()
    @HttpCode(204)   //to show status code, normal they have default value, example GET = 200. POST = 201
    create(@Body("name") name){
        return name;

    }               // --> result only have teh

}
