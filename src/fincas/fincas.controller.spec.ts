import { Test, TestingModule } from '@nestjs/testing';
import { FincasController } from './fincas.controller';
import { FincasService } from './fincas.service';

describe('FincasController', () => {
  let controller: FincasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FincasController],
      providers: [FincasService],
    }).compile();

    controller = module.get<FincasController>(FincasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
