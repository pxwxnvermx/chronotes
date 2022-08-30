import { FiHeart } from "react-icons/fi";

export function Footer() {
  return (
    <footer>
      <nav className="mt-6 mb-3 text-center">
        <h3 className="inline-block text-sm">Made with</h3>
        <FiHeart className="inline-block ml-1 text-xl text-red-600 fill-red-600 animate-pulse" />
        <h3>Chronotes</h3>
      </nav>
    </footer>
  );
}
