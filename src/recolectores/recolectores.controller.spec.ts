import { Test, TestingModule } from '@nestjs/testing';
import { RecolectoresController } from './recolectores.controller';
import { RecolectoresService } from './recolectores.service';

describe('RecolectoresController', () => {
  let controller: RecolectoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecolectoresController],
      providers: [RecolectoresService],
    }).compile();

    controller = module.get<RecolectoresController>(RecolectoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
