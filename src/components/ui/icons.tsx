import React from "react";
export function BugIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round">
			<path d="m8 2 1.88 1.88" />
			<path d="M14.12 3.88 16 2" />
			<path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" />
			<path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6" />
			<path d="M12 20v-9" />
			<path d="M6.53 9C4.6 8.8 3 7.1 3 5" />
			<path d="M6 13H2" />
			<path d="M3 21c0-2.1 1.7-3.9 3.8-4" />
			<path d="M20.97 5c0 2.1-1.6 3.8-3.5 4" />
			<path d="M22 13h-4" />
			<path d="M17.2 17c2.1.1 3.8 1.9 3.8 4" />
		</svg>
	);
}
export function ForkIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round">
			<circle cx="12" cy="4" r="2" /> {/* Top circle */}
			<circle cx="6" cy="18" r="2" /> {/* Left circle */}
			<circle cx="18" cy="18" r="2" /> {/* Right circle */}
			<path d="M12 6v4" /> {/* Line from top circle down */}
			<path d="M12 10c0 2.5-4 2.5-4 5" /> {/* Left branch */}
			<path d="M12 10c0 2.5 4 2.5 4 5" /> {/* Right branch */}
		</svg>
	);
}

export function StarIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round">
			<polygon points="12 2 15 8.5 22 9.2 17 14 18.5 21 12 17.8 5.5 21 7 14 2 9.2 9 8.5 12 2" />
		</svg>
	);
}

export function CodeIcon(props: any) {
	return (
		<svg
			fill={props.fill}
			width={props.width}
			height={props.height}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 640 512">
			<path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z" />
		</svg>
	);
}
