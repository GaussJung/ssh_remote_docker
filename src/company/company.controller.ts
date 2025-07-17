import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

/**
 * Company Controller
 */
@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':cid')
  findOne(@Param('cid') cid: string) {
    return this.companyService.findOne(Number(cid));
  }

  @Post()
  create(@Body() dto: CreateCompanyDto) {
    return this.companyService.create(dto);
  }

  @Post('search/cname')
  searchByCname(@Body() body: { cname: string }) {
    return this.companyService.searchByCname(body.cname);
  }

  @Post('search/cphone')
  searchByCphone(@Body() body: { cphone: string }) {
    return this.companyService.searchByCphone(body.cphone);
  }

  @Put(':cid')
  update(@Param('cid') cid: string, @Body() dto: UpdateCompanyDto) {
    return this.companyService.update(Number(cid), dto);
  }

  @Delete(':cid')
  delete(@Param('cid') cid: string) {
    return this.companyService.delete(Number(cid));
  }
}