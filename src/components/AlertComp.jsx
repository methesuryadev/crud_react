import React, { useState } from 'react'
import Alert from 'react-bootstrap/Alert';

export default function AlertComp(props) {


    if(props.alertshow){
        return (
            <Alert style={{margin:'2% 0%'}}  variant={props.alerttype?props.alerttype:'success'} onClose={() => props.cancelAlert()} dismissible>
            <Alert.Heading>Notification</Alert.Heading>
            <p>{props.apimsg}</p>
            </Alert>
      ) 
    }
}
