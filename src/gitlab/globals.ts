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

            untaggedMerges?: {
                id: string;
                short_id: string;
                created_at: string;
                parent_ids: [string, string];
                title: string;
                message: string;
                author_name: string;
                author_email: string;
                authored_date: string;
                committer_name: string;
                committer_email: string;
                committed_date: string;
            }[];

            project: string;
            projectId: string;

            internalUsername: string;
            MR_LIMITS: {
                warning: number;
                danger: number;
                blink: number;
            };
        };

        toggleUntaggedMerges: any;
        hidePrStuff: any;

        gl: any;
        gon: any;
    }
}
