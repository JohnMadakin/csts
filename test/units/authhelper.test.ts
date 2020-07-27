import { hashPassword, checkHashedPassword } from '../../src/helpers/authhelper';

describe("AuthHelper unit tests", () => {
  it("should hash string", () => {
    const result = hashPassword('password@1');
    expect(typeof result).toEqual('string');
    expect(result).not.toEqual('password@1');
  });

  it("should compare hash strings and return true if they match", async () => {
    const hashedString = hashPassword('password@1');
    const result = await checkHashedPassword('password@1', hashedString);
    expect(typeof result).toEqual('boolean');
    expect(result).toEqual(true);
  });

  it("should compare hash strings and return false if they dont match", async () => {
    const hashedString = hashPassword('password@1');
    const result = await checkHashedPassword('password', hashedString);
    expect(typeof result).toEqual('boolean');
    expect(result).toEqual(false);
  });

});
