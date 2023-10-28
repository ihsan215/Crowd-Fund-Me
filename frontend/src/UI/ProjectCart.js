import { Link } from "react-router-dom";
import "./ProjectCart.css";

const MaxDescriptionLengt = 120;

function ProjectCart({ className, title, author, description, url }) {
  return (
    <div class={`project-card-area ${className}`}>
      <div class="project-card-item">
        <div class="img-area">
          <img src={url} class="project-img" />
        </div>
        <div class="project-card-body">
          <h5 class="text-center">{title}</h5>
          <h5 class="project-author">
            {" "}
            <Link className="project-author">by {author}</Link>
          </h5>

          <p class="project-description">
            {description.length > MaxDescriptionLengt
              ? `${description.slice(0, MaxDescriptionLengt) + "..."}`
              : description}
          </p>
          <div className="project-link-area">
            <Link className="project-read-more">Go To Project</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCart;