import styled from './MainButton.module.scss';

function MainButton({ buttonTitle, onClick }) {
	return (
		<button className={styled.button} type='submit' onClick={onClick}>
			{buttonTitle}
		</button>
	);
}

export default MainButton;
