import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Line } from '@ant-design/plots';

import { theme, Typography, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  detail: {
    id: BigInteger,
    name: string,
    server: string,
    master: string,
    score: BigInteger,
  },
  histories: [
    {
      score: BigInteger,
      master: string,
      stored_on: Date,
    }
  ]
}

interface DetailTableDataType {
  key: string;
  value: string;
}

interface ChartDataType {
  score: number,
  date: string,
}

interface ChartConfigType {
  data: ChartDataType[];
  xField: string;
  yField: string;
  xAxis: {
    tickCount: number;
  };
}

interface HistoriesTableDataType {
  key: string,
  date: string,
  score: number,
  master: string,
}

const { Title } = Typography;

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
    title: "戦闘力",
    dataIndex: "score",
    key: "score",
  },
  {
    title: "軍団長",
    dataIndex: "master",
  },
];

const GuildDetail: React.FC = () => {
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
        const url = `${process.env.REACT_APP_API_ENDPOINT}/guilds/${params.id}`
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

  const GuildDetail = () => {
    if (isError) {
      return <h1>エラーが発生しました。</h1>
    } else if (isLoading) {
      return <h1>Loading...</h1>
    } else if (data) {
      const detail = data.detail;
      const guild_detail: DetailTableDataType[] = [
        {
          key: "軍団名",
          value: detail.name,
        },
        {
          key: "サーバー",
          value: detail.server,
        },
        {
          key: "軍団総戦闘力",
          value: String(detail.score),
        },
        {
          key: "軍団長",
          value: detail.master,
        }
      ]
      return (
        <div>
          <Table
            showHeader={false}
            pagination={false}
            columns={detail_columns}
            dataSource={guild_detail}
          />
        </div>
      )
    } else {
      return <></>
    }
  }

  const GuildHistories = () => {
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

  const GuildHistoriesTable = () => {
    if (data) {
      const histories: HistoriesTableDataType[] = data.histories.slice(-7).reverse().map((h, i) => {
        return {
          key: String(i),
          date: String(h.stored_on),
          score: Number(h.score),
          master: String(h.master),
        }
      })

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
          軍団詳細
        </Title>
      </Typography>

      <div style={{ padding: 24, textAlign: 'left', background: colorBgContainer }}>
        <h1>基本情報</h1>
        <GuildDetail />
      </div>
      <div style={{ padding: 24, textAlign: 'left', background: colorBgContainer }}>
        <h1>軍団総戦力推移</h1>
        <GuildHistories />
      </div>
      <div style={{ padding: 24, textAlign: 'left', background: colorBgContainer }}>
        <GuildHistoriesTable />
      </div>
    </div>
  )
}

export default GuildDetail;
