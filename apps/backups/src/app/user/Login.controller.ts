import {
    Endpoints,
    LoginResponse,
    LoginResponseOk,
    okRes,
    okResponse,
    SessionBase,
} from '@api/io-model';
import { Controller, Headers, Post, Req, Res, Response } from '@nestjs/common';
import { sessionStore } from '../auth/SessionStore';
import { ControllerBase } from '../base/ControllerBase';

@Controller(Endpoints.user.login.url)
export class LoginController extends ControllerBase {
    @Post()
    post(@Headers('authorization') auth: string): LoginResponseOk {
        this.validateGoodLogin(auth);
        const session: SessionBase = sessionStore.newSession();
        return okRes({ session });
    }
}
