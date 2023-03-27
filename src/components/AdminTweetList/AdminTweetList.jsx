import grayLogo from '../../assets/gray-logo.svg';
import xLogo from '../../assets/x-logo.svg';
import styled from './AdminTweetList.module.scss';

function AdminTweets() {
	return (
		// 改用 ul li 來渲染，用假資料試試看，用 map 渲染
		<li>
			<div className={styled.tweetsWrap}>
				<div className={styled.logoWrap}>
					<img className={styled.logo} src={grayLogo} alt='' />
				</div>

				<div className={styled.userWrap}>
					<div className={styled.userInfo}>
						<div className={styled.userInfoCon}>
							<span className={styled.userName}>Apple</span>
							<span className={styled.userTime}>@apple・3 小時</span>
						</div>

						<button className={styled.button}>
							<img src={xLogo} alt='' />
						</button>
					</div>

					<div className={styled.tweetWrap}>
						<p>
							Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor.
							Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.{' '}
						</p>
					</div>
				</div>
			</div>
		</li>
	);
}

function AdminTweetList() {
	return (
		<div className={styled.tweetCon}>
			<ul className={styled.ul}>
				<AdminTweets />
				<AdminTweets />
				<AdminTweets />
				<AdminTweets />
				<AdminTweets />
				<AdminTweets />
				<AdminTweets />
				<AdminTweets />
				<AdminTweets />
			</ul>
		</div>
	);
}

export default AdminTweetList;
