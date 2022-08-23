import { SessionBase } from '@api/io-model';
import { DateFactory } from '@api/utilities';
import { v4 } from 'uuid';

export class SessionStore {
    static EXPIRATION_MINS = 60;

    private sessions: Map<string, SessionBase> = new Map();
    private nextTrimTime: Date = new Date();

    verifyTrimmed() {
        if (this.nextTrimTime > new Date()) return;
        this.nextTrimTime = DateFactory.fromNowMinutes(1);
        this.sessions.forEach((session, key, map) => {
            if (new Date() > session.expiration) map.delete(key);
        });
    }
    newSession(): SessionBase {
        this.verifyTrimmed();
        const session: SessionBase = {
            sessionToken: v4(),
            expiration: DateFactory.fromNowMinutes(
                SessionStore.EXPIRATION_MINS
            ),
        };
        this.sessions.set(session.sessionToken, session);
        return session;
    }
    isSessionValid(sessionToken: string): boolean {
        this.verifyTrimmed();
        const session: SessionBase = this.sessions.get(sessionToken);
        if (!session) return false;
        return new Date() <= session.expiration;
    }
}

export const sessionStore = new SessionStore();
