import ButtonComponent from "./ButtonComponent";

function DeleteSchedulePopUp({
  setCancel,
  deleteData,
  CardTitle,
  handleDelete,
  module = "",
}) {
  const handleCancelClick = () => {
    setCancel(false);
  };

  const handleDeleteClick = () => {
    handleDelete(deleteData?.id);
    setCancel(false); // Close modal after deleting
  };
  return (
    <div className="card">
      {CardTitle && (
        <span
          style={{
            backgroundColor: "#eef1fe",
            fontWeight: "bold",
            padding: 15,
            borderRadius: "8px 8px 0 0",
          }}
        >
          {CardTitle}
        </span>
      )}
      <div className="delete-modal d-flex flex-column justify-content-between">
        {/* Header */}
        <div className="d-flex flex-column align-items-center ">
          <img
            className="delete-modal-icon"
            src="/classroom_icons/png/delete-2.png"
          />
          <div>
            <h5 className="delete-modal-title">
              Do you want to delete this {module}?
            </h5>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <ButtonComponent
            text="Cancel"
            gradient={false}
            padding={"16px 62.6px"}
            margin="0 16px 0 0"
            onClick={handleCancelClick}
          />

          <ButtonComponent
            text="Delete"
            gradient={true}
            padding={"16px 62.6px"}
            onClick={handleDeleteClick}
          />
        </div>
      </div>
    </div>
  );
}

export default DeleteSchedulePopUp;
