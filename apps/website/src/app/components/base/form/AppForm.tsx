import { Stack } from '@mui/material';
import { ReactNode } from 'react';
import { AppPaper } from '../AppPaper';

export interface AppFormProps {
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    children: ReactNode | ReactNode[];
}
export function AppForm(props: AppFormProps) {
    return (
        <AppPaper>
            <form onSubmit={props.onSubmit}>
                <Stack padding={4} spacing={3}>
                    {props.children}
                </Stack>
            </form>
        </AppPaper>
    );
}
