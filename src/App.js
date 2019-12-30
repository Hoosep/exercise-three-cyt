import React, { Component, Fragment } from 'react';
import { Form, Row, Col, Icon, Button, Radio, InputNumber } from 'antd';
import './App.css';

let id = 0;

class App extends Component {
  state = {
    numbers: []
  }

  remove = k => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    form.validateFields((err, values) => {
      if (!err) {
        const { names:numbers } = values;

      }
    });
  };

  handleOnChange = e => {
    const { form } = this.props;
    /* form.validateFields((err, values) => {
      const { names:numbers } = values;
      this.setState({
        numbers
      })
    }) */
  }

  disabledButton = e => {
    e.target.disabled = true;
    console.log(e.target);
  }

  handleChangeRadio = e => {
    console.log(e.target.value);
    console.log(e.target);
    e.target.disabled = true;
    console.log(e.target);
  }



  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    
    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 12, offset: 6 },
      },
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (
      <Form.Item
        {...(formItemLayout)}
        required={false}
        key={k}
      >
        {getFieldDecorator(`names[${k}]`, {
          validateTrigger: ['onBlur'],
          rules: [
            {
              required: true,
              pattern: new RegExp("^[0-9]*[02468]$"),
              message: "Solo números pares."
            }
          ],
        })(<InputNumber  placeholder={`Number ${index + 1}`} style={{ width: '100%', marginRight: 8 }} />)}
        {
          <Fragment>
            <Radio.Group onChange={this.handleChangeRadio} buttonStyle="solid" style={{width:'100%'}}>
              <Radio.Button disabled={false} style={{width: '33.33%', textAlign: 'center'}} value="plus">Sumar</Radio.Button>
              <Radio.Button disabled={false} style={{width: '33.33%', textAlign: 'center'}} value="substract">Restar</Radio.Button>
              <Radio.Button disabled={false} style={{width: '33.33%', textAlign: 'center'}} value="multiply">Multiplicar</Radio.Button>
            </Radio.Group>
          </Fragment>
        }
      </Form.Item>
    ));

    
    const rightItems = keys.map((k, index) => (
      <Form.Item
        {...(formItemLayout)}
        required={false}
        key={k}
      >
        {getFieldDecorator(`names[${k}]`, {
          validateTrigger: ['onBlur'],
          rules: [
            {
              required: true,
              pattern: new RegExp("^[0-9]*[02468]$"),
              message: "Solo números pares."
            }
          ],
        })(<InputNumber  placeholder={`Number ${index + 1}`} style={{ width: '90%', marginRight: 8 }} />)}
        {
          <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => this.remove(k)}
          />
        }
      </Form.Item>
    ));
    return (
      <Fragment>
        <Row type="flex" justify="start" align="start">
          <Col span={24}>
            <h1 className="text-center">Exercise three - CYT</h1>
          </Col>
          <Col span={24}>
            <Form onSubmit={this.handleSubmit} onChange={this.handleChange}>
              <Col xs={24} md={12}>
                {formItems}
              </Col>
              <Col xs={24} md={12}>
                {rightItems}
              </Col>

              <Col span={24}>
                <Form.Item {...formItemLayout}>
                  <Button block type="dashed" onClick={this.add} >
                    <Icon type="plus" /> Add number.
                  </Button>
                </Form.Item>
                <Form.Item {...formItemLayout}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Col>
            </Form>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

const WrappedApp = Form.create({ name: 'dynamic_form_item' })(App);

export default WrappedApp;