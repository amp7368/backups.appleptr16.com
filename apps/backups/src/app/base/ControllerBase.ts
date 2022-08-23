import { LoginRequest, SessionBase } from '@api/io-model';
import { ExceptionFactory } from './ExceptionFactory';

export class ControllerBase {
    protected exception: ExceptionFactory = ExceptionFactory.instance;
    validateExists(request: unknown) {
        if (!request) this.exception.badRequest(request);
    }

    validateGoodLogin(header: string) {
        const startingLength = 'Basic '.length;
        if (!header || header.length < startingLength)
            this.exception.loginBadCredentials();
        header = header.slice(startingLength);
        const credentialsRaw = Buffer.from(header, 'base64').toString();
        const [username, password] = credentialsRaw.split(':');
        if (username !== 'appleptr16' || password !== 'appleptr16')
            this.exception.loginBadCredentials();
    }
}
