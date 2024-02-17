import { SaveOutlined } from '@ant-design/icons';
import { ProForm } from '@ant-design/pro-components';
import { Button, Col, Row, Space } from 'antd';
import React, { useState } from 'react';
export const MyModalForm = ({
  children,
  formRef,
  onFinish,
  initialValues,
  showLoading,
  showSubmit = true,
  ...rest
}: any) => {
  const [loadings, setLoadings] = useState<boolean>(false);

  showLoading = showLoading || false; //确定按钮加个loading，有的接口时间太长了。默认关闭

  return (
    <ProForm
      labelCol={{ sm: { span: 7 } }}
      wrapperCol={{ sm: { span: 14 } }}
      layout="horizontal"
      formRef={formRef}
      onFinish={onFinish}
      initialValues={initialValues}
      submitter={{
        render: () => {
          return (
            showSubmit && (
              <Row>
                <Col span={4} offset={6}>
                  <Space>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loadings}
                      onClick={() => setLoadings(showLoading)}
                    >
                      <SaveOutlined />
                     确定
                    </Button>
                  </Space>
                </Col>
              </Row>
            )
          );
        },
      }}
      {...rest}
    >
      {children}
    </ProForm>
  );
};
