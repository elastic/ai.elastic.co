import Link from "next/link";

export default function Layout({ href, children }) {
  return (
    <Link className="text-sky-400" href={href}>
      {children}
    </Link>
  );
}
