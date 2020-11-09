
import React from 'react'
import styled from 'styled-components'

const SubHeader = ({title, style}) => {
  return <Env style={style}> 
            {title}
        </Env>
}

const Env = styled.div`
    display:flex;
    justify-content:center;
    align-content:center;
    font-family: Montserrat;
    font-size: 32px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.22;
    letter-spacing: normal;
    text-align: center;
    color: #090a0a;
  `

export default SubHeader


