import { ConnectButton } from "web3uikit"

export default function Header() {
    return (
        <nav className="p-3 border-b-2 border-green-600 flex flex-row">
            <h1 className="py-4 px-3 font-bold text-4xl">Ricchezza</h1>
            prototype
            <div className="ml-auto py-2 px-4">
                <ConnectButton moralisAuth={false}/>
            </div>
        </nav>
    )
}