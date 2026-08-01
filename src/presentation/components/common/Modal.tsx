import type { ReactNode } from 'react';
import { CloseIcon } from './Icons';

export function Modal({ title, children, onClose }: { title: string; children: ReactNode; onClose(): void }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
    <section className="modal" role="dialog" aria-modal="true" onMouseDown={(e) => e.stopPropagation()}>
      <header className="modal-header"><h2>{title}</h2><button className="icon-button" onClick={onClose} aria-label="إغلاق"><CloseIcon /></button></header>
      <div className="modal-body">{children}</div>
    </section>
  </div>;
}
