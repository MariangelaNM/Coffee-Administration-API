import { Test, TestingModule } from '@nestjs/testing';
import { HealthChecksService } from './health-checks.service';

describe('HealthChecksService', () => {
  let service: HealthChecksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthChecksService],
    }).compile();

    service = module.get<HealthChecksService>(HealthChecksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
