import { Test, TestingModule } from '@nestjs/testing';
import { RecolectoresService } from './recolectores.service';

describe('RecolectoresService', () => {
  let service: RecolectoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecolectoresService],
    }).compile();

    service = module.get<RecolectoresService>(RecolectoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
