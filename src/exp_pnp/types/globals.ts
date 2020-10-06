export {};
declare global {
    interface Window {
        globalFrontendConfig?: {
            app_frontend_version: string;
        };

        globalCompanies?: {
            slug: string;
            company_name: string;
            _id: string;
        }[];
    }
}
