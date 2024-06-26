import React from 'react';
import { Box, AspectRatio, Image } from '@chakra-ui/react';
import NextImage from 'next/image';

import download01Image from '../../images/robert-class/list/01_download_cover.png';
import download02Image from '../../images/robert-class/list/02_download_cover.png';
import download03Image from '../../images/robert-class/list/03_download_cover.png';
import download04Image from '../../images/robert-class/list/04_download_cover.png';

import epRobertClass from '../../images/robert-class/ep-robert.webp';
const Downloads = () => {
	const DownloadList = [
		{
			id: 1,
			name: '7 Steps Photography Checklist（只有英文版）',
			src: download01Image,
			url: 'https://www.greenpeace.org/static/planet4-hongkong-stateless/2024/06/42e583f2-01-7-steps-photography-checklist.pdf'
		},
		{
			id: 2,
			name: '本地生態探索地圖（中文版）',
			src: download02Image,
			url: 'https://www.greenpeace.org/static/planet4-hongkong-stateless/2024/06/37c6ec3e-02-hong-kong-nature-photo-walk-map-chinese-version.pdf'
		},
		{
			id: 3,
			name: 'Hong Kong Nature Photo Walk Map(English version)',
			src: download03Image,
			url: 'https://www.greenpeace.org/static/planet4-hongkong-stateless/2024/06/2cf3efb4-03-hong-kong-nature-photo-walk-mapenglish-version.pdf'
		},
		{
			id: 4,
			name: '《香港怪の生物》本地生態觀賞圖鑑',
			src: download04Image,
			url: 'https://www.greenpeace.org/static/planet4-hongkong-stateless/2024/06/8c4002a0-04-masterclass-hongkonganimalebook.pdf'
		}
	];

	return (
		<div className="flex flex-col gap-4">
			<div className="mx-auto flex flex-row items-center gap-4">
				<Image
					alt={'ep-robert'}
					src={epRobertClass}
					width={'full'}
					height={'auto'}
					className="max-w-[96px] -rotate-180 -scale-y-100 md:hidden"
				/>
				<h1 className="text-center text-2xl font-bold text-[#007c00] md:text-3xl">
					資源下載
				</h1>
			</div>

			<div className="relative mx-auto w-full overflow-x-auto">
				<div className="flex flex-row items-baseline gap-4">
					<div className="hidden max-w-[240px] md:block">
						<Image
							alt={'ep-robert'}
							src={epRobertClass}
							width={'full'}
							height={'auto'}
							className="-rotate-180 -scale-y-100"
						/>
					</div>
					<div className="flex-1">
						<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
							{DownloadList.map((item) => (
								<Box
									key={item.id}
									borderRadius="xl"
									onClick={() => window.open(item.url, '_blank')}
									cursor="pointer"
									_hover={{ opacity: 0.7 }}
									m={4}
								>
									<AspectRatio w="full">
										<Image
											alt={item.name}
											src={item.src}
											layout="fill" // This ensures the image fills the container
											objectFit="cover" // This makes sure the image covers the box fully
											className="rounded-md"
										/>
									</AspectRatio>
									<div as="h3" className="mt-2 text-center font-bold">
										{item.name}
									</div>
								</Box>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Downloads;
