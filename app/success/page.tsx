import { SuccessSVG } from "@/components/SuccessSVG";
import Link from "next/link";

export default function Success() {
  return (
    <div className="flex h-full relative top-[88px] z-10 justify-center max-w-[1080px] m-auto">
      <div className="w-full max-w-[1080px] mx-auto px-4 pb-4">
        <div className="flex flex-col items-center justify-center gap-6 p-16 w-full bg-white rounded-[4px]">
          <h1 className="font-bold text-xl text-background">
            Compra realizada com sucesso!
          </h1>

          <div className="flex flex-col items-center justify-center w-[447px]">
            <SuccessSVG />
          </div>

          <Link href="/" className="w-full sm:w-[317px]">
            <button
              className="flex items-center justify-center rounded p-1 gap-3 h-10 w-full sm:w-[317px] text-white bg-primary hover:bg-secondary transition-colors"
            >
              Voltar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
