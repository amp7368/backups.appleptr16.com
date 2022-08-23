import { Button, ButtonProps } from '@mui/material';

import { AppTypography } from '../AppTypography';

export type AppButtonProps = ButtonProps;
export function AppButton({ children, ...props }: AppButtonProps) {
    return (
        <Button {...props}>
            <AppTypography variant="h6">{children}</AppTypography>
        </Button>
    );
}
