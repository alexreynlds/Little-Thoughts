import React from 'react'
import { ImageSourcePropType } from 'react-native'
import { Box, VStack, Heading, Image } from 'native-base'

interface Props {
    title: string
    image: ImageSourcePropType
    children: React.ReactNode
}

const Masthead = ({ title, image, children }: Props) => {
    return (
        <VStack h="300px" pb={5}>
            <Image
                position="absolute"
                left={0}
                right={0}
                bottom={0}
                w={'full'}
                h={'300px'}
                resizeMode={'cover'}
                source={image}
                alt="masthead image"
            />
            {children}
            <Box flex={1}>
                <Heading
                    color="white"
                    size="xl"
                    p={6}
                    position="absolute"
                    bottom={0}
                >
                    {title}
                </Heading>
            </Box>
        </VStack>
    )
}

export default Masthead
