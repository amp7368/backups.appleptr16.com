import { useObservableMemo } from '@api/elemental';
import { LoginRequest, LoginResponse, SessionBase } from '@api/io-model';
import { Optional } from '@api/utilities';
import { createStore, setProp, withProps } from '@ngneat/elf';
import { useEffect, useState } from 'react';
import { map } from 'rxjs';

import { API } from '../../api/API';
import { persist } from '../Elf';

export type SelfUserState = {
    session: Optional<SessionBase>;
};
export const selfUserStore = createStore(
    { name: 'selfUser' },
    withProps<SelfUserState>({
        session: undefined,
    })
);
persist(selfUserStore);
export async function callLogin(login: LoginRequest): Promise<LoginResponse> {
    const response: LoginResponse = await API.login(login);
    if (response.isOk) {
        const session: SessionBase = response.session;
        session.expiration = new Date(session.expiration);
        selfUserStore.update(setProp('session', response.session));
    }
    return response;
}
export function getSessionToken(): Optional<string> {
    return selfUserStore.getValue().session?.sessionToken;
}
export function useIsLoggedIn(): Optional<boolean> {
    const session: null | Optional<SessionBase> = useObservableMemo(
        () => selfUserStore.pipe(map((state) => state.session)),
        [selfUserStore],
        null
    );
    const [s, refresh] = useState(null);
    useEffect(() => {
        if (!session) return;
        const expiration =
            new Date(session.expiration).getTime() - new Date().getTime();
        const timeout = setTimeout(() => refresh(null), expiration);
        return () => clearTimeout(timeout);
    });
    if (session === undefined) return false;
    if (session === null) return undefined;
    return new Date(session.expiration) > new Date();
}
