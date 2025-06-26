import { CSSProperties, useState } from "react";
import { ArticleStateType, defaultArticleState } from "./constants/articleProps";
import { ArticleParamsForm } from "./components/article-params-form";
import { Article } from "./components/article";

import styles from './styles/index.module.scss';

export const App = () => {
	const [currentArticleState, setCurrentArticleState] = useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={styles.main}
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
				onApply={setCurrentArticleState}
			/>
			<Article />
		</main>
	);
};