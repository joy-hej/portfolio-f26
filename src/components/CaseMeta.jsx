export default function CaseMeta({ label, children }) {
  return (
    <p className="case__meta text-body">
      <strong>{label}:</strong>
      {children != null && children !== '' ? <> {children}</> : null}
    </p>
  )
}
