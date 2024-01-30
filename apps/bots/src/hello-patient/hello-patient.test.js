"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mock_1 = require("@medplum/mock");
const vitest_1 = require("vitest");
const hello_patient_1 = require("./hello-patient");
const medplum = new mock_1.MockClient();
(0, vitest_1.test)('Hello world', async () => {
    const input = 'Hello';
    const contentType = 'text/plain';
    const secrets = {};
    const result = await (0, hello_patient_1.handler)(medplum, { input, contentType, secrets });
    (0, vitest_1.expect)(result).toBe(true);
});
//# sourceMappingURL=hello-patient.test.js.map