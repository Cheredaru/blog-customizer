import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, ArticleStateType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [currentArticleState, setCurrentArticleState] = useState<ArticleStateType>(defaultArticleState);

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const handleApply = (params: ArticleStateType) => {
		setCurrentArticleState(params);
		setIsSidebarOpen(false);
	}

	const handleReset = () => {
		setCurrentArticleState(defaultArticleState);
	}

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	}

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': currentArticleState.fontFamilyOption.value,
					'--font-size': currentArticleState.fontSizeOption.value,
					'--font-color': currentArticleState.fontColor.value,
					'--container-width': currentArticleState.contentWidth.value,
					'--bg-color': currentArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				initialParams={currentArticleState}
				onApply={handleApply}
				onReset={handleReset}
				isOpen={isSidebarOpen}
				toggleOpen={toggleSidebar}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
