import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, theme, Typography, Row, Col, Divider, Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';

const { Title, Paragraph } = Typography;
const { Option } = Select;

interface SearchParams {
  server: string,
  job: string,
  name: string,
  [key: string]: string;
}

interface DataType {
  id: string,
  server: string,
  job: string,
  name: string,
  score: BigInteger,
  guild_id: BigInteger,
  level: BigInteger,
  talent_id: BigInteger,
  crated_at: string,
  updated_at: string,
}

interface JsonType {
  status: string,
  message: string,
  data: DataType[],
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

const columns: ColumnsType<DataType> = [
  {
    title: "サーバー",
    dataIndex: "server",
    width: "10%"
  },
  {
    title: "名前",
    dataIndex: "name",
    width: "20%",
  },
  {
    title: "職業",
    dataIndex: "job",
    width: "20%",
  },
  {
    title: "戦闘力",
    dataIndex: "score",
    width: "20%",
  },
];

const PlayerSearch: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    setSearchParams({ server: values["server"], job: values["job"], name: values["name"] })
    setIsSearched(true);
  }

  const onReset = () => {
    form.resetFields();
  }

  const [data, setData] = useState<DataType[]>();
  const [isSearched, setIsSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    server: "",
    job: "",
    name: ""
  });
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "https://eternalrankingcollector-6lpmf4rgtq-uw.a.run.app/players?"

        Object.keys(searchParams).forEach(key => {
          const value = searchParams[key];
          if (value && value.length > 0) {
            url += `${key}=${value}&`
          }
        })

        const response = await window.fetch(url)
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json() as JsonType;

        setData(data["data"]);

        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: data["data"].length,
          },
        });
      } catch (error) {
        setIsError(true);
        console.error(error);
      }

      setIsLoading(false);
    };

    if (isSearched) {
      fetchData();
    }
  }, [searchParams, JSON.stringify(tableParams)]);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    // filters: Record<string, FilterValue>,
    sorter: SorterResult<DataType>,
  ) => {
    setTableParams({
      pagination,
      // filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  const Records = () => {
    if (isError) {
      return <h1>エラーが発生しました。</h1>
    } else if (data) {
      return (
        <div>
          <h1>検索結果</h1>
          <Table
            columns={columns}
            rowKey={(record) => record.id}
            dataSource={data}
            pagination={tableParams.pagination}
            loading={isLoading}
            onChange={handleTableChange}
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
                  <Option value="" selected>すべて</Option>
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
                  <Option value="" selected>すべて</Option>
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
      <Divider />
      {isSearched ? (
        <div style={{ padding: 24, textAlign: 'left', background: colorBgContainer }}>
          <Records />
        </div>
      ) : <></>}

    </div>
  )
}

export default PlayerSearch;