import { AmbrosiaException, AmbrosiaResponseOK } from '../BaseResponse';

export type LoginRequest = {
    username: string;
    password: string;
};

export type LoginResponseOk = AmbrosiaResponseOK & {
    session: SessionBase;
};
export type LoginResponse = LoginResponseOk | AmbrosiaException;

export interface SessionBase {
    sessionToken: string;
    expiration: Date;
}
