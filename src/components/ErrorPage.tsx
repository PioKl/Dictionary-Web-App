import "../style/ErrorPage.scss";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="errorPage">
      <span className="errorPage__emoji">😕</span>
      <h2 className="errorPage__heading">Wrong Page</h2>
      <Link to="/" className="errorPage__return">
        Go To Main Page
      </Link>
    </div>
  );
}
