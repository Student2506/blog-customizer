import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';

type ArticleParamsFormProps = {
	onApply: (state: typeof defaultArticleState) => void;
	onReset: (state: typeof defaultArticleState) => void;
};

export const ArticleParamsForm = ({
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const formRef = useRef<HTMLElement>(null);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const updateFormField = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setFormState((prev) => ({
				...prev,
				[field]: value,
			}));
		};
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		onApply(formState);
		setIsOpen(false);
	};

	const handleReset = (e: FormEvent) => {
		e.preventDefault();
		setFormState(defaultArticleState);
		onReset(defaultArticleState);
	};

	useEffect(() => {
		if (!isOpen) return;
		const clickOutside = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', clickOutside);
		return () => {
			document.removeEventListener('mousedown', clickOutside);
		};
	}, [isOpen]);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={formRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text
						size={38}
						weight={800}
						fontStyle={'normal'}
						uppercase={true}
						align={'left'}>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						title='Шрифт'
						onChange={updateFormField('fontFamilyOption')}
						options={fontFamilyOptions}
					/>
					<RadioGroup
						selected={formState.fontSizeOption}
						name='fontSize'
						onChange={updateFormField('fontSizeOption')}
						options={fontSizeOptions}
						title='Размер шрифта'
					/>
					<Select
						selected={formState.fontColor}
						title='Цвет шрифта'
						onChange={updateFormField('fontColor')}
						options={fontColors}
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						title='Цвет фона'
						onChange={updateFormField('backgroundColor')}
						options={backgroundColors}
					/>
					<Select
						selected={formState.contentWidth}
						title='Ширина контента'
						onChange={updateFormField('contentWidth')}
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
