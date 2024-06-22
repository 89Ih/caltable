import { Link } from "react-router-dom";
import "./NotFoundPage.css";

function NotFoundPage() {
  return (
    <div className="container">
    <div className="content">
        <h1>Page Not Found</h1>
        <p>This page doesn't seem to exist</p>
        <Link to={'/'}>HomePage</Link>
    </div>
</div>
  );
}

export default NotFoundPage;
