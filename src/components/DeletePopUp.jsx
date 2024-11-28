import ButtonComponent from "./ButtonComponent";

function DeletePopUp({
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
    // Calls the onClick function passed from the parent
    handleDelete(deleteData?.id); // Assuming deleteData contains an 'id' for the classroom
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
              Do you want to delete this {module}- “{deleteData?.name}”?
            </h5>
            {/* <p className="delete-modal-description">
            Please remove the assigned students and staff in this classroom
          </p> */}
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

export default DeletePopUp;
