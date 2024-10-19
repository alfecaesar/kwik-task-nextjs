import { TbFaceIdError } from "react-icons/tb";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export function ErrorHoverCard({ message }: { message: string | undefined }) {
  return (
      <div className="text-read-500 flex items-center gap-1">
        <div className="absolute right-2 top-8">
          <HoverCard>
            <HoverCardTrigger className="cursor-pointer">
              <TbFaceIdError style={{ color: "red", opacity: 0.8 }} />
            </HoverCardTrigger>
            <HoverCardContent className="w-auto p-2 px-3">
              <p className="text-[13px] mt-[4px] text-red-500">{message}</p>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
  );
}
