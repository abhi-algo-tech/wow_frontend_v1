import { Form } from "antd";
import ButtonComponent from "../../components/ButtonComponent";
import YesNoRadio from "../../components/radio/YesNoRadio";

function DeleteShift({ setCancel, deleteData, CardTitle, handleDelete }) {
  const [form] = Form.useForm();
  const handleCancelClick = () => {
    setCancel(false);
  };
  const handleBack = () => {
    //    setNextModal(false);
    //    setFirstModal(true);
  };

  const handleDeleteClick = () => {
    handleDelete(deleteData?.id);
    setCancel(false); // Close modal after deleting
  };
  const onFinish = (values) => {
    //    onConfirm({
    //      ...values,
    //      shiftStart: values.shiftStart.format("HH:mm A"),
    //      shiftEnd: values.shiftEnd.format("HH:mm A"),
    //      breakStart: values.breakStart.format("HH:mm A"),
    //      breakEnd: values.breakEnd.format("HH:mm A"),
    //    });
    setCancel(false);
  };
  return (
    <div className="card">
      {CardTitle && (
        <span
          style={{
            backgroundColor: "#eef1fe",
            padding: 15,
            borderRadius: "8px 8px 0 0",
          }}
          className="label-16-600"
        >
          {CardTitle}
        </span>
      )}

      <Form
        form={form}
        layout="vertical"
        className="addshift-form"
        onFinish={onFinish}
        style={{ padding: "24px 40px" }}
      >
        <div className="">
          <div className="row gap10">
            <div className="label-16-600">What Do you want to Delete?</div>
            <div className="my-4">
              <Form.Item name="deleteShift" className="mb0">
                <YesNoRadio
                  options={[
                    { label: "This Shift", value: "shift" },
                    {
                      label: "This Shift& All future units",
                      value: "This Shift& All future units",
                    },
                  ]}
                  defaultValue="shift"
                  style={{ display: "grid" }}
                  mb={20}
                />
              </Form.Item>
            </div>
          </div>

          <div className="d-flex text-center ">
            <ButtonComponent
              text={"Go Back"}
              padding="14px 45px"
              gradient={false}
              onClick={handleBack}
            />
            <ButtonComponent
              text={"Confirm"}
              padding="14px 45px"
              type="submit"
            />
          </div>
        </div>
      </Form>
    </div>
  );
}

export default DeleteShift;
