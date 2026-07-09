import { validate } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

describe('CreateUserDto', () => {
  let dto = new CreateUserDto();

  beforeEach(() => {
    dto = new CreateUserDto();
    dto.email = 'test@test.com';
    dto.name = 'John';
    dto.password = '123456Ab#';
  });

  it('should validate complete valid data', async () => {
    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });

  it('should fail on invalid email', async () => {
    dto.email = 'testest.com';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('email');
    expect(errors[0].constraints).toHaveProperty('isEmail');
  });

  const testPassword = async (password: string, message: string) => {
    dto.password = password;
    const errors = await validate(dto);
    const passwordError = errors.find((error) => error.property === 'password');
    expect(passwordError).not.toBeUndefined();
    const messages = Object.values(passwordError?.constraints ?? {});
    expect(messages).toContain(message);
  };

  it('should fail without 1 uppercase letter', async () => {
    testPassword('abcdfa', 'Password must contain at least 1 uppercase letter');
  });

  it('should fail without 1 uppercase number', async () => {
    testPassword('asdbcdA', 'Password must contain at least 1 number');
  });
});
