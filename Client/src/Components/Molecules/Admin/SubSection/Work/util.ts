import { Dispatch } from "react";
import { getProjectAllSelector, getStudyAllSelector } from "@Recoil/Admin";
import { API } from "@API/.";
import {
  getStudyAccept,
  getStudyCreateAccept,
  getStudyCreateDeny,
  getStudyData,
  getStudyDeny,
  getStudyUpdate,
} from "@API/Study";
import {
  getProjectUpdate,
  getProjectAccept,
  getProjectCreateAccept,
  getProjectCreateDeny,
  getProjectData,
  getProjectDeny,
} from "@API/Project";
import { BasicType } from "@Molecules/Content/type";
import { checkStudy } from "@Molecules/Content/util";
import { WORK_STATE } from "./Get";

export const getWorkListType = ({ type }: BasicType) =>
  checkStudy({ type }) ? getStudyAllSelector : getProjectAllSelector;

export const getDataIdx = ({ target }: { target: any }) =>
  target?.getAttribute("data-idx");

export const getIdx = ({ target }: { target: any }) =>
  getDataIdx({ target: target.closest("#userContainer") });

export const WorkSearch = ({
  value,
  totalWorkList,
  setWorkList,
}: {
  value: string;
  totalWorkList: any;
  setWorkList: Dispatch<any>;
}) => {
  setWorkList(
    totalWorkList.filter(
      (item: { status: string }) => item.status === WORK_STATE[value]
    )
  );
};

export const AcceptClick = async ({
  target,
  type,
}: {
  target: any;
  type: string | undefined;
}) => {
  const data = getIdx({ target });
  console.log(data);
  const api = checkStudy({ type }) ? getStudyAccept : getProjectAccept;
  const { message } = await API({ api, data });
  message ? alert("성공") : alert("실패");
  return message;
};

export const DenyClick = async ({
  target,
  type,
}: {
  target: any;
  type: string | undefined;
}) => {
  const data = getIdx({ target });
  const api = checkStudy({ type }) ? getStudyDeny : getProjectDeny;
  const { message } = await API({ api, data });
  message ? alert("성공") : alert("실패");
  return message;
};

export const workClick = async ({
  currentTarget,
  type,
}: {
  currentTarget: any;
  type: string | undefined;
}) => {
  const data = getDataIdx({ target: currentTarget });

  const api = checkStudy({ type }) ? getStudyData : getProjectData;
  const { message, ...datas } = await API({ api, data });
  if (!message) {
    alert("실패");
    return [];
  }
  return datas[Object.keys(datas)[0]];
};

export const checkWaiting = ({ search }: { search: string }) =>
  search === "대기중";

export const checkUpdate = ({ search }: { search: string }) =>
  search === "모집중" || search === "진행중";

const getAcceptAPI = ({ type }: { type: string | undefined }) =>
  checkStudy({ type }) ? getStudyCreateAccept : getProjectCreateAccept;

const getDenyAPI = ({ type }: { type: string | undefined }) =>
  checkStudy({ type }) ? getStudyCreateDeny : getProjectCreateDeny;

const getUpdateAPI = ({ type }: { type: string | undefined }) =>
  checkStudy({ type }) ? getStudyUpdate : getProjectUpdate;

export const createWorkAccept = async ({
  e,
  type,
}: {
  e: any;
  type: string | undefined;
}) => {
  e.stopPropagation();
  const parentTarget = e.target.closest("#waitContainer");
  const data = parentTarget.getAttribute("data-idx");
  const api = getAcceptAPI({ type });
  const { message } = await API({ api, data });
  return message;
};

export const createWorkDeny = async ({
  e,
  type,
}: {
  e: any;
  type: string | undefined;
}) => {
  e.stopPropagation();
  const parentTarget = e.target.closest("#waitContainer");
  const data = parentTarget.getAttribute("data-idx");
  const api = getDenyAPI({ type });
  const { message } = await API({ api, data });
  return message;
};

export const updateWork = async ({
  e,
  type,
}: {
  e: any;
  type: string | undefined;
}) => {
  e.stopPropagation();
  const parentTarget = e.target.closest("#container");
  const data = parentTarget.getAttribute("data-idx");
  const api = getUpdateAPI({ type });
  const { message } = await API({ api, data });
  return message;
};
