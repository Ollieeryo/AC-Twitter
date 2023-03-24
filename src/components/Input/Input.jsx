import styled from './Input.module.scss';

function Input({ inputTitle, type, value, placeholder, onChange }) {
	return (
		<>
			<form action='' className={styled.form}>
				<label htmlFor='' className={styled.label}>
					{inputTitle}
				</label>
				<input
					type={type}
					value={value}
					placeholder={placeholder}
					className={styled.input}
					onChange={onChange}
				/>
			</form>
		</>
	);
}

export default Input;
