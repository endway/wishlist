import {Role, useSession} from "./SessionHook";

export enum Action {
    mark = "mark",
    hide = "hide",
    create = "create",
}

interface CanFn {
    (action: Action): boolean;
}

export const useACL = (): { can: CanFn } => {
    const { role } = useSession();

    return {
        can(action: Action): boolean {
            switch (action) {
                case Action.hide:
                case Action.create:
                    return [Role.admin, Role.owner].includes(role);

                case Action.mark:
                    return true;
            }
        },
    }
};