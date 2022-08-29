import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";

const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header>
      <nav className="mt-4 mb-6">
        <div className="flex flex-row w-full">
          <div className="flex-grow">
            <h1 className="text-xl">
              ⏳ CHRO<i>Notes</i>
            </h1>
          </div>
          <div className="flex justify-end">
            <button
              className="p-2 text-xl border-0 rounded-full text-gray-50 bg-gray-900 dark:bg-gray-50 dark:text-gray-900 hover:bg-slate-600 dark:hover:bg-slate-400"
              onClick={(e) => {
                setTheme(theme === "light" ? "dark" : "light");
              }}
            >
              <div className="transition duration-300 ease-in-out">
                {theme === "light" ? <FiMoon /> : <FiSun />}
              </div>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
