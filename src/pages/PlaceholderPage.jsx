export default function PlaceholderPage({ title, body }) {
  return (
    <section className="wireframe__placeholder" data-reveal>
      <h1 className="wireframe__headline text-h1">{title}</h1>
      <p className="text-body">{body}</p>
    </section>
  )
}
