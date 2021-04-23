import request from "@/api/myRequest";

export function upload(data) {
  return request({
    url: "/lejuAdmin/material/uploadFileOss",
    method: "POST",
    data
  });
}

export default {
    upload
}