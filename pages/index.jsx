import React from 'react';
import {
  Box, Flex, Text, Button,
} from 'rebass';
import Image from 'next/image';

function LandingPage({ theme }) {
  return (
    <>
      <Box
        width="100vw"
        maxHeight="100vh"
        sx={{
          position: 'fixed', overflow: 'hidden', top: '0vh', zIndex: '-1',
        }}
      >
        <Box
          height="200vh"
          width="200vh"
          backgroundColor={theme.colors.primary500}
          sx={{
            position: 'relative',
            borderRadius: '200vh',
            top: '-50vh',
            right: '-60vh',
            zIndex: '-100',
          }}
        />
      </Box>
      <Flex mt="2vh" width="100%" justifyContent="space-between" fontSize={2}>
        <Flex pl="20px" width={['50%', '20%']} justifyContent="space-evenly" justifySelf="left">
          <Text fontWeight={600}>Bedrock</Text>
          <Text>About</Text>
        </Flex>
        <Flex pr="20px" width={['50%', '15%']} justifyContent="space-evenly" justifySelf="right">
          <Text color={theme.colors.white}>Log In</Text>
          <Button variant='primary"'>Hello</Button>
        </Flex>
      </Flex>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridAutoFlow: 'row' }}>
        <Flex alignContent="center" pl="30px">
          <Text fontWeight={700} fontSize={6} alignSelf="center">Bedrock</Text>
        </Flex>
        <Flex flexDirection="column">
          <Box width="100%" height="500px" sx={{ position: 'relative' }}>
            <Image src="/community.png" layout="fill" objectFit="scale-down" alt="" quality={100} />
          </Box>
          <Text fontWeight={600} color={theme.colors.white} fontSize={3}>
            Every student should have the opportunity to study with their peers

          </Text>
        </Flex>
      </Box>
    </>
  );
}

export default (LandingPage);
