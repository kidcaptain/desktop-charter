"use client"
import Image from "next/image";
import React, { useRef, useState } from "react";
import ReactToPrint from "react-to-print";

export default function FicheRecette(props: { item: DataFicheRecette }) {
    let componentRef: any = useRef();

    return (
        <>
            <div>
                {/* button to trigger printing of target component */}
                <ReactToPrint
                    trigger={() => <button className="p-2 bg-blue-500 text-white">Imprimer</button>}
                    content={() => componentRef}
                />

                {/* component to be printed */}
                <ComponentToPrint simple={props.item.simple} totalDepense={props.item.totalDepense} total={props.item.total}  date={props.item.date} ref={(el) => (componentRef = el)} />
            </div>
        </>
    );
}

export interface DataFicheRecette {
    simple: any[],
    date: string,
    total: number,
    totalDepense: number
}

class ComponentToPrint extends React.Component<DataFicheRecette> {

    render() {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
        const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
        const hours = (date.getHours()) < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
        const minutes = (date.getMinutes()) < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
        



        return (
            <div className="p-4 w-full h-full min-h-full" id="fichier">
                <div className="max-w-5xl  font-serif m-auto p-4 bg-white h-full w-full" id="document">
                    <div className="text-center font-medium my-8">
                        <Image src={"/images/logo.jpeg"} width={85} height={85} alt="" className="m-auto" />
                        <h2 className=" text-4xl">CHARTER EXPRESS VOYAGES</h2>
                        <h3>ENTREPRISE DE TRANSPORT INTER-URBAIN</h3>
                        <h3>BP: 5029 YAOUNDE-TEL: 699 91 76 12</h3>
                        <h3>N° contribuable: M09020001474P - RCCM N° 202 U 04 du 15/10/2002</h3>
                        <h3>site web: www.charter-voyage.com - Email: directiongeneral@charter.com</h3>
                    </div>


                    <hr className="border-2 border-black" />
                    <div className="text-xl p-4 text-right">
                        Yaoundé, le <span > {`${year}-${month}-${day}`} </span>
                    </div>
                    <h2 className="underline text-2xl text-center font-bold">FICHE DES RECETTES JOURNALIERES</h2>
                    <div className="p-4">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-800 ">
                            <thead className="text-sm text-center text-gray-900 border ">
                                <tr>
                                    <th scope="col" className=" py-4 px-2 border border-stone-800 ">
                                        N°BUS
                                    </th>
                                    <th scope="col" className=" py-4 px-2 border border-stone-800">
                                        ALLER
                                    </th>
                                    <th scope="col" className=" py-4 px-2 border border-stone-800 ">
                                        MONTANTS
                                    </th>
                                    <th scope="col" className=" py-4 px-2 border border-stone-800">
                                        NOMS CHAUFFEURS
                                    </th>
                                    <th scope="col" className=" py-4 px-2 border border-stone-800">
                                        SIGNATURE
                                    </th>

                                </tr>
                            </thead>
                            <tbody className="text-center">

                                {this.props.simple.map((item: any, i: number) => (
                                    <tr key={i + 1} className="font-normal" >
                                        <th className="px-3 py-4 border border-stone-800">
                                            ({item.bus.id}) {item.bus.marque} {item.bus.modele}
                                        </th>
                                        <th className=" border border-stone-800">
                                            {item.voyage.typeVoyage}
                                        </th>
                                        <th className=" border border-stone-800">
                                            {item.ligne.montant}
                                        </th>
                                        <th className=" border border-stone-800">
                                            {item.chauffeur}
                                        </th>
                                        <th className=" border border-stone-800">
                                            <select name=""  id={`retenue${i+1}`}>
                                                <option value=""></option>
                                                <option value={item.ligne.montant}>Retenue</option>
                                            </select>
                                        </th>

                                    </tr>
                                ))}
                              

                            </tbody>
                        </table>
                        <div className="mt-5 flex justify-between ">
                            <div>
                                <div className="flex items-center gap-4">
                                    <span className="font-bold">1eme avance: </span>
                                    <div className="">
                                        <input type="text" className="bg-gray-50 text-right p-1" /> Fcfa
                                    </div>
                                </div>
                                <div className="flex my-4 items-center gap-4">
                                    <span className="font-bold">2eme avance: </span>
                                    <div className="">
                                    <input type="text"  className="bg-gray-50 text-right p-1" />Fcfa
                                    </div>
                                </div>
                                <div className="flex my-4 items-center justify-between gap-4">
                                    <span className="font-bold">3eme avance: </span>
                                    <div className="">
                                    <input type="text"  className="bg-gray-50 text-right p-1" />Fcfa
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="font-bold underline">Caissière :</span>
                                    
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between gap-4">
                                    <span className="font-bold">Total: </span>
                                    <div className="">
                                        {this.props.total} Fcfa
                                    </div>
                                </div>

                                <div className="flex items-center justify-between gap-4">
                                    <span className="font-bold">Dépenses: </span>
                                    <div className="">
                                    {this.props.totalDepense} Fcfa
                                    </div>
                                </div>
                                <div className="flex mt-4 justify-between border-2 w-64 px-4 py-4 border-black  items-center gap-4">
                                    <span className="font-bold">SOLDE: </span>
                                    <div className="">
                                    {this.props.total - this.props.totalDepense} Fcfa
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}