import { Link } from 'react-router-dom'
import locationIcon from '../assets/icons/location.svg'
import bookIcon from '../assets/icons/book.svg'
import { PROJECTS } from '../data'
import '../Wireframe.css'

export default function HomePage() {
  return (
    <>
      <section className="wireframe__intro" data-reveal>
        <h1 className="wireframe__headline text-h1">
          I design and engineer delightful
          <br />
          physical × digital interactions.
        </h1>
        <div className="wireframe__meta">
          <div className="wireframe__meta-item">
            <img src={locationIcon} alt="" width={20} height={20} />
            <p className="text-body">San Francisco, CA</p>
          </div>
          <div className="wireframe__meta-item">
            <img src={bookIcon} alt="" width={20} height={20} />
            <p className="text-body">
              Design at UC Berkeley / Engineering at U of Waterloo
            </p>
          </div>
        </div>
      </section>

      <div id="work" className="wireframe__work">
        {PROJECTS.map((project) => (
          <Link
            key={project.id}
            id={project.id}
            className={`wireframe__project wireframe__project--${project.id}`}
            to={project.path}
          >
            <div className="wireframe__media">
              <img src={project.image} alt={project.alt} />
            </div>
            <div className="wireframe__project-info">
              <div className="wireframe__project-title-block">
                <h2 className="text-h1">{project.title}</h2>
                <p className="text-body">{project.year}</p>
              </div>
              <p className="wireframe__project-desc text-body">
                {project.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
