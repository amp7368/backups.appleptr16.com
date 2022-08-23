import { AppBar, Box, Button, Divider, Link, Stack } from '@mui/material';

import { urls } from '../../util/routes';
import { AppTypography } from '../base/AppTypography';
import { Logo } from './Logo';

interface AppLinkProps {
    route: string;
    title: string;
}
function AppLink(props: AppLinkProps) {
    const color =
        window.location.pathname === props.route
            ? 'secondary'
            : 'primary.contrastText';
    return (
        <Button variant="text" color="secondary" href={props.route}>
            <AppTypography color={color} variant="h4">
                {props.title}
            </AppTypography>
        </Button>
    );
}

export function AppHeader() {
    const appBarColor = '#333333';
    return (
        <Stack marginBottom={3}>
            <AppBar
                position="static"
                sx={{
                    height: '4rem',
                    bgcolor: appBarColor,
                    zIndex: (theme) => theme.zIndex.appBar,
                }}
            >
                <Stack direction="row">
                    <Logo />
                    <Stack
                        justifyContent="flex-start"
                        spacing={4}
                        alignItems="center"
                        direction="row"
                        divider={
                            <Divider
                                flexItem
                                orientation="vertical"
                                variant="fullWidth"
                            />
                        }
                    >
                        <AppLink route={urls.upload} title="Upload" />
                        <AppLink route={urls.view} title="Backups" />
                    </Stack>
                </Stack>
            </AppBar>
            <Box
                alignSelf="start"
                height="auto"
                width="auto"
                bgcolor={appBarColor}
                zIndex={(theme) => theme.zIndex.appBar - 1000}
                sx={{ transform: 'perspective(10px) rotateX(-1deg)' }}
                paddingLeft="2.5rem"
                paddingRight="2.5rem"
                paddingBottom={1}
                marginLeft="7.5rem"
            >
                <Link href={urls.login} color="secondary">
                    <AppTypography
                        fontWeight={500}
                        sx={{
                            transform: 'perspective(10px) rotateX(1deg)',
                        }}
                        color="text.primary"
                        variant="h3"
                        noWrap
                    >
                        Backup manager
                    </AppTypography>
                </Link>
            </Box>
        </Stack>
    );
}
