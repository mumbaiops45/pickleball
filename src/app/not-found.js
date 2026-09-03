import Link from "next/link";
import BallArt from "@/components/art/BallArt";
import Logo from "@/components/ui/Logo";
import { ArrowIcon } from "@/components/ui/Icons";
import { Accent } from "@/components/ui/Heading";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-5 pb-24 pt-32 text-center sm:px-8 lg:py-32">
      <div className="w-24">
        <div className="float-slow">
          <BallArt id="404-ball" color="#fecd06" className="w-full" />
        </div>
      </div>
      <Logo size="md" className="mt-10 justify-center" />
      <p className="mt-6 font-mono text-sm tracking-[0.2em] text-volt-deep">404</p>
      <h1 className="mt-4 text-[clamp(2rem,5vw,3rem)] font-semibold tracking-[-0.035em]">
        That one went <Accent>long</Accent>.
      </h1>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-mist">
        The page you were looking for is not here. The rest of the shop is
        still on court.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/shop"
          className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-volt px-8 text-sm font-semibold text-ink"
        >
          Go to shop
          <ArrowIcon className="size-4" />
        </Link>
        <Link
          href="/"
          className="inline-flex h-14 items-center justify-center rounded-full border border-line-strong px-8 text-sm font-medium text-ink transition-colors hover:border-volt-deep hover:text-volt-deep"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
