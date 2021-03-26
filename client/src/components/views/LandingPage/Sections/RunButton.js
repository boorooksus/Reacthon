import React, { useState } from 'react'
import { Button, Icon } from 'semantic-ui-react'

// 실행 버튼 ui
function RunButton(props) {

    const [RunText, setRunText] = useState('Run')  // 버튼의 글자(or 아이콘)
    const [RunColor, setRunColor] = useState('blue')  // 버튼 색상

    // 컴파일 수행 여부에 따라 버튼 색과 글 변경
    // isRunning: boolean. 현재 컴파일 수행 여부
    const changeButton = (isRunning) => {

        if (isRunning){
            // 컴파일 중일 때
            setRunText(<Icon loading name='spinner' />)
            setRunColor('grey')
        }
        else{
            // 컴파일 중이 아닐 때
            setRunText('Run')
            setRunColor('blue')
        }
    }

    // 컴파일 실행 버튼 눌렀을 때
    const buttonHandler = () => {
        changeButton(true)

        // changeButton() 함수를 콜백함수로 사용하기 위해 패러미터로 넘김.
        props.compiler(changeButton)
    }

    return (
        <div>
            <Button color={RunColor} style={{width:80}} onClick={buttonHandler}>{RunText}</Button>
        </div>
    )
}

export default RunButton
