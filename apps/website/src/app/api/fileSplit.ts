import { v4 } from 'uuid';
import sha256ify from 'sha256';
// break it into 90mb chunks
const maxChunkSize = 90000000;
export interface BackupPart {
    uuid: string;
    sha256: string;
    data: Blob;
}
export async function fileSplit(file: File): Promise<BackupPart[]> {
    const chunksCount = Math.ceil(file.size / maxChunkSize);
    const chunks: BackupPart[] = [];
    for (let i = 0; i < chunksCount; i++) {
        const start = i * maxChunkSize;
        const end = Math.min(start + maxChunkSize, file.size);
        const data = file.slice(start, end);
        const uuid = v4();
        const sha256 = sha256ify(await data.text());
        chunks.push({ data, sha256, uuid });
    }

    return chunks;
}
