import { Test, TestingModule } from '@nestjs/testing';
import { CaficultoresController } from './caficultores.controller';
import { CaficultoresService } from './caficultores.service';

describe('CaficultoresController', () => {
  let controller: CaficultoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CaficultoresController],
      providers: [CaficultoresService],
    }).compile();

    controller = module.get<CaficultoresController>(CaficultoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
