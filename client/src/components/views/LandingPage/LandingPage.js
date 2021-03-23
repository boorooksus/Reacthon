import React, {useState} from 'react'
import { Button, Header, Segment, Grid, Form, TextArea, Icon } from 'semantic-ui-react'

function LandingPage() {

    const [Code, setCode] = useState("")

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

    const test = (event) => {
        console.log(event)
    }


    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>

            <Header as='h1' dividing>
                <a href="/"> Python Complier Web App </a>
            </Header>
            <Grid columns={2}>
            <Grid.Row stretched>
            <Grid.Column>
                <Segment>
                <Form action = "/" method="post">
                    <TextArea id="myCode" placeholder="# Enter your code" name="description" rows="20" onKeyDown={editor} onChange={codeHandler} value={Code}></TextArea>
                </Form>
                </Segment>
            </Grid.Column>

            <Grid.Column>
                <Segment>
                    hello
                </Segment>
            </Grid.Column>
            </Grid.Row>
            </Grid>
        <br />

        <Button primary onClick={test}>Run</Button>

        <Button primary animated='fade' onClick={test}>
            <Button.Content visible>hi</Button.Content>
            <Button.Content hidden><Icon loading name='spinner' /></Button.Content>
        </Button>
            
        </div>
    )
}

export default LandingPage
