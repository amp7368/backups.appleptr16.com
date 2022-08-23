import { Container, Stack } from '@mui/material';
import { ReactNode } from 'react';

import { AppTypography } from '../base/AppTypography';

export interface PageProps {
    title: string;
    filter?: ReactNode;
    children: ReactNode;
}
export function Page(props: PageProps) {
    return (
        <Stack
            direction="column"
            alignItems="center"
            justifyContent="start"
            spacing={5}
        >
            <Container>
                <Stack direction="row" justifyContent="space-around">
                    <AppTypography
                        variant="h2"
                        fontWeight={500}
                        textTransform="capitalize"
                    >
                        {props.title}
                    </AppTypography>
                    {props.filter}
                </Stack>
            </Container>
            {props.children}
        </Stack>
    );
}
