import React, { useRef, useCallback, useState } from "react";
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
} from "@chakra-ui/react";
import HistoryItem from '../components/HistoryItem'


export default function NotificationHistory (){
  

  function x(y){
    alert(y)
  }

  return (
    <>

      <List spacing={5} margin="2rem">
        {historyList().map((item) => (
          <ListItem key={item.date}>
              <HistoryItem
                date={item.date}
                result={item.result.toString()}
                transasctions={item.transasctions}
                image={item.image}
              />
          </ListItem>
        ))}

      </List>
    </>
  );
};

function historyList(){
  let list = [
    {
      id:5,
      name:"Fuu",
      image:"https://bit.ly/sage-adebayo",
      date:"01/11/2021-13:25:36",
      result:true,
      transasctions:3
    },{
      id:5,
      name:"Fuu",
      image:"https://bit.ly/sage-adebayo",
      date:"02/11/2021-13:35:26",
      result:true,
      transasctions:3
    },{
      id:5,
      name:"Fuu",
      image:"https://bit.ly/sage-adebayo",
      date:"03/11/2021-13:46:06",
      result:true,
      transasctions:3
    }
  ]
  return list;
}