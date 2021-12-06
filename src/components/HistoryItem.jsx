import React from 'react'
import {
    Box,
    Stack,
    useColorModeValue,
    Image,
    List,
    ListItem,
  } from "@chakra-ui/react"
  import { 
    CheckCircleIcon,
    NotAllowedIcon 
} from '@chakra-ui/icons'

  export default function HistoryItem({image, date, result}) {
    const bg=useColorModeValue("blue.500")
    const color=useColorModeValue("white")
    const dateObj = new Date(date)
    const formatedDate = 
        dateObj.getDay()+"/"+
        (dateObj.getMonth()+1)+"/"+
        dateObj.getFullYear()+ 
        " - " + 
        dateObj.getHours()+":"+
        dateObj.getMinutes()+":"+
        dateObj.getSeconds()

    //console.log(date)
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
                    <ListItem>Data: {date?formatedDate : "Loading..."}</ListItem>
                    <ListItem>Resultado:&nbsp;
                        {result? 
                            <CheckCircleIcon color="green.500"/>: 
                            <NotAllowedIcon color="red.500"/>
                            }
                    </ListItem>
                </List>
                </Box>
            </Stack>
        </>
    )
}
