import React, {useState, useContext} from 'react'

const botw= React.createContext({})

function useBotw(){
  var ctx = useContext(botw)
  return ctx||{}
}

function createActions(therom,actions){
  if(typeof actions!=='object') return {}
  var r = {}
  for (const key in actions) {
    let value = actions[key]
    if(typeof value!=='function') continue
    if (actions.hasOwnProperty(key)) {
      r[key] = function() {
        const args = arguments||[]
        return value(...args, therom)
      } 
    }
  }
  return r
}

function BotwProvider(props){

  const [ui,setUI] = useState({})
  const [state,setStore] = useState({})

  function setState(a){
    if(typeof a==='object') setStore(a)
  }
  function setTheUI(a){
    let newUI = {}
    if (a) newUI = {...ui,...a}
    setUI(newUI)
    localStorage.setItem('ui', JSON.stringify(newUI))
  }
  async function hydrateUI(){
    const theUI = await getUI()
    if(theUI) setUI(theUI)
  }

  return <botw.Provider value={{
    ...state,
    ui:ui,
    actions: createActions({
      ...state,
      setState,
      setUI:setTheUI,
    }, props.actions || {}),
    setState,
    setUI:setTheUI,
    hydrateUI, 
  }}>
    {props.children}
  </botw.Provider>
}

export {useBotw, BotwProvider}

export async function getUI(){
  const theUI = await localStorage.getItem('ui')
  let parsedUI
  if (theUI) {
      try {
          parsedUI = JSON.parse(theUI)
      } catch(e){}
      if(parsedUI) return parsedUI
  }
  return null
}
