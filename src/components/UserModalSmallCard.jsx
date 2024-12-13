import { Avatar, Card, Checkbox, Col, Row } from "antd";

function UserModalSmallCard({ selectedItems, setSelectedItems, data }) {
  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  return (
    <>
      <Card
        style={{
          borderRadius: 8,
          backgroundColor: selectedItems.includes(data.id)
            ? "#FFF3E0"
            : "white",
          borderColor: "#FFB74D",
        }}
        styles={{ body: { padding: 16 } }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar src={data.avatar} size={40} style={{ marginRight: 8 }} />
            <span>{data.name}</span>
          </div>
          <Checkbox
            className="custom-checkbox"
            checked={selectedItems.includes(data.id)}
            onChange={() => handleSelectItem(data.id)}
          />
        </div>
      </Card>
    </>
  );
}

export default UserModalSmallCard;
