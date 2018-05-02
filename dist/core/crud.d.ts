import Request from './request';
declare class Crud extends Request {
    find(id: number | string): string | Promise<{}>;
    updateOrDestroy(method: string, ...params: any[]): string | Promise<{}>;
    update(...params: any[]): string | Promise<{}>;
    save(...params: any[]): string | Promise<{}>;
    destroy(...params: any[]): string | Promise<{}>;
    restore(id: any): string | Promise<{}>;
    create(data: any): string | Promise<{}>;
    id(id: any): this;
    all(): string | Promise<{}>;
    findBy(key: any, value: any): string | Promise<{}>;
}
export default Crud;
