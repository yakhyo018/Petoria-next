import React from 'react';
import { useRouter } from 'next/router';
import { Stack } from '@mui/material';

const Advertisement = () => {
	const router = useRouter();

	return (
		<Stack className={'pet-promo'}>
			<Stack className={'container'}>
				<div className={'pet-promo__card'}>
					<span>Healthy pets, happy homes</span>
					<h2>New friends and fresh supplies every week</h2>
					<p>Browse pets, food, toys and accessories from verified sellers near you.</p>
					<button type="button" onClick={() => router.push('/product')}>
						Explore the shop
					</button>
				</div>
				<div className={'pet-promo__stats'}>
					<div className={'pet-promo__stat'}>
						<strong>4</strong>
						<small>Species</small>
					</div>
					<div className={'pet-promo__stat'}>
						<strong>9</strong>
						<small>Cities</small>
					</div>
					<div className={'pet-promo__stat'}>
						<strong>24/7</strong>
						<small>Live chat</small>
					</div>
				</div>
			</Stack>
		</Stack>
	);
};

export default Advertisement;
