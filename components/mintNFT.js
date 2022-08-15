import { contractAddresses, abi } from "../constants"
import BurnNFT from "../components/burnNFT";
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { useNotification } from "web3uikit"
import { ethers } from "ethers"

export default function MintNFT() {
    const { Moralis, isWeb3Enabled, chainId: chainIdHex, account } = useMoralis()
    // These get re-rendered every time due to our connect button!
    const chainId = parseInt(chainIdHex)
    console.log(chainId)
    const ricchezzaAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

    const [nftBalanceOf, setNftBalanceOf] = useState("0")

    const dispatch = useNotification()

    const {
        runContractFunction: mintThisNFT,
        data: mintTxResponse,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: ricchezzaAddress,
        functionName: "mintThisNFT",
        params: {account},
    })

    const { runContractFunction: balanceOf } = useWeb3Contract({
        abi: abi,
        contractAddress: ricchezzaAddress, // specify the networkId
        functionName: "balanceOf",
        params: {account},
    })

    async function updateUIValues() {
        const balanceOfFromCall = (await balanceOf()).toString()
        setNftBalanceOf(balanceOfFromCalll)
    }

    return (
            <div className="p-10">
                <div className="font-bold py-2">RicchezzaSword001</div>
                <button
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-5 rounded ml-auto"
                        onClick={console.log("helloWorld4")}>
                            Mint
                </button> <BurnNFT />
            </div>
    )
}