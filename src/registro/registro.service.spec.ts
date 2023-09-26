import { Test, TestingModule } from '@nestjs/testing';
import { RegistroService } from './registro.service';

describe('RegistroService', () => {
  let service: RegistroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistroService],
    }).compile();

    service = module.get<RegistroService>(RegistroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
