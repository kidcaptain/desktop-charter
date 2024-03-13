"use client";

import { SessionProvider, signOut } from "next-auth/react";
import UserLogout from "./userLogout";

const UserAccountNav = () => {


    return (<SessionProvider><UserLogout /></SessionProvider>
    )
};

export default UserAccountNav;