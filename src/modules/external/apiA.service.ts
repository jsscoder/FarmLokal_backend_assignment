import axios from "axios";
import { retry } from "../../utils/retry";
import { circuitBreaker } from "../../middlewares/circuitBreaker";

const client = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 3000
});

export async function fetchOrders() {
  const call = circuitBreaker(() =>
    retry(() => client.get("/posts"), 3)
  );

  const res = await call();
  return res.data;
}
