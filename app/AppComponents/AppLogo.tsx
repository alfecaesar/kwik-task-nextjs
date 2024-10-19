import { GiQuickMan } from "react-icons/gi";

export default function AppLogo(){
    return(
        <div className="flex gap-2 items-center mb-8 justify-center">
            <div className="bg-primary p-2 text-white rounded-sm text-lg">
                <GiQuickMan />
            </div>
            <div className="text-2xl font-bold">
                <span>Kwik </span>
                <span className="text-primary">Task</span>
            </div>
        </div>
    );
}