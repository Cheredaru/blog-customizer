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
	ArticleStateType,
	OptionType
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	initialParams: ArticleStateType;
	onApply: (params: ArticleStateType) => void;
	onReset: () => void;
	isOpen?: boolean;
	toggleOpen:() => void;
}

export const ArticleParamsForm = ({
	initialParams = defaultArticleState,
	onApply,
	onReset,
	isOpen = false,
	toggleOpen = () => {},
}: ArticleParamsFormProps) => {
	const [params, setParams] = useState<ArticleStateType>(initialParams);
	const sidebarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (isOpen && sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
				toggleOpen();
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return() => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, toggleOpen]);

	const handleFontFamilyChange = (option: OptionType) => {
		setParams(prev => ({ ...prev, fontFamilyOption: option}));
	};

	const handleFontSizeChange = (option: OptionType) => {
		setParams(prev => ({ ...prev, fontSizeOption: option}));
	};

	const handleFontColorChange = (option: OptionType) => {
		setParams(prev => ({ ...prev, fontColor: option}));
	};

	const handleBackgroundColorChange = (option: OptionType) => {
		setParams(prev => ({ ...prev, backgroundColor: option}));
	};

	const handleWidthChange = (option: OptionType) => {
		setParams(prev => ({ ...prev, contentWidth: option}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(params);
	}

	const handleReset = () => {
		setParams(defaultArticleState);
		onReset();
	}

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleOpen} />
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
							onChange={handleFontFamilyChange}
							placeholder='Выберите шрифт'
						/>
					</div>

					<div className={styles.formGroup}>
						<RadioGroup
							name="fontSize"
							title="Размер шрифта:"
							options={fontSizeOptions}
							selected={params.fontSizeOption}
							onChange={handleFontSizeChange}
						/>
					</div>

					<div className={styles.formGroup}>
						<label className={styles.label}>Цвет шрифта:</label>
						<Select
							options={fontColors}
							selected={params.fontColor}
							onChange={handleFontColorChange}
							placeholder='Выберите цвет шрифта'
						/>
					</div>

					<Separator />

					<div className={styles.formGroup}>
						<label className={styles.label}>Цвет фона:</label>
						<Select
							options={backgroundColors}
							selected={params.backgroundColor}
							onChange={handleBackgroundColorChange}
							placeholder='Выберите цвет фона'
						/>
					</div>

					<div className={styles.formGroup}>
						<label className={styles.label}>Ширина контента:</label>
						<Select
							options={contentWidthArr}
							selected={params.contentWidth}
							onChange={handleWidthChange}
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