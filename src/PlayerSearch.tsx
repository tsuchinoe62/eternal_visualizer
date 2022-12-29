import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, theme, Typography, Row, Col, InputNumber } from 'antd';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const PlayerSearch: React.FC = () => {
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
        <Title>
          プレイヤー検索
        </Title>
      </Typography>

      <div style={{ padding: 24, textAlign: 'left', background: colorBgContainer }}>
        <Form layout="vertical" form={form} name="control-hooks" onFinish={onFinish}>
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              <Form.Item name="name" label="プレイヤー名">
                <Input placeholder="プレイヤー名（部分一致）" />
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
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              <Form.Item name="job" label="職業">
                <Select>
                  <Option value="All" selected>すべて</Option>
                  <Option value="パラディン">パラディン</Option>
                  <Option value="ウォーリア">ウォーリア</Option>
                  <Option value="メイジ">メイジ</Option>
                  <Option value="プリースト">プリースト</Option>
                  <Option value="ガンナー">ガンナー</Option>
                </Select>
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

export default PlayerSearch;