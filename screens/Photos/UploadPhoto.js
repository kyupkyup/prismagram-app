import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Alert, ActivityIndicator, Image } from "react-native";
import useInput from "../../hooks/useInput";
import styles from "../../styles";
import constants from "../constants";
import { func } from "prop-types";
import {gql} from "apollo-boost";
import { useMutation } from "react-apollo-hooks";
import apolloClientOptions from "../../apollo"
import { FEED_QUERY } from "../Tabs/Home";

const UPLOAD = gql`
  mutation upload($caption:String!, $files:[String!]!, $location: String!){
    upload(caption:$caption, files:$files, location:$location){
      id
      caption
      location
    }
  }
`;

const View = styled.View`
  flex: 1;
`;

const Container = styled.View`
padding: 20px;
flex-direction: row;
`;

const Form = styled.View`

  justify-content: flex-start;
`;

const STextInput = styled.TextInput`
margin-bottom: 10px;
border: 0px solid ${styles.lightGreyColor};
border-bottom-width: 1px;
padding-bottom: 10px;
width: ${constants.width - 180};    
`;



const Button = styled.TouchableOpacity`
background-color: ${props => props.theme.blueColor};
padding: 10px;
border-radius: 4px;
align-items: center;
justify-content: center;
`;

const Text = styled.Text`
  color: white;
  font-weight: 600;
`;

export default ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const photo = navigation.getParam("photo");
  const captionInput = useInput("asdfs");
  const locationInput = useInput("asdf");
  const [uploadMutation] =  useMutation(UPLOAD, {
    variables: {
      caption :captionInput.value,
      location : locationInput.value
    },
    refetchQueries: () =>[{query: FEED_QUERY}]
  })



  const handleSubmit = async () => {
    setLoading(true);
    if (captionInput.value === "" || locationInput.value === "") {
      Alert.alert("All fields have to be filled");
    }
    const formData = new FormData();
    const name = photo.filename;
    const [, type] = name.split(".");
    formData.append("file", {
      name,
      type: "image/jpeg",
      uri: photo.uri
    });
    try{
      const {data :{ location }} = await axios.post(apolloClientOptions.uri+"/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data"
        }
      }).catch(function(err){
        console.log(err);
      });
      const {data : {upload}} = await uploadMutation({
        variables:{
          files: [location]
        }
      });
      if(upload.id){
        navigation.navigate("TabNavigation");
      }
    }

    catch(e){
      Alert.alert("Can't upload now, try later please.");
    }
    finally{
      setLoading(false);

    }
  };

  return (
    <View>
      <Container>
        <Image
          source={{ uri: photo.uri }}
          style={{ width: 80, height: 80, marginRight: 30 }}
        />
        <Form>
          <STextInput
            onChangeText={locationInput.onChange}
            value={locationInput.value}
            placeholder="Location"
            multiline={true}
            placeholderTextColor={styles.darkGreyColor}
          />
          <STextInput
            onChangeText={captionInput.onChange}
            value={captionInput.value}
            placeholder="Caption"
            multiline={true}
            placeholderTextColor={styles.darkGreyColor}
          />
          <Button onPress={handleSubmit}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text>Upload</Text>
            )}
          </Button>
        </Form>
      </Container>
    </View>
  );
};
