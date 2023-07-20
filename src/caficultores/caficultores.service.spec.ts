import { Test, TestingModule } from '@nestjs/testing';
import { CaficultoresService } from './caficultores.service';

describe('CaficultoresService', () => {
  let service: CaficultoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CaficultoresService],
    }).compile();

    service = module.get<CaficultoresService>(CaficultoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
