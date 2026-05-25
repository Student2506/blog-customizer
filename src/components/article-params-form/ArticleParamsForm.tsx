import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';
import clsx from 'clsx';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [fontSize, setFontSize] = useState(defaultArticleState.fontSizeOption);
	const [fontFamily, setFontFamily] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [width, setWidth] = useState(defaultArticleState.contentWidth);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form}>
					<Text
						size={38}
						weight={800}
						fontStyle={'normal'}
						uppercase={true}
						align={'left'}>
						Задайте параметры
					</Text>
					<Select
						selected={fontFamily}
						title='Шрифт'
						onChange={setFontFamily}
						options={fontFamilyOptions}
						placeholder='What is it?'
					/>
					<RadioGroup
						selected={fontSize}
						name='fontSize'
						onChange={setFontSize}
						options={fontSizeOptions}
						title='Размер шрифта'
					/>
					<Select
						selected={fontColor}
						title='Цвет шрифта'
						onChange={setFontColor}
						options={fontColors}
						placeholder='What is it?'
					/>
					<Separator />
					<Select
						selected={backgroundColor}
						title='Цвет фона'
						onChange={setBackgroundColor}
						options={backgroundColors}
						placeholder='What is it?'
					/>
					<Select
						selected={width}
						title='Ширина контента'
						onChange={setWidth}
						options={contentWidthArr}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
