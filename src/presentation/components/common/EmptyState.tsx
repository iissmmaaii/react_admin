export function EmptyState({ title, description }: { title: string; description: string }) {
  return <div className="empty-state"><div className="empty-mark">✓</div><h3>{title}</h3><p>{description}</p></div>;
}
