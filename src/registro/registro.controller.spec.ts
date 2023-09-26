import { Test, TestingModule } from '@nestjs/testing';
import { RegistroController } from './registro.controller';
import { RegistroService } from './registro.service';

describe('RegistroController', () => {
  let controller: RegistroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistroController],
      providers: [RegistroService],
    }).compile();

    controller = module.get<RegistroController>(RegistroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
