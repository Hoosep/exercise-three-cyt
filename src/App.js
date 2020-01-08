import React, { Component, Fragment } from 'react';
import { Form, Row, Col, Icon, Button, Radio, Input } from 'antd';
import './App.css';

const FormItem = Form.Item;

let uuid = 0;
class App extends Component {
  state = {
    totalOperation: null
  }

  addNumber = () => {
    const { form } = this.props;
    const numbers = form.getFieldValue("newnumbers");
    const nextNumber = numbers.concat(uuid);
    uuid++;

    form.setFieldsValue({
      newnumbers: nextNumber
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { validateFields } = this.props.form;

    validateFields((err, values) => {
      if(!err){
        const { getFieldValue } = this.props.form;
        let totalItems = getFieldValue('newnumbers');
        let totalOperation = 0;
        totalItems.map((k, index) => {
          const actualNumber = parseFloat(getFieldValue(`number${k}`));
          const actualRadioGroup = getFieldValue(`radio-group${k}`);
  
          switch (actualRadioGroup) {
            case "1":
              totalOperation += actualNumber;
              break;
            case "2":
              totalOperation -= actualNumber;
              break;
            case "3":
              totalOperation *= actualNumber;
              break;
            default:
              break;
          }
        });
  
        this.setState({
          totalOperation
        })
      }
    });

  }

  handleClickRemoveNumberRight = e => {
    const { setFieldsValue } = this.props.form;
    const radioGroupIndex = e.target.getAttribute('data-index');
    setFieldsValue({
      [`radio-group${radioGroupIndex}`]: undefined
    });
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { totalOperation } = this.state;
    let newnumbers = [];

    getFieldDecorator("newnumbers", { initialValue: [] });
    newnumbers = getFieldValue("newnumbers");

    const numbersRightItems = newnumbers.map((k, index) => {
      const disabledRadioGroup = getFieldValue(`radio-group${k}`);
      if(disabledRadioGroup){
        const numberLeft = getFieldValue(`number${k}`);
        return (
          <Fragment key={k}>
            <FormItem>
              {getFieldDecorator("number-right" + k, {
              })(<Input disabled placeholder={`${numberLeft}`} />)}
            </FormItem>
            <FormItem>
              <Button block type="danger" data-index={k} onClick={this.handleClickRemoveNumberRight}>
                Eliminar
              </Button>
            </FormItem>
          </Fragment>
        )
      }
    })

    const numbersItems = newnumbers.map((k, index) => {
      const actualRadioGroup = getFieldValue(`radio-group${k}`);
      let disabledAll = false;
      if (actualRadioGroup){
        disabledAll = true;
      }

      return (
        <Fragment key={k}>
          <FormItem>
            {getFieldDecorator("number" + k, {
              validateTrigger: ['onBlur'],
              rules: [
                {
                  required: true,
                  pattern: new RegExp("^[0-9]*[02468]$"),
                  message: "Solo números pares."
                }
              ],
            })(<Input disabled={disabledAll} placeholder={`Number ${k + 1 }`} />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator("radio-group" + k, {
            })(
              <Radio.Group disabled={disabledAll} buttonStyle="solid" style={{width: '100%'}}>
                <Radio.Button value="1" className="text-center" style={{width: '33.3%'}}>Sumar</Radio.Button>
                <Radio.Button value="2" className="text-center" style={{width: '33.3%'}}>Restar</Radio.Button>
                <Radio.Button value="3" className="text-center" style={{width: '33.3%'}}>Multiplicar</Radio.Button>
              </Radio.Group>
            )}
          </FormItem>
        </Fragment>
      );
    });

    return (
      <Form onSubmit={this.handleSubmit}>
        <Row type="flex" justify="center">
          <Col span={24}>
            <h1 className="text-center">Exercise three - CYT</h1>
          </Col>
        </Row>
        <Row type="flex" justify="center" gutter={20}>
          <Col xs={24} md={{ span:10, offset: 1 }}>
            {numbersItems}
          </Col>
          <Col xs={24} md={{ span:10 }}>
            {numbersRightItems}
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span={12}>
            <FormItem>
              <Button block type="dashed" onClick={this.addNumber}>
                <Icon type="plus" /> Add number
              </Button>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span={12}>
            <FormItem>
              <Button block type="primary" htmlType="submit">
                Submit
              </Button>
            </FormItem>
          </Col>
        </Row>
        {
          totalOperation !== null
          ? (
            <Row type="flex" justify="center">
              <Col span={24}>
                <p className="text-center" style={{fontSize: '2.4em'}}>
                  Tu total es: {totalOperation}
                </p>
              </Col>
            </Row>
          )
          : null
        }
      </Form>
    );
  }
}

const WrappedApp = Form.create()(App);
export default WrappedApp;