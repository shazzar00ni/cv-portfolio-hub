
import { ThemeToggle } from "./ThemeToggle";

const HeaderWithThemeToggle = () => {
  return (
    <header className="py-6 md:py-8 border-b border-muted">
      <div className="container-custom flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Shannon Lockett</h1>
          <p className="mt-1 text-muted-foreground">Web Developer & Designer</p>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default HeaderWithThemeToggle;
