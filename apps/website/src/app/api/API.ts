import {
    BackupPartUploadRequest,
    BackupUploadRequest,
    BackupUploadResponse,
    Endpoints,
    LoginRequest,
    LoginResponse,
} from '@api/io-model';

import { getSessionToken } from '../elf/self-user/SelfUser.repository';
import { RequestBuilder, RequestMethod } from './RequestBuilder';
import sha256 from 'sha256';
import { BackupPart, fileSplit } from './fileSplit';
import { createHash } from 'crypto';

const loc = window.location;
let baseURL: string = loc.href.slice(
    0,
    loc.href.length - loc.pathname.length - loc.port.length
);

export namespace API {
    export function request(url: string): RequestBuilder {
        return new RequestBuilder(baseURL + url);
    }
    export function get(url: string): RequestBuilder {
        return request(url).setMethod(RequestMethod.Get);
    }
    export function post(url: string): RequestBuilder {
        return request(url).setMethod(RequestMethod.Post);
    }
    export function authorize(request: RequestBuilder): RequestBuilder {
        const token = getSessionToken();
        return request.addHeader({
            authorization: `Bearer ${token}`,
        });
    }
    export async function login(login: LoginRequest): Promise<LoginResponse> {
        return await post(Endpoints.user.login.url)
            .config('auth', login)
            .build();
    }
    export async function backupUploadPart(chunk: BackupPart) {
        return await authorize(post(Endpoints.backup.next))
            .queryParam({ uuid: chunk.uuid })
            .payload(chunk.data)
            .build();
    }
    export async function backupUpload(upload: File) {
        const chunks: BackupPart[] = await fileSplit(upload);

        // change to 'sha256' if you want an sha256 hash
        const hash = createHash('sha1');

        // change to 'binary' if you want a binary hash.
        hash.setEncoding('hex');

        // the text that you want to hash
        hash.write('hello world');

        // very important! You cannot read from the stream until you have called end()
        hash.end();

        // and now you get the resulting hash
        var sha1sum = hash.read();
        const request: BackupUploadRequest = {
            displayName: 'Test',
            location: '/hello',
            sha256: sha256Hash,
            parts: chunks,
            size: upload.size,
        };
        const uploadResponse: BackupUploadResponse = await authorize(
            post(Endpoints.backup.url)
        )
            .payload(request)
            .build();
        if (!uploadResponse.isOk) return uploadResponse;
        chunks.map(backupUploadPart);
        return uploadResponse;
    }
}
