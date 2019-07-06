import React, { useState, useEffect } from 'react';
import './EffectMain.scss';
import GoogleImages from 'google-images';
import Deck from './Deck';
const EffectMain = (props) => {
	const [ urls, setUrls ] = useState([]);
	const getImageUrls = () => {
		const id = '004811889639723618382:hnuyd_ggg7y';
		const key = 'AIzaSyByYHbdgo6KV-zobXn1_rFqP2r198YofwM';
		const client = new GoogleImages(id, key);
		let url = [];
		client.search(props.attendee + ' house', { page: 0 }).then((images) => {
			for (let i = 0; i < images.length; i++) {
				url.push(images[i].url);
			}
			setUrls(url);
		});
	};
	const createName = () => {};
	useEffect(() => {
		console.log('렌더링이 완료되었습니다!');
		getImageUrls();
	}, []);
	return (
		<div className="effect-con">
			<div className="deck">
				<Deck urls={urls} word={props.word} />
			</div>
			<p class="name">{props.names}</p>
		</div>
	);
};
export default EffectMain;
