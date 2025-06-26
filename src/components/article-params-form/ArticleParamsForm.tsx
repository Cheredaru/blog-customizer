import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef, useEffect } from 'react';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	onApply: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [params, setParams] = useState<ArticleStateType>(defaultArticleState);
	const sidebarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {setIsOpen(false);}
		};
		if (isOpen) {document.addEventListener('mousedown', handleClickOutside);}
		return() => {document.removeEventListener('mousedown', handleClickOutside);};
	}, [isOpen]);

	const handleParamsChange = <K extends keyof ArticleStateType> (
		key: K,
		value: ArticleStateType[K]
	) => {
		setParams(prev => ({ ...prev, [key]: value}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(params);
		setIsOpen(false);
	}

	const handleReset = () => {
		setParams(defaultArticleState);
		onApply(defaultArticleState);
	}

	const toggleSidebar = () => {
		setIsOpen(prev => !prev);
	}

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
			<aside
				ref={sidebarRef}
				className={`${styles.container} ${isOpen ? styles.container_open : ''}`}>
				<form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
					<h2 className={styles.title}>ЗАДАЙТЕ ПАРАМЕТРЫ</h2>

					<div className={styles.formGroup}>
						<label className={styles.label}>ШРИФТ:</label>
						<Select
							options={fontFamilyOptions}
							selected={params.fontFamilyOption}
							onChange={(option) => handleParamsChange('fontFamilyOption', option)}
							placeholder='Выберите шрифт'
						/>
					</div>

					<div className={styles.formGroup}>
						<RadioGroup
							name="fontSize"
							title="Размер шрифта:"
							options={fontSizeOptions}
							selected={params.fontSizeOption}
							onChange={(option) => handleParamsChange('fontSizeOption', option)}
						/>
					</div>

					<div className={styles.formGroup}>
						<label className={styles.label}>Цвет шрифта:</label>
						<Select
							options={fontColors}
							selected={params.fontColor}
							onChange={(option) => handleParamsChange('fontColor', option)}
							placeholder='Выберите цвет шрифта'
						/>
					</div>

					<Separator />

					<div className={styles.formGroup}>
						<label className={styles.label}>Цвет фона:</label>
						<Select
							options={backgroundColors}
							selected={params.backgroundColor}
							onChange={(option) => handleParamsChange('backgroundColor', option)}
							placeholder='Выберите цвет фона'
						/>
					</div>

					<div className={styles.formGroup}>
						<label className={styles.label}>Ширина контента:</label>
						<Select
							options={contentWidthArr}
							selected={params.contentWidth}
							onChange={(option) => handleParamsChange('contentWidth', option)}
							placeholder='Выберите ширину контента'
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
}