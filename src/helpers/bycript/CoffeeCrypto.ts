import * as JSsha512 from 'js-sha512';

export class CoffeeCrypto {
  private readonly CoffeeSalt = process.env.PSW_SALT;

  async HashPassword(password: string) {
    const cyeSaltedEmail = password + this.CoffeeSalt;
    return JSsha512.sha512(cyeSaltedEmail);
  }
}
