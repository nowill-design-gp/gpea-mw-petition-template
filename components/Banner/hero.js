import React from 'react';
import { Heading, Box, Text, Image } from '@chakra-ui/react';
import PageContainer from '@containers/pageContainer';

import { TextWrapper } from './Banner.style';

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
            <Box py={8} px={4} maxW={{ base: '100%', md: '50%' }}>
              <TextWrapper>
                {content.title && (
                  <Heading
                    as="h1"
                    fontSize={{ base: '4xl', md: '5xl' }}
                    fontWeight="bold"
                    lineHeight="1.3"
                    color={'white'}
                    mb={4}
                    dangerouslySetInnerHTML={{ __html: content.title }}
                  />
                )}
                {content.description && (
                  <>
                    {content.description.map((d, i) => (
                      <Text
                        key={i}
                        fontSize={{ base: 'sm' }}
                        color={'#FFF'}
                        dangerouslySetInnerHTML={{ __html: d }}
                      />
                    ))}
                  </>
                )}
              </TextWrapper>
            </Box>
          </PageContainer>
        </Box>

        <Box pos={'absolute'} top={0} right={0} left={0} bottom={0}>
          <Image
            src={bgImage}
            h={'100%'}
            w={'100%'}
            objectFit={'cover'}
            objectPosition={'top center'}
          />
        </Box>

        <Box
          className={'heroMask'}
          pos={'absolute'}
          top={0}
          right={0}
          left={0}
          bottom={0}
          bgColor={'rgba(0,0,0,0.35)'}
        />
      </Box>
    </>
  );
}
