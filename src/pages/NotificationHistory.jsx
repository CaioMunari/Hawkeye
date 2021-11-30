import React, { useEffect } from "react";
import {
  List,
  ListItem,
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
  const regPhoto = baseURL+"/photo/reg/thumb/"+user;
  
  

  async function getHistoryList(id) {
    const response = await api.get("/checkin/list/"+id+"/page/1/size/20");
    setHistoryList(response.data);
  }

  useEffect(() => {
    getHistoryList(user);
  }, []
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
//process.env.REACT_APP_HOM_URL+"/photo/reg/thumb/"+item.userId
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
    </>
  );
};