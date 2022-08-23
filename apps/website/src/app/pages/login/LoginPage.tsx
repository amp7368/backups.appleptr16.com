import { LoginRequest } from '@api/io-model';
import { Stack } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AppButton } from '../../components/base/form/AppButton';

import { AppForm } from '../../components/base/form/AppForm';
import { AppInput } from '../../components/base/form/AppInput';
import { Page } from '../../components/common/Page';
import {
    callLogin,
    useIsLoggedIn,
} from '../../elf/self-user/SelfUser.repository';
import { navTo, urls } from '../../util/routes';

export function LoginPage() {
    const { setValue, handleSubmit, register } = useForm<LoginRequest>();
    const onSubmit: SubmitHandler<LoginRequest> = (state) => {
        callLogin(state);
    };
    const onFill: () => void = () => {
        setValue('username', 'appleptr16');
        setValue('password', 'appleptr16');
    };
    const isLoggedIn = useIsLoggedIn();
    if (isLoggedIn === undefined) return <>Loading</>;
    if (isLoggedIn) navTo(urls.view);
    return (
        <Page title="Login">
            <AppForm onSubmit={handleSubmit(onSubmit)}>
                <AppInput label="Username" {...register('username')} />
                <AppInput label="Password" {...register('password')} />
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <AppInput type="submit">Submit</AppInput>
                    <AppButton variant="contained" onClick={onFill}>
                        Fill
                    </AppButton>
                </Stack>
            </AppForm>
        </Page>
    );
}
