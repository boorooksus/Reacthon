import React, { useState } from 'react'
import { Button, Icon } from 'semantic-ui-react'

function RunButton(props) {
    const [RunText, setRunText] = useState('Run')
    const [RunColor, setRunColor] = useState('blue')

    const buttonHandler = () => {
        setRunText(<Icon loading name='spinner' />)
        setRunColor('grey')

        props.compiler()
        console.log(props.isRunning)

        if(props.isRunning === false){
            setRunText('Run')
            setRunColor('blue')
        }
    }

    return (
        <div>
            <Button color={RunColor} onClick={buttonHandler}>{RunText}</Button>
        </div>
    )
}

export default RunButton
