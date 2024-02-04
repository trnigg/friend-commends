import React from 'react'
import {
  CardMeta,
  CardHeader,
  CardDescription,
  CardContent,
  Card,
  Icon,
  Image,
} from 'semantic-ui-react'

const CardExampleCard = (props) => (
  <Card>
    <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
    <CardContent>
      <CardHeader>{props.movietitle}</CardHeader>
      <CardMeta>
        <span className='date'>Joined in 2015</span>
      </CardMeta>
      <CardDescription>
        Matthew is a musician living in Nashville.
      </CardDescription>
    </CardContent>
    <CardContent extra>
      <a>
        <Icon name='user' />
        22 Friends
      </a>
    </CardContent>
  </Card>
)

export default CardExampleCard


