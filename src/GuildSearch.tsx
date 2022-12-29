import React, { useState, useEffect } from 'react';
import { Button, Form, theme, Typography, Row, Col, Input, Select } from 'antd';

const { Title } = Typography;
const { Option } = Select;

const GuildSearch: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
  }

  const onReset = () => {
    form.resetFields();
  }

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  return (
    <div>
      <Typography>
          <Title>軍団検索</Title>
      </Typography>

      <div style={{ padding: 24, textAlign: 'left', background: colorBgContainer }}>
        <Form layout="vertical" form={form} name="control-hooks" onFinish={onFinish}>
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              <Form.Item name="name" label="軍団名">
                <Input placeholder="軍団名（部分一致）" />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item name="server" label="サーバー">
                <Select>
                  <Option value="All" selected>すべて</Option>
                  <Option value="Japan">Japan</Option>
                  <Option value="Global" disabled>Global</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col className="gutter-row" span={12}>
              <Form.Item name="master" label="軍団長名">
                <Input placeholder="軍団長名（部分一致）" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col className="gutter-row" span={24}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  検索
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  リセット
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  )
}

export default GuildSearch;