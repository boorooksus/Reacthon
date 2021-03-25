import React, {useState} from 'react'
import { Button, Header, Segment, Grid, Form, TextArea, Icon } from 'semantic-ui-react'
import Axios from 'axios';
// import RunButton2 from './Sections/RunButton';

function LandingPage() {

    const [Code, setCode] = useState("")
    const [RunButton, setRunButton] = useState('Run')
    const [RunColor, setRunColor] = useState('blue')
    const [Result, setResult] = useState('...')
    const [RunningTime, setRunningTime] = useState('')
    const [IsRunning, setIsRunning] = useState(false)

    const editor = (event) => {
        if(event.keyCode===9){

            event.preventDefault();
            var v=event.currentTarget.value
            var s=event.currentTarget.selectionStart
            var e=event.currentTarget.selectionEnd;

            event.currentTarget.value=v.substring(0, s)+'\t'+v.substring(e);
            event.currentTarget.selectionStart=event.selectionEnd=s+1;
        }

    }

    const codeHandler = (event) => {
        setCode(event.currentTarget.value)
    }

    const compiler = () => {

        setRunButton(<Icon loading name='spinner' />)
        setRunColor('grey')
        setIsRunning(true)

        const body={
            code: Code
        }

        Axios.post('/api/compiler', body)
            .then(response => {

                var result = response.data.result;

                // setResult(result.split('\n').map((str, index) => <p key={index}>{str}</p>))
                setResult(result)

                setRunningTime(response.data.runningTime)
                setRunButton('Run')
                setRunColor('blue')
                setIsRunning(false)
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
                <Form action = "/" method="post">
                    <TextArea id="myCode" placeholder="# Enter your code" name="description" rows="20" onKeyDown={editor} onChange={codeHandler} value={Code} style={{fontSize: 20}} ></TextArea>
                </Form>
                <br />

                <Button style={{width:80}} color={RunColor} onClick={compiler}>{RunButton}</Button>

                {/* <RunButton2 isRunning={IsRunning} compiler={() => compiler() } /> */}
                </Segment>
            </Grid.Column>

            <Grid.Column>
                <Segment>
                    <Segment style={{overflow: 'auto', height: 540, fontSize: 20}}>
                        <pre>
                        {Result}
                        </pre>
                    </Segment>
                    <p>{RunningTime}</p>
                </Segment>
            </Grid.Column>
            </Grid.Row>
            </Grid>
            
        </div>
    )
}

export default LandingPage
