import { CartContent } from "@/components/CartContent";
import { EmptyView } from "@/components/EmptyView";

export default function Cart() {

  return (
    <div className="flex h-full relative top-[88px] z-10 justify-center max-w-[1080px] m-auto">
      <EmptyView />

      <CartContent />
    </div>
  );
}
