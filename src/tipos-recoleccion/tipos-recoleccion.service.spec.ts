import { Test, TestingModule } from '@nestjs/testing';
import { TiposRecoleccionService } from './tipos-recoleccion.service';

describe('TiposRecoleccionService', () => {
  let service: TiposRecoleccionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TiposRecoleccionService],
    }).compile();

    service = module.get<TiposRecoleccionService>(TiposRecoleccionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
