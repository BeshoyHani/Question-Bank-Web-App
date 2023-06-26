import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    "realm": "Atos-LMS",
    "url": "http://localhost:8080/",
    "ssl-required": "external",
    "resource": "Atos-LMS",
    "clientId": "Atos-LMS",
    "verify-token-audience": true,
    "public-client": true,
    "credentials": {
        "secret": "ce8UtN5OyXcCdhfdfa4yp04c9T9QRdd7"
    },
    "confidential-port": 0,
    "policy-enforcer": {
        "credentials": {}
    }
});

export default keycloak;