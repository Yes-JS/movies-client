import React from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';

import { ThemeProvider } from '~theme';

import styles from './Portal.module.scss';

interface Props {
	display?: boolean;
	zIndex?: number;
	transparent?: boolean;
	onWrapperClick?: () => void;
}

const Portal: React.FC<Props> = ({
	children,
	display = false,
	transparent = false,
	zIndex = 999,
	onWrapperClick = () => undefined,
}) => {
	const [rootNode] = React.useState(document.getElementById('portal'));

	if (rootNode === null || !display) {
		return null;
	}

	const handleWrapperClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
		if (e.target === e.currentTarget) {
			onWrapperClick();
		}
	};

	return ReactDOM.createPortal(
		<ThemeProvider
			tabIndex={0}
			onClick={handleWrapperClick}
			className={cn(styles.container, transparent && styles.transparent)}
			style={{ zIndex }}
		>
			{display && children}
		</ThemeProvider>,
		rootNode
	);
};

export default Portal;
