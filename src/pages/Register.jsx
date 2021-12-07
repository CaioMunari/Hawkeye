import React, { useRef, useCallback, useState, useEffect } from "react";
import { Button, Flex, Input, Stack, HStack, RadioGroup, Radio, FormLabel  } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Camera from "../components/Camera";
import { timeStamp } from "../utils/time"
import {generatePassword} from "../utils/password"
import {api} from '../services/api'

const Register = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const webcamRef = useRef(null);
  const initialFormData = Object.freeze({
    username: "",
    password: "",
    name: "",
    lastName: "",
    registration: "",
    gender: ""
  });
  const [formData, setFormData] = React.useState(initialFormData);
  const [inputValidation, setInputValidation] = useState(initialFormData);
  
  

  const registerUser = async () => {

    registerAdmin()
    .then((adminResponse)=>{
      if(adminResponse?.status === 0){
        registerEngine(adminResponse.user)
        .then((engineResponse)=>{
          if(engineResponse?.status === 0){
            setRegister(false)
            navigate("../login", { replace: true });
          }else{
            console.log("Not possible to register user on engine, removing temp records.")
            removeUserAdmin(adminResponse.user.id)
            setRegister(false)
            //TODO: error message
          }
        })
        .catch(()=>{
          console.log(" Engine-Server comunication error")
          console.log("Not possible to register user on engine, removing temp records.")
          removeUserAdmin(adminResponse.user.id)
          setRegister(false)
        })
      }else{
        setRegister(false)
        alert("Register error")
        //TODO: error message
      }
    })
    .catch(()=>{
      console.log(" Admin-Server comunication error")
    })


  };

  async function registerAdmin(){
    const addUserJsonAdmin  = {
      "afapTransactionId": Date.now(),
      "date": timeStamp(),
      "name": formData.name,
      "lastName": formData.lastName,
      "gender": formData.gender,
      "matricula": formData.registration,
      "userName": formData.userName,
      "password": generatePassword(formData.password),
      "id": 0, //dummy data
      "idGroup": 1, //dummy data
      "orgId": 1, //dummy data
      "birthDate": "19800101", //dummy data
      "rg": "000000000", //dummy data
      "cpf": "00000000000", //dummy data
      "photo": {
        "id": 0, //dummy data
        "image": imageSrc.slice(23,imageSrc.length)
      }
    }

    //console.log(addUserJsonAdmin);
    const adminResponse = await api.put("/user/addUser/",addUserJsonAdmin);

    if(adminResponse?.data?.status === 0){
      console.log("user register (Admin): "+adminResponse.data.message);
      return adminResponse.data
    }else{
      console.log("user register (Admin): Fail");
      return ({"status": 500})
    }
    
  }

  async function removeUserAdmin(userId){
    const adminResponse = await api.delete("/user/rollback/{id}?userId="+userId);
    console.log("User removal from Admin: "+adminResponse.data);

    if(adminResponse?.data === "true"){
      return adminResponse.data
    }else{
      return ({"status": 500,})
    }
  }

  async function registerEngine(user){

    const addUserJsonEngine =  [{
      Id: Number(Date.now().toString().slice(3,12)), //não pode ser numero long, int32
      TransDate:new Date(),
      IdOrg: 1, // fixed
      //0=Enroll for inserting new photos
      //1=Analyze for Transactions and analyzing transaction photos
      Type: 0,
      Photos: [{  //dados para transação, checkin
        Id: Number(Date.now().toString().slice(3,12)), //numero randomico para transação
        Image: ""
      }],
      Users: [
        {
          Id: user.id,
          ReferenceId: user.id,  //mesmo do usuario
          Gender: formData.gender,
          Date: new Date(),
          References: [ // dados para registro de imagem
            {
              //0=keep | 1 = Insert | 2=Delete
              Action: 1,
              Id: user.photo.id, //id da foto no admin
              FileName:"", //não utilizado mas tem que existir, vai em branco
              Image: imageSrc.slice(23,imageSrc.length), //só enviado se for cadastro, no checkin remove esse objeto
              Date: new Date(),
            },
          ],
        },
      ],
    }];

    //console.log(addUserJsonEngine);
    const engineResponse = await api.post("/sabis/transaction/",addUserJsonEngine);
    //the engine return an array
    
    if(engineResponse?.data[0]?.status === 0){
      console.log("user register (Engine): "+engineResponse.data[0].message);
      console.log(engineResponse.data);
      return engineResponse.data[0]
    }else{
      console.log("user register (Engine): Fail");
      return ({"status": 500,})
    }

  }


  
  function handleChange(e){
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });

    if(e.target.name==="name"){
      const fullName=e.target.value.trim()
      setFormData({
        ...formData,
        name: fullName.split(/\s(.+)/)[0],
        lastName: fullName.split(/\s(.+)/)[1]
      });
    }

  };

  const capture = useCallback(() => {
    const img = webcamRef.current.getScreenshot({width:640,height:640});
    setImageSrc(img);
    //console.log(img)
  }, [webcamRef]);

  const requestRegister = () => {
    if(!imageSrc){
      capture();
      setRegister(true);
    }else{
      setRegister(true);
    }
  };

  function verify(){
    
    const keys = Object.keys(formData)

    let tempForm={}
    let numberOfErrors = keys.length


    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if(formData[key]==="" || formData[key]===undefined){
        tempForm[key]=true
      }else{
        tempForm[key]=false
        numberOfErrors--
      }
    }
    setInputValidation(
      tempForm
    )

    if(numberOfErrors<=0){
      requestRegister()
    }else{
      console.log("Dados não preenchidos")
    }
  }

  useEffect(() => {
    if(register)registerUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageSrc,register]);

  
  return (
    <Flex w="100%" h="100vh" align="center" justify="center">
      <Stack
        direction="column"
        width={{ base: "100vw", md: "45vw" }}
        bg="gray.200"
        height={{ base: "100vh", md: "70vh" }}
        px={6}
        align="center"
        borderRadius={8}
        p={5}
      >
        <Flex
          direction="column"
          width="100%"
          height={{ base: "25%", md: "80%" }}
          justify="space-between"
          align="center"
          spacing={15}
        >
          <Input isInvalid={inputValidation.name||inputValidation.lastName} errorBorderColor='crimson' height={50} bg="white" onChange={handleChange} name='name' placeholder="Nome" />
          <RadioGroup defaultValue='' name='gender' width='100%' >
            <HStack spacing='24px' height={50} bg="white" borderRadius='5' color='inherit' pl={5}>
              <FormLabel color='#A0AEC0'>Sexo: </FormLabel>
              <Radio isInvalid={inputValidation.gender} errorBorderColor='crimson' value='M' onChange={handleChange}>Masculino</Radio>
              <Radio isInvalid={inputValidation.gender} errorBorderColor='crimson' value='F' onChange={handleChange}>Feminino</Radio>
            </HStack>
          </RadioGroup>
          
          <Input isInvalid={inputValidation.registration} errorBorderColor='crimson' height={50} bg="white" onChange={handleChange} name='registration' placeholder="Matricula"/>
          <Flex
            direction="row"
            width="100%"
            >
            <Input isInvalid={inputValidation.username} errorBorderColor='crimson' height={50} bg="white" onChange={handleChange} name='username' placeholder="Usuario" />
            <Input isInvalid={inputValidation.password} errorBorderColor='crimson' height={50} bg="white" onChange={handleChange} name='password' placeholder="Senha" type="password" mb={5}/>
          </Flex>
        </Flex>

        <Flex
          direction="column"
          justify="center"
          align="center"
          height={{ base: "auto", md: "60vh" }}
          onClick={()=>{imageSrc?setImageSrc(null):capture()}}
        >
          <Camera
            id='teste' 
            imageSrc={imageSrc} 
            ref={webcamRef}
            w='250px'
            h='250px'
            />

        </Flex>
        
        <Button
            fontWeight="bold"
            onClick={verify}
            colorScheme="blue"
            mt={5}
            p="5"
            isLoading={register?true:false}
            loadingText='Submitting'
          >
            Cadastrar
        </Button>
      </Stack>
    </Flex>
  );
};

export default Register;
