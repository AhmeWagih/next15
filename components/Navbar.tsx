import { auth, signIn, signOut } from '@/auth';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = async () => {
  const session = await auth();
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={100} height={100} />
        </Link>
        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>
              {/* <button onClick={signOut}>Sign out</button> */}
              <form
                action={async () => {
                  'use server';
                  await signOut({ redirectTo: '/' });
                }}
              >
                <button type="submit">
                  <span className="max-sm:hidden">Sign out</span>
                  
                </button>
              </form>
              <Link href={`/user/${session.user.id}`}>
                <span>{session.user.name}</span>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                'use server';
                await signIn('github');
              }}
            >
              <button type="submit">Sign in</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
