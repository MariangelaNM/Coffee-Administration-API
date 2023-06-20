import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateHealthCheckDto } from './dto/create-health-check.dto';
import { UpdateHealthCheckDto } from './dto/update-health-check.dto';
import { HealthChecksService } from './health-checks.service';

@Controller('health-checks')
export class HealthChecksController {
  constructor(private readonly healthChecksService: HealthChecksService) {}

  @Post()
  create(@Body() createHealthCheckDto: CreateHealthCheckDto) {
    return this.healthChecksService.create(createHealthCheckDto);
  }

  @Get()
  findAll() {
    return this.healthChecksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.healthChecksService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHealthCheckDto: UpdateHealthCheckDto,
  ) {
    return this.healthChecksService.update(+id, updateHealthCheckDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.healthChecksService.remove(+id);
  }
}
