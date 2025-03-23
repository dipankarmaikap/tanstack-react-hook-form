import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <header className="flex flex-wrap gap-4 justify-between items-center p-4 border-b">
      <Link to="/">
        <p className="font-bold text-3xl">Tanstack & react-hook-form</p>
      </Link>
      <nav className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
      </nav>
    </header>
  );
}
