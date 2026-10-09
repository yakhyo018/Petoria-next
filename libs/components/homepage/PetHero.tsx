import React from 'react';
import { useRouter } from 'next/router';
import { Box, Stack } from '@mui/material';
import { ProductSpecies, ProductType } from '../../enums/product.enum';
import { ProductsInquiry } from '../../types/product/product.input';

const baseInput: ProductsInquiry = {
	page: 1,
	limit: 9,
	sort: 'createdAt',
	direction: 'DESC' as ProductsInquiry['direction'],
	search: {
		pricesRange: {
			start: 0,
			end: 2000000,
		},
	},
};

const speciesChips: { species: ProductSpecies; label: string }[] = [
	{ species: ProductSpecies.DOG, label: 'Dogs' },
	{ species: ProductSpecies.CAT, label: 'Cats' },
	{ species: ProductSpecies.BIRD, label: 'Birds' },
	{ species: ProductSpecies.FISH, label: 'Fish' },
];

const typeCards: { type: ProductType; label: string; note: string }[] = [
	{ type: ProductType.PET, label: 'Pets', note: 'Find a new friend' },
	{ type: ProductType.FOOD, label: 'Food', note: 'Healthy & tasty' },
	{ type: ProductType.TOY, label: 'Toys', note: 'Play all day' },
	{ type: ProductType.ACCESSORY, label: 'Accessories', note: 'Beds, leashes & more' },
];

const PawIcon = () => (
	<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
		<g fill="currentColor">
			<ellipse cx="5.2" cy="10" rx="2.1" ry="2.6" />
			<ellipse cx="9.2" cy="5.6" rx="2.2" ry="2.8" />
			<ellipse cx="14.8" cy="5.6" rx="2.2" ry="2.8" />
			<ellipse cx="18.8" cy="10" rx="2.1" ry="2.6" />
			<path d="M12 21.2c-4.8-3.3-6.8-6.1-5-8.5 1.5-2 3.9-1.6 5 .2 1.1-1.8 3.5-2.2 5-.2 1.8 2.4-.2 5.2-5 8.5z" />
		</g>
	</svg>
);

const PetHero = () => {
	const router = useRouter();

	/** HANDLERS **/
	const pushProducts = async (search: ProductsInquiry['search']) => {
		const input = JSON.stringify({ ...baseInput, search: { ...baseInput.search, ...search } });
		await router.push(`/product?input=${input}`, `/product?input=${input}`);
	};

	return (
		<Stack className={'pet-hero'}>
			<div className={'pet-hero__blob pet-hero__blob--one'} />
			<div className={'pet-hero__blob pet-hero__blob--two'} />
			<div className={'pet-hero__paws'} aria-hidden="true" />

			<Stack className={'container pet-hero__inner'}>
				<Box component={'div'} className={'pet-hero__copy'}>
					<span className={'pet-hero__eyebrow'}>
						<PawIcon />
						Petoria Pet Shop
					</span>
					<h1>
						Everything your pet loves, <em>in one cozy place</em>
					</h1>
					<p>Pets, food, toys and accessories from trusted sellers across Korea.</p>
					<div className={'pet-hero__actions'}>
						<button type="button" className={'pet-hero__cta'} onClick={() => router.push('/product')}>
							Shop now
						</button>
						<button type="button" className={'pet-hero__ghost'} onClick={() => router.push('/seller')}>
							Meet sellers
						</button>
					</div>
					<div className={'pet-hero__species'}>
						{speciesChips.map(({ species, label }) => (
							<button
								type="button"
								key={species}
								className={'pet-hero__chip'}
								onClick={() => pushProducts({ speciesList: [species] })}
							>
								<PawIcon />
								{label}
							</button>
						))}
					</div>
				</Box>

				<Box component={'div'} className={'pet-hero__visual'}>
					<div className={'pet-hero__badge'}>
						<img src="/img/logo/logoText.svg" alt="" />
					</div>
					{typeCards.map(({ type, label, note }, index) => (
						<button
							type="button"
							key={type}
							className={`pet-hero__type pet-hero__type--${index + 1}`}
							onClick={() => pushProducts({ typeList: [type] })}
						>
							<span
								className={'pet-hero__type-art'}
								style={{ backgroundImage: `url(/img/banner/types/${type.toLowerCase()}.svg)` }}
							/>
							<span className={'pet-hero__type-text'}>
								<strong>{label}</strong>
								<small>{note}</small>
							</span>
						</button>
					))}
				</Box>
			</Stack>
		</Stack>
	);
};

export default PetHero;
