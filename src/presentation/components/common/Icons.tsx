import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;
const base = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

export const DashboardIcon = (p: IconProps) => <svg {...base} {...p}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>;
export const TransferIcon = (p: IconProps) => <svg {...base} {...p}><path d="M7 7h11l-3-3"/><path d="m18 7-3 3"/><path d="M17 17H6l3 3"/><path d="m6 17 3-3"/></svg>;
export const FileIcon = (p: IconProps) => <svg {...base} {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h6"/></svg>;
export const ChatIcon = (p: IconProps) => <svg {...base} {...p}><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/></svg>;
export const UserIcon = (p: IconProps) => <svg {...base} {...p}><circle cx="12" cy="8" r="4"/><path d="M4 22a8 8 0 0 1 16 0"/></svg>;
export const LogoutIcon = (p: IconProps) => <svg {...base} {...p}><path d="M10 17l5-5-5-5"/><path d="M15 12H3"/><path d="M21 19V5a2 2 0 0 0-2-2h-6"/></svg>;
export const CheckIcon = (p: IconProps) => <svg {...base} {...p}><path d="m5 12 4 4L19 6"/></svg>;
export const CloseIcon = (p: IconProps) => <svg {...base} {...p}><path d="m6 6 12 12M18 6 6 18"/></svg>;
export const RefreshIcon = (p: IconProps) => <svg {...base} {...p}><path d="M20 11a8 8 0 1 0 2 5"/><path d="M20 4v7h-7"/></svg>;
export const EyeIcon = (p: IconProps) => <svg {...base} {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>;
export const DownloadIcon = (p: IconProps) => <svg {...base} {...p}><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>;
export const MenuIcon = (p: IconProps) => <svg {...base} {...p}><path d="M4 6h16M4 12h16M4 18h16"/></svg>;
export const ShieldIcon = (p: IconProps) => <svg {...base} {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>;
