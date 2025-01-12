import Image from 'next/image';

const Logo = () => {
  return (
    <div className="flex gap-4 items-center">
      <Image width={30} height={30} alt="" src="/images/paris-p2p-logo.svg" />
      <h1 className="font-bold text-lg">Paris P2P</h1>
    </div>
  );
};

export { Logo };
