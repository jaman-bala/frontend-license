// Форма для добавления нового пользователя (UPD: не испольузется пока что)

import React from "react";
import { Modal, Form, Input, Checkbox, Button } from "antd";

interface UserFormProps {
  visible: boolean;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ visible, onSubmit, onCancel }) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
      form.resetFields();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      title="Add New User"
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Surname"
          name="surname"
          rules={[{ required: true, message: "Please input surname!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Active"
          name="is_active"
          valuePropName="checked"
        >
          <Checkbox />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleOk}>
            Add
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserForm;
