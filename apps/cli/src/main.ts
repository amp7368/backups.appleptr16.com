import { createReadStream, readFile } from 'fs';
import minimist from 'minimist';
import { uploadBackup } from './app/uploadBackup';
// const args: minimist.ParsedArgs = minimist(process.argv.slice(2));
uploadBackup({
    filePath: '',
    remoteDisplayName: 'HelloWorld',
    remoteLocation: ['appleptr16', 'test'],
});
