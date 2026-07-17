import { Link, useParams } from 'react-router-dom'
import { projectById } from '../data'

export default function ProjectStubPage() {
  const { slug } = useParams()
  const project = projectById(slug)

  if (!project) {
    return (
      <section className="wireframe__placeholder">
        <h1 className="wireframe__headline text-h1">Not found</h1>
        <p className="text-body">
          No project at <code>/work/{slug}</code>.{' '}
          <Link to="/#work">Back to work</Link>
        </p>
      </section>
    )
  }

  return (
    <section className="wireframe__placeholder">
      <h1 className="wireframe__headline text-h1">{project.title}</h1>
      <p className="text-body">
        Case study coming soon — placeholder for{' '}
        <code>{project.path}</code>.
      </p>
      <p className="text-body">
        <Link to="/#work">← Back to work</Link>
      </p>
    </section>
  )
}
