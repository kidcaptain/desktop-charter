
"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { signOut, useSession } from "next-auth/react";

const UserLogout = () => {
    const { data: session, status } = useSession()

        const updateUser = async () => {
            const get = await fetch("/api/utilisateurs/" + session?.user?.email, {
                method: 'GET',
                cache: "no-store",
            })
            if (!get.ok) {
                console.log("error")
            } else {
                const user = await get.json()
                const datas = {
                    nomUtilisateur: user.nomUtilisateur,
                    dateCreationCompte: `${user.dateCreationCompte}`,
                    dateDerniereConnexion: `${user.dateDerniereConnexion}`,
                    blocke: user.blocke,
                    numCNI: user.numCNI,
                    isConnected: "no",
                    droitsAccesId: parseInt(user.droitsAccesId),
                    employeId: user.employeId,
                    motDePasse: user.motDePasse
                }
                const res = await fetch("/api/utilisateurs?id=" + user.id, {
                    method: 'PUT',
                    cache: "no-store",
                    body: JSON.stringify(datas),
                })
                if (!res.ok) {
                    console.log("error")
                } else{
                    const f = await res.json()
                    const signInData = await signOut({
                        redirect: true,
                        callbackUrl: `${window.location.origin}/signin`,
                    });
                }
            }

        }
       
    return (
        <button onClick={updateUser} className="text-white  bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300  rounded-sm text-sm p-2 px-5 text-center">
        Se Déconnecte
    </button>
    )
}

export default UserLogout