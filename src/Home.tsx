import React from 'react';
import { Col, Row, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const style: React.CSSProperties = {
  background: '#0092ff',
  padding: '8px 0',
  height: 100,
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};
const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Typography>
        <Title>
          ETERNAL Visualizer
        </Title>
        <Paragraph>
          ETERNALのプレイヤー、軍団の情報を可視化します。現在Japanサーバーのみ対応。
        </Paragraph>
      </Typography>
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <div style={style} onClick={() => navigate("/players")}>プレイヤー検索</div>
        </Col>
        <Col className="gutter-row" span={12}>
          <div style={style} onClick={() => navigate("/guilds")}>軍団検索</div>
        </Col>
      </Row>
    </div>
  )
}

export default Home;
