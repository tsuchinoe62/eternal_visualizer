import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import ReactDOM from 'react-dom';
import { Line } from '@ant-design/plots';

import { Button, Form, Input, Select, theme, Typography, Row, Col, Divider, Table, Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TinyLine } from '@ant-design/charts';
import { StringMappingType } from 'typescript';

interface DataType {
  detail: {
    id: BigInteger,
    name: string,
    server: string,
    job: string,
    guild_id: BigInteger,
    score: BigInteger,
    level: BigInteger,
    talent_id: BigInteger,
  },
  histories: [
    {
      guild_id: BigInteger,
      score: BigInteger,
      level: BigInteger,
      talent_id: BigInteger,
      stored_on: Date,
    }
  ]
}

interface DetailTableDataType {
  key: string;
  value: string;
}

interface ChartConfigType {
  data: ChartDataType[];
  xField: string;
  yField: string;
  xAxis: {
      tickCount: number;
  };
}

interface ChartDataType {
  score: number,
  date: string,
}

interface HistoriesTableDataType {
  key: string,
  date: string,
  level: number,
  score: number,
  talent: string,
  guild: string,
}

const { Title, Paragraph } = Typography;

const detail_columns: ColumnsType<DetailTableDataType> = [
  {
    title: "",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "",
    dataIndex: "value",
    key: "value",
  },
];

const histories_columns: ColumnsType<HistoriesTableDataType> = [
  {
    title: "日付",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "レベル",
    dataIndex: "level",
    key: "level",
  },
  {
    title: "戦闘力",
    dataIndex: "score",
    key: "score",
  },
  {
    title: "特性",
    dataIndex: "talent",
    key: "talent",
  },
  {
    title: "軍団",
    dataIndex: "guild",
    key: "guild",
  }
]


const PlayerDetail: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const params = useParams();
  console.log(params);

  const [data, setData] = useState<DataType>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${process.env.REACT_APP_API_ENDPOINT}/players/${params.id}`
        const response = await window.fetch(url);
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        setData(data["data"]);
      } catch (error) {
        setIsError(true);
        console.error(error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const PlayerDetail = () => {
    if (isError) {
      return <h1>エラーが発生しました。</h1>
    } else if (isLoading) {
      return <h1>Loading...</h1>
    } else if (data) {
      const detail = data.detail;
      const player_detail: DetailTableDataType[] = [
        {
          key: "プレイヤー名",
          value: detail.name,
        },
        {
          key: "サーバー",
          value: detail.server,
        },
        {
          key: "所属軍団",
          value: String(detail.guild_id),
        },
        {
          key: "職業",
          value: detail.job,
        },
        {
          key: "レベル",
          value: String(detail.level),
        },
        {
          key: "戦闘力",
          value: String(detail.score),
        }
      ]
      return (
        <div>
          <Table
            showHeader={false}
            pagination={false}
            columns={detail_columns}
            dataSource={player_detail}
          />
        </div>
      )
    } else {
      return <></>
    }
  }

  const PlayerHistories = () => {
    if (isError) {
      return <h1>エラーが発生しました。</h1>
    } else if (isLoading) {
      return <h1>Loading...</h1>
    } else if (data) {
      const histories: ChartDataType[] = data.histories.slice(-7).map(h => {
        return { date: String(h.stored_on), score: Number(h.score) }
      })
      console.log(histories)

      const config: ChartConfigType = {
        data: histories,
        xField: 'date',
        yField: 'score',
        xAxis: {
          tickCount: 5,
        },
      }
      return <Line {...config} />;
    } else {
      return <></>
    }
  }

  const PlayerHistoriesTable = () => {
    if (data) {
      const histories: HistoriesTableDataType[] = data.histories.slice(-7).reverse().map((h, i) => {
        return {
          key: String(i),
          date: String(h.stored_on),
          level: Number(h.level),
          score: Number(h.score),
          talent: String(h.talent_id),
          guild: String(h.guild_id),
        }
      })
      const histories2: HistoriesTableDataType[] = [
        {
          key: "1",
          date: "2023-01-01",
          level: 60,
          score: 50000,
          talent: "保護",
          guild: "More.and.More",
        }
      ]

      return (
        <div>
          <Table
            pagination={false}
            columns={histories_columns}
            dataSource={histories}
          />
        </div>
      )
    } else {
      return <></>
    }
  }

  return (
    <div>
      <Typography>
        <Title>
          プレイヤー詳細
        </Title>
      </Typography>

      <div style={{ padding: 24, textAlign: 'left', background: colorBgContainer }}>
        <h1>基本情報</h1>
        <PlayerDetail />
      </div>
      <div style={{ padding: 24, textAlign: 'left', background: colorBgContainer }}>
        <h1>戦闘力推移</h1>
        <PlayerHistories />
      </div>
      <div style={{ padding: 24, textAlign: 'left', background: colorBgContainer }}>
        <PlayerHistoriesTable/>
      </div>
    </div>
  )
}

export default PlayerDetail;
