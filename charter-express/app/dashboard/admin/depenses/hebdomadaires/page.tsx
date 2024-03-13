"use client"
import PrintComponent from "@/components/ui/myPrintComponent";
import { useEffect, useState } from "react";
import svg from "@/public/images/loader.svg";
import Image from "next/image";
export default function Page() {
    const [agences, setAgences] = useState<any[]>([])
    const [agence, setAgence] = useState<any>()
    const [agenceNom, setAgenceNom] = useState<any>()
    const [depenses, setDepenses] = useState<any[]>([])
    const [recettes, setRecettes] = useState<any[]>([])
    const [date, setDate] = useState<string>("");

    const getDepenseByDate = async (date: string, id: number) => {
        const res = await fetch(`/api/depenses?date=${date}&agenceId=${id}`, { cache: "no-store" })
        if (!res.ok) {
            console.log("error")
        }
        const data = await res.json();
        return data
    };
    const getAgenceById = async (id: number) => {
        const res = await fetch(`/api/agences/${id}`, { cache: "no-store" })
        if (!res.ok) {
            console.log("error")
        }
        const data = await res.json();

        return data
    };
    const getRecetteByDate = async (date: string) => {
        const res = await fetch(`/api/lignerecette?date=${date}T00:00:00.000Z`, { cache: "no-store" })
        if (!res.ok) {
            console.log("error")
        }
        const data = await res.json();
        return data
    };

    const getDepense = async (str: string) => {
        const date = new Date(str);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let day2 = date.getDate();
        let tab: any[] = []
        const t = 7 - date.getDay();
        let d = date.getDay() - 1;
        if (d == -1) {
            d = 6
        };
        for (let index = 0; index < d; index++) {
            if ((day - 1) <= 0) {
                month = month - 1
                if (month % 2 == 0) {
                    if (month == 2) {
                        if (year == 2024 || year == 2028 || year == 2032 || year == 2036 || year == 2040) {
                            day = 29;
                        } else {
                            day = 28;
                        }
                    } else {
                        day = 30;
                    }
                } else {
                    day = 31;
                }
            } else {
                day = day - 1;
            }
            const daym = (day) < 10 ? `0${day}` : `${day}`;
            const monthm = (month) < 10 ? `0${month}` : `${month}`;
            tab.push(`${year}-${monthm}-${daym}`)
        }

        tab = tab.reverse();
        day = date.getDate();
        month = date.getMonth() + 1;
        const daym2 = (day) < 10 ? `0${day}` : `${day}`;
        const monthm2 = (month) < 10 ? `0${month}` : `${month}`;
        tab.push(`${year}-${monthm2}-${daym2}`)
        if (d != 6) {
            for (let index = 0; index < t; index++) {
                if (month % 2 == 0) {
                    if (month == 2) {
                        if (year == 2024 || year == 2028 || year == 2032 || year == 2036 || year == 2040) {
                            if (day == 29) {
                                month = month + 1;
                                day = 1;
                            } else {
                                day = day + 1;
                            }
                        } else {
                            if (day == 28) {
                                month = month + 1;
                                day = 1;
                            } else {
                                day = day + 1;
                            }
                        }
                    } else {
                        if (day == 30) {
                            month = month + 1;
                            day = 1;
                            if (month == 13) {
                                month = 1
                            }
                        } else {
                            day = day + 1;
                        }
                    }
                } else {
                    if (day == 31) {
                        month = month + 1;
                        day = 1;
                        if (month == 13) {
                            month = 1
                        }
                    } else {
                        day = day + 1;
                    }
                }


                const daym = (day) < 10 ? `0${day}` : `${day}`;
                const monthm = (month) < 10 ? `0${month}` : `${month}`;
                tab.push(`${year}-${monthm}-${daym}`)
            }
        }
        const tab2: any[] = []
        const tab3: any[] = []
        for (let i = 0; i < tab.length; i++) {
            const element = tab[i];
            let somme = 0;
            let sommeRec = 0;
            const de: any[] = await getDepenseByDate(element, agence);
            const re: any[] = await getRecetteByDate(element);
            
            const g = await getAgenceById(agence);
            setAgenceNom(g)
            if (de.length > 0) {
                de.map((j) => {
                    somme = somme + parseInt(j.montant);
                })
            }
            console.log(re)
            if (re.length > 0) {
                re.map((j) => {
                    if (agence == j.agenceId) {
                        sommeRec = sommeRec + parseInt(j.montant);
                       
                    }
                })
            }
            

            const k = new Date(element).getDay();
            switch (k) {
                case 0:
                    tab2.push({ label: "Dimanche", montant: somme, date: element })
                    tab3.push({ label: "Dimanche", montant: sommeRec, date: element })
                    break;
                case 1:
                    tab2.push({ label: "Lundi", montant: somme, date: element })
                    tab3.push({ label: "Lundi", montant: sommeRec, date: element })
                    break;
                case 2:
                    tab2.push({ label: "Mardi", montant: somme, date: element })
                    tab3.push({ label: "Mardi", montant: sommeRec, date: element })
                    break;
                case 3:
                    tab2.push({ label: "Mercredi", montant: somme, date: element })
                    tab3.push({ label: "Mercredi", montant: sommeRec, date: element })
                    break;
                case 4:
                    tab2.push({ label: "Jeudi", montant: somme, date: element })
                    tab3.push({ label: "Jeudi", montant: sommeRec, date: element })
                    break;
                case 5:
                    tab2.push({ label: "Vendredi", montant: somme, date: element })
                    tab3.push({ label: "Vendredi", montant: sommeRec, date: element })
                    break;
                case 6:
                    tab2.push({ label: "Samedi", montant: somme, date: element })
                    tab3.push({ label: "Samedi", montant: sommeRec, date: element })
                    break;
                default:
                    break;
            }
        }
        setDepenses(tab2)
        setRecettes(tab3)
    };
    useEffect(() => {
        const getAgences = async () => {
            const res = await fetch("/api/agences/", { cache: "no-store" })
            if (!res.ok) {
                console.log("error")
            }
            const data = await res.json();
            setAgences(data)
        };
        getAgences()
    }, [])

    return (
        <div className="p-10 ">
            <div className="bg-white shadow-2xl rounded-md">
                <h2 className="p-4  uppercase border-b">
                    Fiche hebdomadaires des depenses
                </h2>
                {
                agences.length > 0 ? (
                    <div className="p-4">
                        <div>
                            <label htmlFor="" className="text-sm font-bold text-gray-900 mr-2">Date</label>
                            <input type="date" name="" onChange={e => { setDate(e.target.value) }} className="inline-block p-2 text-xs text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " id="" />
                            <label className="ml-4 mr-2 text-sm font-bold text-gray-900" htmlFor="">Agence</label>
                            <select name="" id="" className="border p-1.5 uppercase" onChange={e => setAgence(e.target.value)}>
                                <option value="" ></option>
                                {agences.map((item: any, index: number) => (
                                    <option value={item.id} key={index}>{item.nom}</option>
                                ))}
                            </select>
                            <button type="button" onClick={() => getDepense(date)} className=" hover:bg-green-600 inline-block text-xs border p-2 rounded-sm text-white bg-green-500">Génerer</button>
                        </div>
                    </div>
                ) : (<Image src={svg} className='animate-spin mx-auto' width={25} height={25} alt='Loader image' />)
            }
            </div>
          

            <PrintComponent item={{ depenses: depenses, recettes: recettes, agence: agenceNom }} />


        </div>
    )
}