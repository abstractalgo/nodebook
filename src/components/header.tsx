import { FC } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "src/common/constants";

export const Header: FC = () => {
  return (
    <div className="flex items-center justify-between px-3 py-1">
      <div>consciousness</div>
      <div className="flex gap-2 items-center">
        <Link to={ROUTES.index}>Home</Link>
        <Link to={ROUTES.about}>About</Link>
        <Link to={ROUTES.github} target="_blank">
          Github
        </Link>
      </div>
    </div>
  );
};
