import { Test, TestingModule } from '@nestjs/testing';
import { ZonasService } from './zonas.service';

describe('ZonasService', () => {
  let service: ZonasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ZonasService],
    }).compile();

    service = module.get<ZonasService>(ZonasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
