import React from "react";
import { Box, Modal } from "@mui/material";

import "react-image-crop/dist/ReactCrop.css";

interface ActionProps {
  actionModal: boolean;
  handlecloseAction: () => void;
  actionString: string;
  actionMethod: () => void;
}

const ActionModal: React.FC<ActionProps> = ({
  actionModal,
  handlecloseAction,
  actionString,
  actionMethod,
}) => {
  const style2: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: 150,
    width: 310,
    outline: "none",
  };

  return (
    <Modal
      open={actionModal}
      onClose={handlecloseAction}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style2}>
        <div className="w-[100%] h-[100%] bg-white rounded-md flex flex-col items-center justify-center gap-5">
          <p className="text-[18px] w-[90%] text-center">{actionString}</p>

          <div className="w-[100%] flex justify-center gap-3">
            <button className="h-[40px] w-[100px] rounded-md outline-none bg-[#E2E2E2] text-[#8B8B8B]">
              Cancel
            </button>
            <button
              className="h-[40px] w-[100px] rounded-md outline-none text-white bg-[#FE5B24]"
              onClick={() => actionMethod()}
            >
              Ok
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ActionModal;
