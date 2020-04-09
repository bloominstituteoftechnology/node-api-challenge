import React from 'react';
import {
  Divider, List, Item, Segment, Container, Icon,
} from 'semantic-ui-react';

const Footer = () => (
  <div className="footer">
    <Segment inverted vertical style={{ margin: '0em 0em 0em', padding: '1.2em 0em' }}>
      <Container textAlign="center">
        <Divider inverted section />
        <Item as="a" href="https://github.com/anatulea/node-api-challenge/tree/ana-tulea">
          <Icon centered name="github" size="big" alternate outline />
        </Item>
        <List horizontal inverted divided link size="small">
          <List.Item as="a" href="#">
            Site Map
          </List.Item>
          <List.Item as="a" href="https://www.linkedin.com/in/ana-tulea-8b800a170/">
            Contact Us
          </List.Item>
          <List.Item as="a" href="#">
            Privacy Policy
          </List.Item>
        </List>
      </Container>
    </Segment>
  </div>
);

export default Footer;
