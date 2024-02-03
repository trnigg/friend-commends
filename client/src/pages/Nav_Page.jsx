import { FormField, Button, Checkbox, Form } from 'semantic-ui-react'

function Nav_Page(){
    return(
        <div>
            <h1>Nav Page</h1>

            <Form>
                <FormField>
                    <label htmlFor="num1">Lab1</label>
                    <input type="text" id="num1" />
                </FormField>
                <FormField>
                    <label htmlFor="num2">Lab2</label>
                    <input type="text" id="num2"/>
                </FormField>
                <Button>Submit</Button>
            </Form>
        </div>
    )
}

export default Nav_Page;