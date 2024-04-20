import {Header} from "./Header.tsx";
import {Wallet} from "./dashboard/Wallet.tsx";

export function DashBoard(){
    return (
        <div>
            <Header/>
            <Wallet/>
        </div>
    );
}