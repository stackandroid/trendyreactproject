import React, { useState, useEffect, useCallback } from 'react'
import Form from '../../form/form'
import {onetimepasscode} from '../../form/schema'
import styled from 'styled-components'
import { Button, Title, SubHeader, Detail, BigTitle, openNotification} from '../../ui/botwUI'
import { useHistory } from "react-router-dom";
import { useBotw } from '../../../provider/botw'
import { notification } from 'antd';

const Login = () => {
    const rom = useBotw()
    const [submitting, setSubmitting] = useState(null)
    const history = useHistory()
    const {setUI,actions} = rom

    const formButtons = [
        {type:'submit','text':'Next',color:'submit',style:''},
        {type:'secondary','text':'Cancel',color:'secondary'},
    ]

    async function onetimePasscode(v){
        if (!(v.email&&v.password)) return  
        setSubmitting(true)
        const res = await actions.login(v.email, v.password)
        if (res){
            history.push('/createNewPractice')
        } else {
            openNotification('Oops!','Login failed')
        }
        setSubmitting(false)
    }

    function resetOnetimePasscode(){
        history.push('/password')
    }

    return (<Wrap>
        <SubHeader title={'Request a one-time verification code'} style={{marginBottom:10}}/>
        <SubHeader title={'To ensure your information is protected ...'} style={{marginBottom:10}}/>
        <SubHeader title={'If you choose text message ...'} style={{marginBottom:10}}/>
        <SubHeader title={'How would you like to receive the code...'} style={{marginBottom:10}}/>
            <Form
                config={onetimepasscode}
                submitting={submitting}
                buttons={formButtons}
                inputWidth={10}
                onSubmit={(v)=>onetimePasscode(v)}
                onSecondary={()=>resetOnetimePasscode()}
            />
        <SubHeader title={'Incorrect Information shown above? Contact your banker to help you get access'} style={{marginBottom:10}}/>
    </Wrap>);
}

export default Login

const Wrap = styled.div`
    display:flex;
    flex:1;
    flex-direction:column;
    justify-content:center;
    align-content:center; 
`
