import { Link } from 'react-router-dom'
import { PLAY_PROJECTS } from '../data'
import '../Wireframe.css'

function PlayCardMedia({ project }) {
  if (project.video) {
    return (
      <video
        src={project.video}
        poster={project.image}
        aria-label={project.alt}
        autoPlay
        muted
        loop
        playsInline
      />
    )
  }
  return <img src={project.image} alt={project.alt} />
}

function PlayCardBody({ project }) {
  return (
    <>
      <div className="wireframe__media wireframe__media--play">
        <PlayCardMedia project={project} />
      </div>
      <div className="wireframe__project-info wireframe__project-info--play">
        <div className="wireframe__project-title-block">
          <h2 className="text-h1">{project.title}</h2>
          <p className="text-body">{project.year}</p>
        </div>
        <p className="wireframe__project-desc wireframe__project-desc--play text-body">
          {project.description}
        </p>
      </div>
    </>
  )
}

export default function PlayPage() {
  return (
    <div id="play" className="wireframe__play">
      {PLAY_PROJECTS.map((project) => {
        const className = `wireframe__project wireframe__project--play wireframe__project--${project.id}`

        if (project.href) {
          return (
            <a
              key={project.id}
              id={project.id}
              className={className}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <PlayCardBody project={project} />
            </a>
          )
        }

        return (
          <Link
            key={project.id}
            id={project.id}
            className={className}
            to={project.path}
          >
            <PlayCardBody project={project} />
          </Link>
        )
      })}
    </div>
  )
}
