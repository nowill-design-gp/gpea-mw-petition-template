import React from 'react';
import {
  Heading,
  Box,
  Flex,
  Text,
  Image,
  Stack,
  Link,
  Center,
} from '@chakra-ui/react';
import PageContainer from '@containers/pageContainer';

import { TextWrapper } from './Banner.style';

const iconWrapProps = {
  bgColor: '#FFF',
  borderRadius: '50%',
  w: 10,
  h: 10,
  fontSize: '16px',
};

export default function Index({ content, bgImage }) {
  return (
    <>
      <Box
        minH={{ base: 'lg', md: 'xl' }}
        pos={'relative'}
        zIndex={2}
        bgSize={`cover`}
        bgPos={`center center`}
        paddingBottom={'4rem'}
      >
        <Box pos={'relative'} zIndex={3}>
          <PageContainer>
            <Box py={6} px={4} height="100%" maxW={{ base: '100%', md: '50%' }}>
              <Flex
                height="100%"
                direction="column"
                justifyContent="space-between"
              >
                <TextWrapper>
                  <Heading
                    as="h1"
                    fontSize={{ base: '4xl', md: '5xl' }}
                    fontWeight="bold"
                    lineHeight="1.3"
                    color={'white'}
                    dangerouslySetInnerHTML={{ __html: content.title }}
                  />
                  {content.description.map((d, i) => (
                    <Text
                      key={i}
                      fontSize={{ base: 'sm', md: 'md' }}
                      color={'#FFF'}
                      dangerouslySetInnerHTML={{ __html: d }}
                    ></Text>
                  ))}
                </TextWrapper>
                <TextWrapper>
                  <Stack direction="column" py={4} spacing={2}>
                    {content.inviteMessage && (
                      <Text
                        color={'#FFF'}
                        dangerouslySetInnerHTML={{
                          __html: content.inviteMessage,
                        }}
                      />
                    )}
                    <Stack direction="row" spacing={6}>
                      {content.shareLink.map((d, i) => (
                        <Box key={i} {...iconWrapProps}>
                          <Link href={d.link} target={`_blank`}>
                            <Center h={`100%`}>{d.shareComponent}</Center>
                          </Link>
                        </Box>
                      ))}
                    </Stack>
                    {/* <Box onClick={() => console.log('clicked')}>
                      <Text textDecoration={'underline'} color={'#FFF'}>
                        {content.inviteInfo}
                      </Text>
                    </Box> */}
                  </Stack>
                </TextWrapper>
              </Flex>
            </Box>
          </PageContainer>
        </Box>

        <Box pos={'absolute'} top={0} right={0} left={0} bottom={0}>
          <Image
            src={bgImage}
            h={'100%'}
            w={'100%'}
            objectFit={'cover'}
            objectPosition={'center'}
          />
        </Box>

        <Box
          className={'heroMask'}
          pos={'absolute'}
          top={0}
          right={0}
          left={0}
          bottom={0}
          bgColor={'rgba(0,0,0,.5)'}
        />
      </Box>
    </>
  );
}
