import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class CoffeeKeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const coffeeKey = request.headers['coffee-key'];

    if (!coffeeKey || coffeeKey !== process.env.COFFEE_KEY) {
      return false;
    }

    return true;
  }
}
