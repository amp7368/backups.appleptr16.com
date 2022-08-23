import {
    AmbrosiaException,
    AmbrosiaResponse,
    AmbrosiaResponseOK,
} from '../BaseResponse';

export interface Backup {
    uuid: string;
    dateCreated: Date;
    size: number;
    sha256: string;
    displayName: string;
    location: string[];
}

export type BackupUploadPartRequest = {
    uuid: string;
    index: number;
};
export type BackupUploadFinalRequest = {
    uuid: string;
    displayName: string;
    location: string;
    parts: { sha256: string }[];
    sha256: string;
    size: number;
};

export type BackupUploadResponseOK = AmbrosiaResponseOK & { backup: Backup };
export type BackupUploadResponse = BackupUploadResponseOK | AmbrosiaException;

export type CreateDetailsRequest = {
    displayName: string;
    location: string[];
};
interface CreateDetailsResponseRaw {
    uuid: string;
    dateCreated: Date;
    displayName: string;
    location: string[];
}
export type CreateDetailsResponseOK =
    AmbrosiaResponseOK<CreateDetailsResponseRaw>;
export type CreateDetailsResponse = AmbrosiaResponse<CreateDetailsResponseOK>;
