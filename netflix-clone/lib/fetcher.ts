// import axios from "axios";

// const fetcher = (url :string) =>{
//     axios.get(url).then((res)=>res.data);
// }
// export default fetcher;

import axios from "axios";

const fetcher = async (url : string) => {
  const response = await axios.get(url);
  return response.data;
};

export default fetcher;