import {
    CanActivate,
    ExecutionContext,
    Injectable,
    SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { isArray } from 'class-validator';
import { ExceptionFactory } from '../base/ExceptionFactory';
import { sessionStore } from './SessionStore';

export enum Role {}

const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles: Role[] = this.reflector.getAllAndOverride<Role[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()]
        );
        if (!requiredRoles) return true;
        const request = context.switchToHttp().getRequest();
        for (const role of requiredRoles) {
            switch (role) {
            }
        }
        return true;
    }

    verifyAdmin(request: any) {
        const auth: string = request.headers.authorization;
        const starting = 'Bearer ';
        if (!auth) {
            ExceptionFactory.instance.badRequest('No authorization header');
            return false;
        }
        if (!auth.startsWith(starting)) {
            ExceptionFactory.instance.badRequest('Bad authorization format');
            return false;
        }
        const token = auth.substring(starting.length);
        this.validateSession(token);
        return true;
    }
    validateSession(sessionToken: string) {
        const isValid = sessionStore.isSessionValid(sessionToken);
        if (!isValid) throw ExceptionFactory.instance.badSession();
    }
}
