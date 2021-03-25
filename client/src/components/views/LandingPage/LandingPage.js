import React, {useState} from 'react'
import {  Header, Segment, Grid, Form, TextArea } from 'semantic-ui-react'
import Axios from 'axios';
import RunButton from './Sections/RunButton';

// 메인 페이지
function LandingPage() {

    const [Code, setCode] = useState("")  // 입력된 코드
    const [Result, setResult] = useState('...')  // 컴파일 결과
    const [RunningTime, setRunningTime] = useState('')  // 코드의 수행 시간

    // 입력창에서 Tab 키를 눌렀을 때 
    // 다른 항목으로 넘어가지 않고 '\t'를 입력하게 하는 함수
    const editor = (event) => {
        if(event.keyCode===9){
            // 키보드에서 탭 키가 입력됐을 때
            event.preventDefault();

            var v=event.currentTarget.value
            var s=event.currentTarget.selectionStart
            var e=event.currentTarget.selectionEnd;

            event.currentTarget.value=v.substring(0, s)+'\t'+v.substring(e);
            event.currentTarget.selectionStart=event.selectionEnd=s+1;
        }

    }

    // 파이썬 코드 입력 Handling
    const codeHandler = (event) => {
        setCode(event.currentTarget.value)
    }

    // 코드 컴파일 함수
    const compiler = (changeButton, isRunning) => {
        const body={
            code: Code
        }

        // 서버로 코드 데이터 전송
        Axios.post('/api/compiler', body)
            .then(response => {

                var result = response.data.result;

                // setResult(result.split('\n').map((str, index) => <p key={index}>{str}</p>))
                setResult(result)

                setRunningTime(response.data.runningTime)

                changeButton(isRunning)

            })
    }


    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>

            <Header as='h1' dividing>
                <a href="/"> Python Complier Web App </a>
            </Header>
            <Grid doubling columns={2} >
            <Grid.Row stretched>
            <Grid.Column >
                <Segment >
                {/* 파이썬 코드 입력창 */}
                <Form action = "/" method="post">
                    <TextArea id="myCode" placeholder="# Enter your code" name="description" rows="20" onKeyDown={editor} onChange={codeHandler} value={Code} style={{fontSize: 20}} ></TextArea>
                </Form>
                <br />
                {/* 컴파일 실행 버튼 */}
                <RunButton compiler={(changeButton, isRunning )=> compiler(changeButton, isRunning) } />
                </Segment>
            </Grid.Column>

            <Grid.Column>
                <Segment>
                    {/* 컴파일 결과창 */}
                    <Segment style={{overflow: 'auto', height: 540, fontSize: 20}}>
                        {/* pre tag를 사용해야 출력할 때 new line과 띄어쓰기가 유지됨. */}
                        <pre>
                        {Result}
                        </pre>
                    </Segment>
                    {/* 코드 수행 시간 */}
                    <p>{RunningTime}</p>
                </Segment>
            </Grid.Column>
            </Grid.Row>
            </Grid>
            
        </div>
    )
}

export default LandingPage
