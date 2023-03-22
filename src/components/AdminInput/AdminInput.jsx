import Input from '../Input/Input';
import MainButton from '../MainButton/MainButton';
import styled from './AdminInput.module.scss';

function AdminInput() {
	return (
		<div className={styled.inputCon}>
			<div className={styled.inputWrap}>
				<Input inputTitle='帳號' placeholder='請輸入帳號' />

				{/* <div className={styled.countWrap}> */}
				{/* 帳號不存在的 span 判斷式 */}
				{/* <span className={styled.countTitle}>{accountLength > 50 ? '字數超出上限' : ''}</span>
					<span className={styled.countNumber}>
						{accountLength <= 0 ? '' : `字數: ${accountLength} / 50`}
					</span> */}
				{/* </div> */}
			</div>

			{/* 密碼顯示米號 */}
			<div className={styled.inputWrap}>
				<Input inputTitle='密碼' placeholder='請輸入密碼' />
			</div>

			<MainButton buttonTitle='登入' />
		</div>
	);
}

export default AdminInput;
