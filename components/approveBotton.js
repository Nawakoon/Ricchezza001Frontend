import { linkABI, contractAddresses } from "../constants"
// dont export from moralis when using react
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { useNotification } from "web3uikit"
import { ethers } from "ethers"

export default function ApproveLink() {
    const { Moralis, isWeb3Enabled, chainId: chainIdHex, account } = useMoralis()
    // These get re-rendered every time due to our connect button!
    const chainId = parseInt(chainIdHex)
    // console.log(`ChainId is ${chainId}`)
    const linkAddress = "0x01BE23585060835E02B77ef475b0Cc51aA1e0709"
    const ricchezzaAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

    const dispatch = useNotification()

    const {
        runContractFunction: approve,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: linkABI,
        contractAddress: linkAddress,
        functionName: "approve",
        params: {
            _spender: ricchezzaAddress,
            _value: "5000000000000000000" // 5 LINK
        },
    })

    /* View Functions */

    async function updateUIValues() {
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUIValues()
        }
    }, [isWeb3Enabled])

    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Transaction Notification",
            position: "topR",
            icon: "bell",
        })
    }

    // Probably could add some error handling
    const handleSuccess = async (tx) => {
        await tx.wait(1)
        updateUIValues()
        handleNewNotification(tx)
    }

    return (
        <div className="p-5">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                onClick={async () =>
                    await approve({
                        // onComplete:
                        // onError:
                        onSuccess: handleSuccess,
                        onError: (error) => console.log(error),
                    })
                }
                disabled={isLoading || isFetching}
            >
                {isLoading || isFetching ? (
                    <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                ) : (
                    "Approve"
                )}
            </button>
        </div>
    )
}