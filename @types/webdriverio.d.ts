declare module "webdriverio" {
    interface Browser {
        open: (applicationName: string, path: string) => Promise<void>;
    }
}
