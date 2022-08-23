import { AmbrosiaException, AmbrosiaResponseOK } from '../BaseResponse';

export type BackupPartUploadRequest = { uuid: string };

export type BackupPartUploadResponseOk = AmbrosiaResponseOK;
export type BackupPartUploadResponse =
    | BackupPartUploadResponseOk
    | AmbrosiaException;
