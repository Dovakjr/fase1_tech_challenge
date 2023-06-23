import { UsuariosService } from './usuarios.service';
import { UserAdapterInMemory } from './gateways/usuario-adapter-inMemory';
import { of } from 'rxjs';

const mockHttpService = {
  post: jest.fn().mockReturnValue(of(null)),
};

describe('UserService', () => {
  let service: UsuariosService;
  let userAdapter: UserAdapterInMemory;

  beforeEach(() => {
    userAdapter = new UserAdapterInMemory();
    service = new UsuariosService(userAdapter, mockHttpService as any);
  });

  it('Deve criar um usuário', async () => {
    const user = await service.create({ name: 'Mateus' });
    expect(userAdapter.items).toEqual([user]);
  });
});

/* beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuariosService],
    }).compile();

    service = module.get<UsuariosService>(UsuariosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  }); */
