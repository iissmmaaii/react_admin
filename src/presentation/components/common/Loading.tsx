export function Loading({ label = 'جارٍ التحميل...' }: { label?: string }) {
  return <div className="loading"><span className="spinner" />{label}</div>;
}
