"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
async function handler(medplum, event) {
    var _a, _b, _c, _d, _e;
    const patient = event.input;
    const firstName = (_c = (_b = (_a = patient.name) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.given) === null || _c === void 0 ? void 0 : _c[0];
    const lastName = (_e = (_d = patient.name) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.family;
    console.log(`Hello ${firstName} ${lastName}!`);
    return true;
}
exports.handler = handler;
//# sourceMappingURL=hello-patient.js.map