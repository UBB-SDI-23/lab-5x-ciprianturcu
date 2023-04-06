const PROD_BACKEND_API_URL = "http://ec2-16-16-104-77.eu-north-1.compute.amazonaws.com/api";
const DEV_BACKEND_API_URL = "http://127.0.0.1:8000/api";

export const BACKEND_API_URL =
	process.env.NODE_ENV === "development" ? DEV_BACKEND_API_URL : PROD_BACKEND_API_URL;