import { Test, TestingModule } from '@nestjs/testing';
import { PeriodosService } from './periodos.service';

describe('PeriodosService', () => {
  let service: PeriodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PeriodosService],
    }).compile();

    service = module.get<PeriodosService>(PeriodosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
