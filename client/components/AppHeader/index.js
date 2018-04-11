import React from 'react';
import { Header, Image, Form, Input, Grid } from 'semantic-ui-react';
import './index.css';
import icon from '../../public/img/icon.png';

const AppHeader = (props) => {
  return (
    <header>
      <Form>
        <Form.Field inline>
          <label>Ushanka Icon placeholder</label>
          <Input size={'mini'} placeholder='Search for friends...' />
        </Form.Field>
      </Form>
    </header>
  );
};

export default AppHeader;