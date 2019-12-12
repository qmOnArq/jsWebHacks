export {};
declare global {
    interface Window {
        monar_SETTINGS: {
            hideWip: boolean;
        };

        monar_GLOBALS: {
            id: string;
            username: string;
            name: string;
            avatar: string;
            defaultAvatar: string;

            untaggedMerges: any[];

            project: string;
            projectId: string;

            internalUsername: string;
            MR_LIMITS: {
                warning: number;
                danger: number;
                blink: number;
            };
        };

        gl: any;
        gon: any;
    }
}
