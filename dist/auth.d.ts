import { Config } from './core/config';
import Rapid from './core/rapid';
declare class Auth extends Rapid {
    constructor(config: Config);
    login(credentials?: {}): string | Promise<{}>;
    logout(): string | Promise<{}>;
    check(): string | Promise<{}>;
    register(credentials?: {}): string | Promise<{}>;
    readonly modelPrefix: string;
}
export default Auth;
