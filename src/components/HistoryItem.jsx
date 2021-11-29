import React from 'react'
import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Link,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    Image,
    List,
    ListItem,
  } from "@chakra-ui/react"

  export default function HistoryItem({image, date, result, transasctions}) {
    const bg=useColorModeValue("blue.500")
    const color=useColorModeValue("white")

    return (
        <>
            <Stack
                direction="row" 
                spacing={4} 
                align="center"
                justify="center"
                padding="1rem"
                bg={bg}
                color={color}>
                <Box boxSize="100px">
                <Image 
                    border="1px solid black" 
                    borderRadius="full"
                    src={image}
                    alt="" />
                </Box>
                <Box>
                <List 
                    color="white"
                    fontSize="lg">
                    <ListItem>Data: {date? date: "Loading..."}</ListItem>
                    <ListItem>Resultado: {result? result: "Loading..."}</ListItem>
                    <ListItem>Transações: {transasctions? transasctions: "Loading..."}</ListItem>
                </List>
                </Box>
            </Stack>
        </>
    )
}
