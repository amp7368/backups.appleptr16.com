import { createReadStream, read, ReadStream } from 'fs';
import { createBackupDetails } from './createBackupDetails';

export interface UploadBackupProps {
    filePath: string;
    remoteLocation: string[];
    remoteDisplayName: string;
}
export async function uploadBackup(props: UploadBackupProps) {
    const callInitialBackup = createBackupDetails({
        displayName: props.remoteDisplayName,
        location: props.remoteLocation,
    });
    console.log(await callInitialBackup);
    const readStream: ReadStream = createReadStream(props.filePath);
}
