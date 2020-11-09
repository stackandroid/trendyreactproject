import React, {useState,useEffect} from "react";
import { Switch, Route } from "react-router-dom";

import Login from './Auth/login/login'
import ForgotPassword from './Auth/login/forgotPassword'
import OneTimePasscode from './Auth/login/oneTimePasscode'
import OneTimeEnterPasscode from './Auth/login/oneTimeEnterPasscode'

 
import Footer from "./Footer";
import Header from "./Header";
import styled from 'styled-components'
import * as api from '../provider/api'
import Backend from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import * as actions from '../provider/actions'

import {BotwProvider, useBotw} from '../provider/botw'

const Wrapper = () => {

  return (<DndProvider backend={Backend}>
    <BotwProvider actions={actions}>
      <Header/>
      <MainWrap>
    
        <Switch>
          <OneTimePasscode exact path="/" />
          <OneTimePasscode exact path="/oneTimePasscode" />
          <OneTimeEnterPasscode exact path="/oneTimeEnterPasscode" />



          <Login exact path="/login" />
          <ForgotPassword exact path="/forgotPassword" />


        </Switch>

        {/* this component only calls api and fills ui */}
        <AccountLoggedInCheck/>
        <Footer />
      </MainWrap>
    </BotwProvider>
  </DndProvider>);
}

export default Wrapper

const AccountLoggedInCheck = () => {
  const rom = useBotw()
  const { ui, setUI } = rom

  useEffect(()=>{
    if(!ui.token) return
    setTimeout(()=>{
      // wait for ui to fill with token
      getData()
    },500)
  },[(ui&&ui.token)])

  async function getData(){
    console.log('start getting data')
    let permissions = []
    let templates = []
    let sales = []
    let notifications = []
    let roles = []
    let organizationTypes = []

    const p = await api.post('permission/query')
    if (p&&p.results) permissions = p.results

    const t = await api.post('template/query')
    if (t&&t.results) templates = t.results

    const a = await api.post('sales/query')
    if (a&&a.results) sales = a.results

    const n = await api.post('notification/query')
    if (n&&n.results) notifications = n.results

    organizationTypes = await getTypes()
    roles = await getUserRoles()

    console.log('done getting data')
    setUI({roles,notifications,sales,permissions,organizationTypes})
    
  }

  async function getTypes(){
    const ty = await api.post('organization_type/query',null)
    if (ty) {
        let typs = []
        ty.results&&ty.results.forEach(r=>{
            typs.push({label:r.name,name:r.name,id:r.id})
        })
        return typs
    }
}

async function getUserRoles(){
  const data = { "columns" : [ "user_role_type_id" ], "search": "4"}
    const roles = []
    const r = await api.post('user_role/query',data)
    if (r) {
        r.results&&r.results.forEach(r=>{
            roles.push({label:r.name,name:r.name,id:r.id})
        })
        return roles
    }
  }
  return null
}

const MainWrap = styled.div`
  display: flex;
  flex:1;
  overflow:auto;
  height: calc(100% - 49px);
  flex-direction:column;
  align-content: center;
  align-items: center;
  background-color:#f6fbfc;  
   
`
