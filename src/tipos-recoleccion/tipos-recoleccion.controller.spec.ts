import { Test, TestingModule } from '@nestjs/testing';
import { TiposRecoleccionController } from './tipos-recoleccion.controller';
import { TiposRecoleccionService } from './tipos-recoleccion.service';

describe('TiposRecoleccionController', () => {
  let controller: TiposRecoleccionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TiposRecoleccionController],
      providers: [TiposRecoleccionService],
    }).compile();

    controller = module.get<TiposRecoleccionController>(TiposRecoleccionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
