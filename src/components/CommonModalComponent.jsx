import React, { useRef, useState } from "react";
import { Modal } from "antd";
import Draggable from "react-draggable";

function CommonModalComponent({
  children,
  open,
  setOpen,
  modalWidthSize = 0,
  modalHeightSize = 0,
  isTitle = "",
  isClosable = false,
}) {
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });

  const draggleRef = useRef(null);

  const handleCancel = () => {
    setOpen(false);
  };

  const onStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  return (
    <>
      <Modal
        centered
        title={
          isTitle ? (
            <div
              style={{
                width: "100%",
                cursor: "move",
                padding: "24px",
              }}
              onMouseOver={() => {
                if (disabled) {
                  setDisabled(false);
                }
              }}
              onMouseOut={() => {
                setDisabled(true);
              }}
            >
              {isTitle}
            </div>
          ) : (
            false
          )
        }
        open={open}
        onCancel={handleCancel}
        footer={null}
        closable={isClosable}
        maskClosable={false} // Prevents closing on mask click
        keyboard={false} // Prevents closing on "Esc" key press
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            nodeRef={draggleRef}
            onStart={onStart}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
        width={modalWidthSize > 0 ? modalWidthSize : "auto"}
        height={modalHeightSize > 0 ? modalHeightSize : "auto"}
        styles={{
          body: {
            backgroundColor: "#fff3e9",
            borderRadius: 8,
          },
        }}
      >
        <div>{children}</div>
      </Modal>
    </>
  );
}

export default CommonModalComponent;
