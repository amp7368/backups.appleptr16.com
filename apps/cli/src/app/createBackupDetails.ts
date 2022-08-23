import {
    CreateDetailsRequest,
    CreateDetailsResponse,
    Endpoints,
} from '@api/io-model';
import { environment } from '../environments/environment';
import { RequestBuilder, RequestMethod } from './RequestBuilder';

export function createBackupDetails(
    request: CreateDetailsRequest
): Promise<CreateDetailsResponse> {
    return new RequestBuilder(environment.baseURL)
        .setMethod(RequestMethod.Post)
        .url(Endpoints.backup.url, Endpoints.backup.create)
        .payload(request)
        .build();
}
