import React, { useEffect, useState } from 'react';
import {
	Box,
	Heading,
	Stack,
	Text,
	Center,
	Spinner,
	SimpleGrid,
	Button
} from '@chakra-ui/react';

// Import static
import { headingProps } from '@common/styles/components/contentStyle';

import axios from 'axios';

const API_ENDPOINT = `https://strapi.small-service.gpeastasia.org/api/responses`;

const ThoughList = () => {
	const PAGE_SIZE = 20;
	const [thoughts, setThoughts] = useState([]);
	const [pagination, setPagination] = useState(1);
	const [total, setTotal] = useState(0);
	useEffect(async () => {
		const thoughts = await axios
			.get(
				`${API_ENDPOINT}?pagination[page]=${pagination}&filters[firstName][$notNull]=true&sort=publishedAt:desc&pagination[pageSize]=${PAGE_SIZE}`
			)
			.then((response) => {
				return response.data;
			})
			.catch(function (error) {
				console.log(error);
			});

		setThoughts(thoughts?.data);
		setTotal(thoughts?.meta?.pagination?.total);
	}, []);

	const handleFetchMore = async () => {
		const updateThoughts = await axios
			.get(
				`${API_ENDPOINT}?pagination[page]=${
					pagination + 1
				}&filters[firstName][$notNull]=true&sort=publishedAt:desc&pagination[pageSize]=${PAGE_SIZE}`
			)
			.then((response) => {
				return response.data;
			})
			.catch(function (error) {
				console.log(error);
			});

		setThoughts([...thoughts, ...updateThoughts?.data]);
		setPagination(pagination + 1);
	};

	const handleLoadMore = () => {
		const number = total - thoughts?.length;

		if (number > 0) {
			return (
				<Center my={4}>
					<Button variant="outline" onClick={() => handleFetchMore()}>
						{'讀取更多'}
					</Button>
				</Center>
			);
		}
	};

	if (thoughts?.length === 0) {
		return (
			<Center py="4">
				<Spinner color="gray.100" />
			</Center>
		);
	}

	return (
		<Box bgColor={'white'} pos={'relative'} borderRadius={'8px'} px="4" py="6">
			<Stack mb="4" space="6">
				<Heading as="h2" {...headingProps} color={'#66cc00'}>
					I Wish ...
				</Heading>
				<Text>
					看看您與其他綠色和平會員的生日願望，盼我們堅持環保信念，終有一天成真！
				</Text>
			</Stack>
			<Box
				maxH={{ base: '480px', md: '680px' }}
				overflowY={'auto'}
				css={{
					'&::-webkit-scrollbar': {
						width: '4px'
					},
					'&::-webkit-scrollbar-track': {
						width: '6px'
					},
					'&::-webkit-scrollbar-thumb': {
						background: '#D2D2D2',
						borderRadius: '24px'
					}
				}}
			>
				<SimpleGrid columns={{ base: '1', lg: '2' }} gap={4}>
					{thoughts?.map((thought, i) => (
						<Box
							key={i}
							flex={1}
							borderRadius="md"
							borderWidth="1px"
							borderLeft="4px"
							borderLeftColor={'#66cc00'}
							bgColor={'#fefefe'}
							p={4}
							overflow="hidden"
						>
							<Text
								fontSize={'md'}
								fontWeight={'bold'}
								color={'gray.800'}
								mb="1"
							>
								{thought?.attributes?.firstName}:
							</Text>
							<Text fontSize={'sm'} color={'gray.700'} lineHeight="2">
								{thought?.attributes?.campaignData1}
							</Text>
						</Box>
					))}
				</SimpleGrid>
				{handleLoadMore()}
			</Box>
		</Box>
	);
};

export default ThoughList;
