import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/" className="btn-ghost btn text-xl normal-case">
          MdB
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link href="/">List</Link>
          </li>
          {session && (
            <li>
              <Link href="/movies/add">Add</Link>
            </li>
          )}
          <li>
            <button
              className=" "
              onClick={session ? () => signOut() : () => signIn()}
            >
              {session ? `Sign out, ${session?.user?.name}` : "Sign in"}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
