import { Test, TestingModule } from '@nestjs/testing';
import { FincasService } from './fincas.service';

describe('FincasService', () => {
  let service: FincasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FincasService],
    }).compile();

    service = module.get<FincasService>(FincasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
