import { Spinner } from '@/components/Spinner';

export default function Loading() {
  return (
    <div className="flex h-full relative top-[88px] z-10 justify-center max-w-[1080px] m-auto">
      <Spinner />
    </div>
  );
}