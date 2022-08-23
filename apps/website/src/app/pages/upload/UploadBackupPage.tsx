import { Input } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { API } from '../../api/API';

import { AppForm } from '../../components/base/form/AppForm';
import { AppInput } from '../../components/base/form/AppInput';
import { Page } from '../../components/common/Page';

interface UploadBackupProps {
    backup: FileList;
}
export function UploadBackupPage() {
    const { handleSubmit, register } = useForm<UploadBackupProps>();
    const onSubmit: SubmitHandler<UploadBackupProps> = (form) => {
        const file = form.backup.item(0);
        if (!file) {
            console.error('bad file');
            return;
        }
        API.backupUpload(file);
    };
    return (
        <Page title="Login">
            <AppForm onSubmit={handleSubmit(onSubmit)}>
                <AppInput type="file" {...register('backup')} />
                <AppInput type="submit" />
            </AppForm>
        </Page>
    );
}
