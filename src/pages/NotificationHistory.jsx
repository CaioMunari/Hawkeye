import React, { useEffect } from "react";
import {
  List,
  ListItem,
  Stack,
  Button,
  Text,
} from "@chakra-ui/react";
import {api} from '../services/api'
import HistoryItem from '../components/HistoryItem'

export default function NotificationHistory (){
  
  //TODO: cath the user id of the logged one
  const user = 46

  const baseURL =
  process.env.REACT_APP_ENVIRONMENT === "development"
    ? process.env.REACT_APP_LOCAL_URL
    : process.env.REACT_APP_HOM_URL;

  const [historyList, setHistoryList] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const regPhoto = baseURL+"/photo/reg/thumb/"+user;
  
  

  async function getHistoryList(id) {
    const response = await api.get("/checkin/list/"+id+"/page/"+page+"/size/5");
    setHistoryList(response.data);
  }

  function alterPage(cmd){
    if(cmd==='next'){
      if(historyList.length>1)
        setPage(page+1)
    }else{
      setPage(page-1)
    }
  }

  useEffect(() => {
    getHistoryList(user);
  }, [page]
  )

  if (!historyList) return (
    <>
      <List spacing={5} margin="2rem">
          <ListItem key={"historyLoadingItem"}>
              <HistoryItem
                date={"Loading"}
                result={"Loading"}
                transasctions={"Loading"}
                image={""}
              />
          </ListItem>
      </List>
    </>
  )

  return (
    <>
      <List spacing={5} margin="2rem">
        {historyList.map((item) => (
          <ListItem key={item.dateCheck}>
              <HistoryItem
                date={item.dateCheck}
                result={item.approval.toString()}
                transasctions={item.usage.toString()}
                image={regPhoto}
              />
          </ListItem>
        ))}
      </List>
      <PageNav/>
    </>
  );


  function PageNav(){
    return(
      <Stack
      direction={"row"}
      align="center"
      justify="center"
      spacing={6}
    >
      <Button
        onClick={()=>{if(page>1)alterPage('prev')}}
        isActive={page===1?true:false}
        display={{ base: "inline-flex", md: "inline-flex" }}
        fontSize={"sm"}
        fontWeight={600}
        color={"white"}
        bg={"blue.500"}
        _hover={{
          bg: "gray.500",
        }}
      >
        &lt;
      </Button>
      <Text>{page}</Text>
      <Button
        onClick={()=>alterPage('next')}
        display={{ base: "inline-flex", md: "inline-flex" }}
        fontSize={"sm"}
        fontWeight={600}
        color={"white"}
        bg={"blue.500"}
        _hover={{
          bg: "gray.500",
        }}
      >
        &gt;
      </Button>
    </Stack>
    )
  }
};


