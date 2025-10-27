import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-background-primary border-t border-background-elevated ">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-y-4 px-6 py-6 text-center md:text-left">
        <Typography
          color="blue-gray"
          className="text-text-secondary text-sm md:text-base"
        >
          © {new Date().getFullYear()}{" "}
          <span className="text-accent-primary font-semibold">Moviq</span>. All
          rights reserved.
        </Typography>

        <ul className="flex flex-wrap items-center justify-center gap-x-6 text-sm text-text-secondary">
          <li>
            <Typography
              as={Link}
              to=""
              className="transition-colors hover:text-accent-primary"
            >
              Home
            </Typography>
          </li>
          <li>
            <Typography
              as={Link}
              to="/movies"
              className="transition-colors hover:text-accent-primary"
            >
              Movies
            </Typography>
          </li>
          <li>
            <Typography
              as={Link}
              to="/series"
              className="transition-colors hover:text-accent-primary"
            >
              Series
            </Typography>
          </li>
        </ul>
      </div>

      <div className="border-t border-background-elevated py-4 text-center text-sm text-text-secondary">
        Done by{" "}
        <span className="text-accent-primary font-semibold">
          <Link to="https://github.com/BelalWaheed" target="_blank">
            Belal <i className="fa-brands fa-github"></i>
          </Link>
        </span>
        <span className="mx-1">and </span>
        <span className="text-accent-primary font-semibold">
          <Link to="https://github.com/7aider1" target="_blank">
            Omar
            <i className="fa-brands fa-github"></i>
          </Link>
        </span>
      </div>
    </footer>
  );
}
