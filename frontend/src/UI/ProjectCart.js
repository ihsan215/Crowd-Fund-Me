import { Link } from "react-router-dom";
import "./ProjectCart.css";

const MaxDescriptionLengt = 120;

function ProjectCart({ className, title, description, url }) {
  return (
    <div class={`project-card-area ${className}`}>
      <div class="project-card-item">
        <div class="img-area">
          <img src={url} class="project-img" />
        </div>
        <div class="card-body">
          <h5 class="text-center">{title}</h5>
          <p class="project-description">
            {description.length > MaxDescriptionLengt
              ? `${description.slice(0, MaxDescriptionLengt) + "..."}`
              : description}
          </p>
          <Link className="project-read-more">Read More</Link>
        </div>
      </div>
    </div>
  );
}

export default ProjectCart;
