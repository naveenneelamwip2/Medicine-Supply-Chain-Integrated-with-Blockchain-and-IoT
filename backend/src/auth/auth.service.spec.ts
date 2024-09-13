import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            getUserByEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate a user', async () => {
    const email = 'test@example.com';
    const password = 'password';
    jest.spyOn(userService, 'getUserByEmail').mockResolvedValue({ emailId: email, password });

    const result = await service.validateUser(email, password);
    expect(result).toEqual({ emailId: email });
  });

  it('should login a user', async () => {
    const user = { email: 'test@example.com', userId: 'user1' };
    jest.spyOn(jwtService, 'sign').mockReturnValue('JWT_TOKEN');

    const result = await service.login(user);
    expect(result).toEqual({ access_token: 'JWT_TOKEN' });
  });
});
