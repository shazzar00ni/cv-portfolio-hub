
import { ThemeToggle } from "./ThemeToggle";

const HeaderWithThemeToggle = () => {
  return (
    <header className="py-6 md:py-8 border-b border-muted">
      <div className="container-custom flex items-center justify-between">
        <div>
          <h1 className="text-4xl uppercase leading-tight">
            SHANNON
            <br />
            <span className="font-bold">LOCKETT</span>
          </h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default HeaderWithThemeToggle;
