import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/login/LoginPage';
import { UploadBackupPage } from './pages/upload/UploadBackupPage';
import { ViewBackupsPage } from './pages/view/ViewBackupsPage';

import { urls } from './util/routes';

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={urls.login} element={<LoginPage />} />
                <Route path={urls.view} element={<ViewBackupsPage />} />
                <Route path={urls.upload} element={<UploadBackupPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
