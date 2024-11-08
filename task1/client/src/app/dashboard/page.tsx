/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import AddProduct from "@/components/AddProduct";
import { useAuth } from "@/app/context/AuthContext";
import { IoEyeSharp } from "react-icons/io5";
import { FaBookOpen, FaCartArrowDown, FaUser } from "react-icons/fa";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const dashboard = () => {
  const { user } = useAuth();
  const [productData, setProductData] = useState<any>([]);
  const [userData, setUserData] = useState<any>([]);
  const [cartData, setCartData] = useState<any>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = await axios.get("http://localhost:5000/api/product");
        setProductData(result.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    const fetchUser = async () => {
      try {
        const result = await axios.get("http://localhost:5000/api/users");
        setUserData(result.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    const fetchCart = async () => {
      try {
        const result = await axios.get("http://localhost:5000/api/cart");
        setCartData(result.data);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };

    fetchCart();
    fetchProduct();
    fetchUser();
  }, []);
  console.log(productData);
  const productNames = productData.map((product: any) => product?.title);
  const productPrices = productData.map((product: any) => product?.price);
  const productStock = productData.map((product: any) => product?.stock);
  if (!user) {
    return <>Only authenticated users are allowed.</>;
  }
  if (user.isRole !== 1) {
    return <>Access Denied. Admins only.</>;
  }

  const productChart = {
    labels: productNames,
    datasets: [
      {
        label: "Price",
        data: productPrices,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Stock",
        data: productStock,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const productChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Value", // Label for the y-axis
        },
      },
      x: {
        title: {
          display: true,
          text: "Products", // Label for the x-axis
        },
      },
    },
  };

  const chartData = {
    labels: ["Data"],
    datasets: [
      {
        label: "Products",
        data: [productData.length],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Carts",
        data: [cartData.length],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <div className="flex-col w-screen h-screen ">
        <div className="flex flex-row items-start justify-around my-2 lg:justify-end lg:gap-4 lg:-mx-5">
          <Link href="/">
            <button className="flex flex-row px-3 py-2 text-white bg-black text-md rounded-md hover:bg-gray-800">
              <IoEyeSharp className="mt-1" />
              <p className="mx-1">View Products</p>
            </button>
          </Link>
          {/* Popup */}
          <div>
            <AddProduct />
          </div>
        </div>

        <div className="mx-6 md:grid md:grid-cols-3 flex flex-col gap-2 items-center">
          <Card className="bg-green-500 text-white w-fit">
            <CardHeader>
              <CardTitle>
                <p className="font-semibold mx-5 text-3xl">{userData.length}</p>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between gap-4">
              Registered Users <FaUser className="text-xl" />
            </CardContent>
            <CardFooter className="text-white">
              Total number of registered users
            </CardFooter>
          </Card>
          <Card className="bg-orange-500 text-white w-fit">
            <CardHeader>
              <CardTitle>
                <p className="font-semibold mx-5 text-3xl">
                  {productData.length}
                </p>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between gap-4">
              Total Product <FaBookOpen className="text-xl" />
            </CardContent>
            <CardFooter className="text-white">
              Total number of products
            </CardFooter>
          </Card>
          <Card className="bg-blue-500 text-white w-fit">
            <CardHeader>
              <CardTitle>
                <p className="font-semibold mx-5 text-3xl">{cartData.length}</p>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between gap-4">
              Popular products <FaCartArrowDown className="text-xl" />
            </CardContent>
            <CardFooter className="text-white">
              People interested in your product
            </CardFooter>
          </Card>
        </div>

        {/* Bar Chart */}
        <div className="">
          <div className="mx-6 mt-6 w-full">
            <Card className="p-4">
              <h3 className="text-xl font-bold">Product and Cart Data Chart</h3>
              <Bar data={chartData} options={chartOptions} />
            </Card>
          </div>

          <div className="mx-6 mt-6 w-full">
            <Card className="p-4">
              <h3 className="text-xl font-bold">
                Product Price and Stock Chart
              </h3>
              <Bar data={productChart} options={productChartOptions} />
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default dashboard;
