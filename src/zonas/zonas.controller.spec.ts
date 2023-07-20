import { Test, TestingModule } from '@nestjs/testing';
import { ZonasController } from './Zonas.controller';
import { ZonasService } from './Zonas.service';

describe('ZonasController', () => {
  let controller: ZonasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ZonasController],
      providers: [ZonasService],
    }).compile();

    controller = module.get<ZonasController>(ZonasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
