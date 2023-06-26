import Keycloak from 'keycloak-js';
import { useEffect, useRef, useState } from 'react';
import { login, signup } from '../auth/AuthAPI';

const client = new Keycloak({
    url: 'http://localhost:8080/',
    realm: 'Atos-LMS',
    clientId: 'Atos-LMS'
});

export default function useAuth() {
    const isRun = useRef(false);
    const [isLogin, setLogin] = useState(false);
    const [keycloakLogout, setLogout] = useState(null);
    useEffect(() => {
        if (isRun.current)
            return;
        isRun.current = true;
        client.init({ onLoad: 'login-required', promiseType: 'native' }).then(async (res) => {
            setLogin(res);
            // setLogout(client.logout);

            let token = client.token;
            const username = client.tokenParsed.preferred_username;
            const userType = client.realmAccess.roles[0];

            if (localStorage.getItem('username') === null) {
                localStorage.clear();
                localStorage.setItem('access_token', token);
                try {
                    await signup(username, userType, '');
                } catch (error) {
                    console.log(error.message)
                }
                await login(username, '');
                setTimeout(() => {
                    localStorage.clear();
                }, 1000 * 60 * 60);
            }
        })
    }, []);

    return isLogin;
}