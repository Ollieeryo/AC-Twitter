import Input from '../Input/Input';
import MainButton from '../MainButton/MainButton';
import styled from './RegisterInput.module.scss';

function RegisterInput() {
	return (
		<div className={styled.inputCon}>
			<div className={styled.inputWrap}>
				<Input inputTitle='帳號' placeholder='請輸入帳號' />
				<div className={styled.countWrap}>
					{/* 帳號已有被人註冊的 span 判斷式 */}

					{/* <span className={styled.countTitle}>{accountLength > 50 ? '字數超出上限' : ''}</span>
					<span className={styled.countNumber}>
						{accountLength <= 0 ? '' : `字數: ${accountLength} / 50`}
					</span> */}
				</div>
			</div>

			<div className={styled.inputWrap}>
				<Input inputTitle='名稱' placeholder='請輸入使用者名稱' />
			</div>

			{/* 數字改字體 */}
			<div className={styled.inputWrap}>
				<Input inputTitle='Email' placeholder='請輸入 Email' />
			</div>
			{/* 密碼顯示米號*/}
			<div className={styled.inputWrap}>
				<Input inputTitle='密碼' placeholder='請設定密碼' />
			</div>
			{/* 密碼顯示米號 */}
			<div className={styled.inputWrap}>
				<Input inputTitle='密碼確認' placeholder='請再次輸入密碼' />
			</div>

			<MainButton buttonTitle='註冊' />
		</div>
	);
}

export default RegisterInput;
